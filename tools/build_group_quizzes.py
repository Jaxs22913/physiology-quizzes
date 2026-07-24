"""Regenerate group-questions.js (the Group Study question bank) from EVERY quiz
on the site, so Group Study always mirrors the full quiz catalog with no manual
porting.

Run from the repo root after adding/changing any quiz:

    python3 tools/build_group_quizzes.py

It scans every quiz HTML file, extracts its `const QUESTIONS = [...]` array
(handling all of the site's quiz-engine schemas), converts each question to the
Group Study shape { q, choices[4], answer, exp }, and writes:

    window.GROUP_QUIZZES = { "<id>": { title, category, questions:[...] }, ... };

Quizzes are keyed by a stable slug of their file path; `category` is the class
(the folder with any "Exam N" stripped) and drives the host picker's grouping.
Image-dependent quizzes are skipped (Group Study is text-only). This file is
the single source of truth -- do not hand-edit group-questions.js.
"""
import re, os, glob, json, sys, html
try:
    import json5  # tolerant parser: handles JS-object literals (unquoted keys, trailing commas)
    _loads = json5.loads
except Exception:
    _loads = json.loads  # falls back to strict JSON (misses older JS-literal quizzes)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

SKIP_BASENAMES = {"index.html", "guides.html", "group-host.html", "group-join.html", "arcade.html"}
SKIP_SUBSTR = ["study-guide", "cram-sheet", "-blood-flow", "-flows", "-hormones", "-peritoneum"]


# The site's quiz engines store the question bank under different variable
# names (QUESTIONS, questions, Q, DECK...) and in either strict JSON or JS
# object-literal form. Try each candidate name, parse tolerantly, and accept
# the first array whose objects actually look like questions.
QVARS = ["QUESTIONS", "questions", "Q", "DECK", "ITEMS", "BANK", "quizData"]


def _looks_like_questions(arr):
    return isinstance(arr, list) and arr and isinstance(arr[0], dict) and \
        any(k in arr[0] for k in ("q", "question", "stem"))


def extract_questions(src):
    for var in QVARS:
        for decl in (r'\bconst ' + var + r'\s*=\s*', r'\b(?:let|var) ' + var + r'\s*=\s*'):
            m = re.search(decl + r'(\[.*?\]);', src, re.DOTALL)  # non-greedy first
            if not m:
                continue
            for text in (m.group(1),):
                try:
                    arr = _loads(text)
                    if _looks_like_questions(arr):
                        return arr
                except Exception:
                    pass
            # non-greedy can truncate on a stray "];" inside a string; retry greedy
            mg = re.search(decl + r'(\[.*\]);', src, re.DOTALL)
            if mg:
                try:
                    arr = _loads(mg.group(1))
                    if _looks_like_questions(arr):
                        return arr
                except Exception:
                    pass
    return None


def clean_title(src, fallback):
    m = re.search(r'<title>(.*?)</title>', src, re.DOTALL | re.IGNORECASE)
    t = html.unescape(re.sub(r'\s+', ' ', m.group(1)).strip()) if m else fallback
    # strip trailing " — <Class Exam N>" / " | site" boilerplate
    t = re.split(r'\s+[|]\s+', t)[0]
    return t or fallback


def category_from_path(path):
    folder = path.split(os.sep)[0]
    cat = re.sub(r'\s*Exam\s*\d+\s*$', '', folder).strip()
    cat = re.sub(r'\s*\d+\s*$', '', cat).strip() if re.search(r'\bDiagnosis\b', cat) else cat
    fixups = {
        "CAM Nutrition": "CAM / Nutrition", "Nutrition Class": "Nutrition",
        "Anatomy Practicum": "Anatomy Practicum", "Intro to PA Profession": "Intro to PA",
    }
    return fixups.get(cat, cat) or "Other"


def slug(s):
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', s.lower())).strip('-')


def has_image(q):
    blob = json.dumps(q, ensure_ascii=False).lower()
    return any(k in blob for k in ('"img"', 'imgsrc', 'imgcaption', 'data-img', '.png', '.jpg', '.jpeg', '.webp'))


def _first(q, keys):
    for k in keys:
        if k in q and q[k] is not None:
            return q[k]
    return None


def convert(q):
    """Field-inferring conversion that works across every quiz-engine schema on
    the site (and, being inference-based, future ones too). Returns
    (qtext, choices, answer_index, exp) or None."""
    qtext = _first(q, ["q", "question", "stem", "prompt"])
    opts = _first(q, ["opts", "o", "options", "choices", "answers"])
    if qtext is None or opts is None:
        return None

    choices, embedded_ans = [], None
    letter_keys = None
    if isinstance(opts, dict):                       # {A:..,B:..}
        letter_keys = sorted(opts.keys())
        choices = [str(opts[k]) for k in letter_keys]
    elif isinstance(opts, list):
        for i, o in enumerate(opts):
            if isinstance(o, (list, tuple)):         # [text, explanation]
                choices.append(str(o[0]))
            elif isinstance(o, dict):                # {t/text, c/correct}
                choices.append(str(_first(o, ["t", "text", "label", "opt"]) or ""))
                if o.get("c") or o.get("correct") or o.get("isCorrect"):
                    embedded_ans = i
            else:
                choices.append(str(o))
    else:
        return None

    # answer index
    ans = embedded_ans
    if ans is None:
        raw = _first(q, ["c", "a", "answer", "correct", "correctIndex", "ans"])
        if isinstance(raw, bool):
            return None
        elif isinstance(raw, int):
            ans = raw
        elif isinstance(raw, str):
            r = raw.strip()
            if letter_keys and r in letter_keys:
                ans = letter_keys.index(r)
            elif len(r) == 1 and r.upper() in "ABCDEFGH":
                ans = ord(r.upper()) - 65
            elif r.isdigit():
                ans = int(r)
            elif r in choices:
                ans = choices.index(r)
    if not isinstance(ans, int) or not (0 <= ans < len(choices)):
        return None

    # explanation
    exp = ""
    e = _first(q, ["exp", "e", "r", "rationale", "explain", "explanation", "why"])
    if isinstance(e, dict):
        exp = str(e.get(str(ans), e.get(ans, "")) or "")
    elif isinstance(e, list):
        exp = str(e[ans]) if 0 <= ans < len(e) and e[ans] else ""
    elif e:
        exp = str(e)
    if not exp and isinstance(opts, list) and 0 <= ans < len(opts) \
            and isinstance(opts[ans], (list, tuple)) and len(opts[ans]) > 1:
        exp = str(opts[ans][1])
    cite = _first(q, ["cite", "src", "source"])
    if cite:
        exp = (exp + " — " + str(cite)).strip(" —")

    return qtext, choices, ans, exp


def main():
    files = []
    for f in glob.glob("**/*.html", recursive=True):
        base = os.path.basename(f)
        if base in SKIP_BASENAMES or any(x in base for x in SKIP_SUBSTR):
            continue
        if f.startswith("tools" + os.sep) or f.startswith("group-quizzes" + os.sep):
            continue
        src = open(f, encoding="utf-8", errors="ignore").read()
        qs = extract_questions(src)
        if qs is None:
            continue
        files.append((f, src, qs))

    bank = {}
    ids_used = {}
    stats = {"quizzes": 0, "questions": 0, "skipped_img": 0, "skipped_bad": 0, "skipped_files": 0}
    for f, src, qs in sorted(files):
        rel = f.replace(os.sep, "/")
        qid = slug(rel[:-5] if rel.endswith(".html") else rel)
        # guarantee uniqueness
        if qid in ids_used:
            ids_used[qid] += 1
            qid = f"{qid}-{ids_used[qid]}"
        else:
            ids_used[qid] = 1
        out_qs = []
        bad = False
        for q in qs:
            if has_image(q):
                stats["skipped_img"] += 1
                bad = True
                break
            conv = convert(q)
            if not conv:
                stats["skipped_bad"] += 1
                continue
            qtext, choices, ans, exp = conv
            if not qtext or not isinstance(choices, list) or len(choices) != 4:
                stats["skipped_bad"] += 1
                continue
            if not isinstance(ans, int) or not (0 <= ans < 4):
                stats["skipped_bad"] += 1
                continue
            out_qs.append({"q": str(qtext), "choices": [str(c) for c in choices], "answer": ans, "exp": str(exp)})
        if bad or not out_qs:
            stats["skipped_files"] += 1
            continue
        bank[qid] = {
            "title": clean_title(src, os.path.basename(f)[:-5]),
            "category": category_from_path(f),
            "questions": out_qs,
        }
        stats["quizzes"] += 1
        stats["questions"] += len(out_qs)

    body = ",\n".join(
        json.dumps(k, ensure_ascii=False) + ":" + json.dumps(v, ensure_ascii=False, separators=(",", ":"))
        for k, v in sorted(bank.items())
    )
    header = ("// AUTO-GENERATED by tools/build_group_quizzes.py -- DO NOT EDIT BY HAND.\n"
              "// Mirrors every quiz on the site into the Group Study bank. Re-run the\n"
              "// generator after adding or changing any quiz. Shape per entry:\n"
              "//   { title, category, questions:[{ q, choices[4], answer:0-3, exp }] }\n")
    out = header + "window.GROUP_QUIZZES = {\n" + body + "\n};\n"
    open("group-questions.js", "w", encoding="utf-8").write(out)

    size_mb = len(out.encode("utf-8")) / 1e6
    cats = {}
    for v in bank.values():
        cats[v["category"]] = cats.get(v["category"], 0) + 1
    print(f"group-questions.js written: {stats['quizzes']} quizzes, {stats['questions']} questions, {size_mb:.1f} MB")
    print(f"skipped -> image quizzes: {stats['skipped_img']} q, unconvertible: {stats['skipped_bad']} q, empty files: {stats['skipped_files']}")
    print("categories:", dict(sorted(cats.items(), key=lambda x: -x[1])))


if __name__ == "__main__":
    main()
