"""Audit every quiz's correct-answer position for suspicious clustering.

Background: on 2026-07-19 a classmate noticed every PD1 Exam 2 answer was
choice "A". Root cause was in the authoring step, not the quiz engine: the
correct choice was always written first and never shuffled before the quiz
HTML was generated. A follow-up site-wide sweep found the same defect (to
varying degrees) across most of the site's quiz history. This script is the
standing tool for catching that class of bug going forward -- run it any
time quiz content is added or regenerated, before considering that work
done. See the "answer-position-bias-check" memory for the full incident
writeup.

Why this can't be a plain JSON/regex check: many quiz files use unquoted
object-literal keys (e.g. {q: "...", o: [...], a: 0}), which is valid
JavaScript but not valid JSON. A naive json.loads() on the raw source throws
a false "parse error" on those files. This script instead loads each page
in a real, disposable headless Chrome instance and evaluates the QUESTIONS
array with the actual JS engine, so any authoring-era syntax variant parses
correctly.

Handles the answer-position schemas seen on this site so far:
  - {choices: [...], answer: <int index>}
  - {opts: [...], c: <int index>}
  - {options: {A,B,C,D}, answer: "<letter>"}
  - {o: [{t, c: bool}, ...], _order: [...]} -- the endocrine_exam3_quiz.html
    style, where display order/correctness already comes from a per-question
    _order permutation; this script recomputes the *displayed* correct
    position through that permutation rather than assuming index 0.
If a file uses some other shape entirely, it's reported under "unknown
schema" for a human to look at rather than silently skipped.

--- How to run it ---

Self-contained: starts its own `python3 -m http.server` and a disposable
headless Chrome instance, and shuts both down when it exits (including on
Ctrl-C or an exception). No flags needed for the common case:

    python3 tools/check_answer_distribution.py

Check specific files/folders instead of the whole site:

    python3 tools/check_answer_distribution.py "Anatomy Exam 3" "PD1 Exam 2/foo-quiz.html"

Tune the flag threshold (default 0.4 -- if one answer position accounts for
>=40% of a file's questions, flag it for review; true-random 4-choice
questions land close to 25% per position, so 40%+ concentration reliably
separates "authoring bug" from "normal variance" even at n=30):

    python3 tools/check_answer_distribution.py --threshold 0.35

Exit code is 0 if nothing is flagged, 1 if anything is flagged or errored --
safe to use as a pass/fail gate.

--- Requirements ---

Google Chrome installed at the standard macOS path, and the `websocket-client`
pip package (already used elsewhere in this project's scratch tooling).
"""

import argparse
import glob
import json
import os
import subprocess
import sys
import time
import urllib.parse
import urllib.request
from collections import Counter

try:
    import websocket
except ImportError:
    sys.exit("Missing dependency: pip install websocket-client")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HTTP_PORT = 8791
CDP_PORT = 9391

EXCLUDE_DIR_SUBSTRINGS = ("Anatomy Practicum",)  # type-in answers, no index bias possible


def discover_files(explicit_targets):
    if explicit_targets:
        out = []
        for t in explicit_targets:
            abs_t = t if os.path.isabs(t) else os.path.join(ROOT, t)
            if os.path.isdir(abs_t):
                out.extend(
                    os.path.relpath(p, ROOT)
                    for p in glob.glob(os.path.join(abs_t, "**", "*.html"), recursive=True)
                )
            elif os.path.isfile(abs_t):
                out.append(os.path.relpath(abs_t, ROOT))
            else:
                print(f"warning: target not found, skipping: {t}", file=sys.stderr)
        return sorted(set(out))

    out = []
    for path in glob.glob(os.path.join(ROOT, "**", "*.html"), recursive=True):
        rel = os.path.relpath(path, ROOT)
        if any(sub in rel for sub in EXCLUDE_DIR_SUBSTRINGS):
            continue
        try:
            with open(path, encoding="utf-8", errors="ignore") as fh:
                if "QUESTIONS" in fh.read():
                    out.append(rel)
        except OSError:
            continue
    return sorted(out)


class ChromeSession:
    """Launches a disposable http.server + headless Chrome, torn down on exit."""

    def __init__(self):
        self.http_proc = None
        self.chrome_proc = None

    def __enter__(self):
        self.http_proc = subprocess.Popen(
            ["python3", "-m", "http.server", str(HTTP_PORT)],
            cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        self.chrome_proc = subprocess.Popen(
            [CHROME, "--headless=new", f"--remote-debugging-port={CDP_PORT}",
             "--remote-allow-origins=*", "--disable-gpu", "--no-first-run"],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        for _ in range(40):
            try:
                urllib.request.urlopen(f"http://localhost:{CDP_PORT}/json/version", timeout=1)
                break
            except Exception:
                time.sleep(0.25)
        else:
            raise RuntimeError("Chrome DevTools endpoint never came up")
        for _ in range(40):
            try:
                urllib.request.urlopen(f"http://localhost:{HTTP_PORT}/", timeout=1)
                break
            except Exception:
                time.sleep(0.25)
        else:
            raise RuntimeError("local http.server never came up")
        return self

    def __exit__(self, *exc):
        for proc in (self.chrome_proc, self.http_proc):
            if proc:
                proc.terminate()
                try:
                    proc.wait(timeout=5)
                except Exception:
                    proc.kill()


CHECK_EXPR = """(function(){
  if (typeof QUESTIONS === "undefined" || !Array.isArray(QUESTIONS) || QUESTIONS.length === 0) {
    return {error: "no-QUESTIONS"};
  }
  var q0 = QUESTIONS[0];
  var dist = {};
  var n = QUESTIONS.length;

  if (q0.hasOwnProperty("answer") && typeof q0.answer !== "undefined" && q0.hasOwnProperty("choices")) {
    QUESTIONS.forEach(function(q){ dist[q.answer] = (dist[q.answer]||0)+1; });
    return {schema: "choices/answer", n: n, dist: dist};
  }
  if (q0.hasOwnProperty("opts") && q0.hasOwnProperty("c")) {
    QUESTIONS.forEach(function(q){ dist[q.c] = (dist[q.c]||0)+1; });
    return {schema: "opts/c", n: n, dist: dist};
  }
  if (q0.hasOwnProperty("options") && q0.hasOwnProperty("answer")) {
    QUESTIONS.forEach(function(q){ dist[q.answer] = (dist[q.answer]||0)+1; });
    return {schema: "options/answer-letter", n: n, dist: dist};
  }
  if (q0.hasOwnProperty("o") && q0.hasOwnProperty("_order")) {
    QUESTIONS.forEach(function(q){
      var pos = q._order.findIndex(function(idx){ return q.o[idx] && q.o[idx].c === true; });
      dist[pos] = (dist[pos]||0)+1;
    });
    return {schema: "o/_order", n: n, dist: dist};
  }
  return {error: "unknown-schema", keys: Object.keys(q0)};
})()"""


def check_file(rel_path):
    url = f"http://localhost:{HTTP_PORT}/" + rel_path
    url_enc = urllib.parse.quote(url, safe=":/")  # quote exactly once -- see module docstring caveat
    req = urllib.request.Request(
        f"http://localhost:{CDP_PORT}/json/new?{url_enc}", method="PUT"
    )
    tab = json.loads(urllib.request.urlopen(req, timeout=5).read())
    ws_url, tab_id = tab["webSocketDebuggerUrl"], tab["id"]
    ws = websocket.create_connection(ws_url, timeout=10)
    _id = 0

    def send(method, params=None):
        nonlocal _id
        _id += 1
        ws.send(json.dumps({"id": _id, "method": method, "params": params or {}}))
        return _id

    def recv_until(target_id, timeout=8):
        ws.settimeout(timeout)
        while True:
            msg = json.loads(ws.recv())
            if msg.get("id") == target_id:
                return msg

    def eval_js(expr):
        eid = send("Runtime.evaluate", {"expression": expr, "returnByValue": True})
        return recv_until(eid).get("result", {}).get("result", {}).get("value")

    try:
        send("Runtime.enable"); recv_until(_id)
        send("Page.enable"); recv_until(_id)
        recv_until(send("Page.navigate", {"url": url_enc}), timeout=8)
        time.sleep(0.3)
        return eval_js(CHECK_EXPR)
    except Exception as e:
        return {"error": f"exception: {e}"}
    finally:
        try:
            ws.close()
        except Exception:
            pass
        try:
            urllib.request.urlopen(
                urllib.request.Request(f"http://localhost:{CDP_PORT}/json/close/{tab_id}"),
                timeout=5,
            )
        except Exception:
            pass


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("targets", nargs="*", help="Specific files/folders to check (default: whole site)")
    ap.add_argument("--threshold", type=float, default=0.4,
                     help="Flag a file if one answer position accounts for >= this fraction of its questions (default 0.4)")
    args = ap.parse_args()

    files = discover_files(args.targets)
    if not files:
        print("No quiz files found to check.")
        return 0

    print(f"Checking {len(files)} file(s)...\n")
    flagged = []
    errored = []
    clean = 0

    with ChromeSession():
        for i, f in enumerate(files, 1):
            r = check_file(f)
            if "error" in r:
                errored.append((f, r["error"]))
                print(f"[{i}/{len(files)}] ERROR   {f}  ({r['error']})")
                continue
            dist = r["dist"]
            n = r["n"]
            top_val, top_count = max(dist.items(), key=lambda kv: kv[1])
            frac = top_count / n if n else 0
            if frac >= args.threshold:
                flagged.append((frac, f, r["schema"], n, dist))
                print(f"[{i}/{len(files)}] FLAG    {f}  {frac:.0%} at one position (schema={r['schema']}, n={n})")
            else:
                clean += 1

    print(f"\n{'='*60}")
    print(f"clean: {clean}   flagged: {len(flagged)}   errored: {len(errored)}   total: {len(files)}")

    if flagged:
        print("\n--- FLAGGED (needs a fix) ---")
        for frac, f, schema, n, dist in sorted(flagged, reverse=True):
            print(f"  {frac:.0%}  {f}  schema={schema}  n={n}  dist={dist}")

    if errored:
        print("\n--- ERRORED (needs a manual look -- unknown schema or a real page error) ---")
        for f, e in errored:
            print(f"  {f} :: {e}")

    return 1 if (flagged or errored) else 0


if __name__ == "__main__":
    sys.exit(main())
