"""Audit every quiz's correct-answer index (c) against its own explanations.

Background: on 2026-07-21 a classmate reported picking the right answer and
being marked wrong -- on both Anatomy and PD content. Root cause: the Master
Exam builds had reordered each question's answer options without updating the
correct-answer index `c`, so `c` pointed at a distractor while the real answer
sat elsewhere. 773 questions across 27 master-exam files were affected. The
existing tools miss this: check_answer_distribution.py only catches *position
clustering*, not a wrong key, and check_console_errors.py only catches JS
errors. This script is the standing check for answer-key-vs-explanation
consistency; run it whenever quiz content (especially Master Exams) is built
or regenerated.

How it works -- these quizzes encode the correct answer redundantly in the
explanations, in one of two authoring styles:

  1. "unique-explanation" style: the correct option carries a unique affirming
     explanation; the 3 distractors share one identical combined explanation.
     -> correct index = the option whose explanation is the odd one out.

  2. "inaccurate-here" style: each distractor's explanation literally says
     "This is inaccurate here -- the correct answer to this question is: ...",
     i.e. 3 options are "negating" and exactly 1 is affirming.
     -> correct index = the single non-negating option.

For any question matching either style, the explanation-derived correct index
must equal `c`. A mismatch is a corrupted answer key and is reported. Questions
that match neither style (e.g. 4 genuinely distinct explanations) are left for a
human and counted under "unclassified" -- they are not assumed wrong.

Usage:
    python3 tools/check_answer_key_consistency.py                 # whole site
    python3 tools/check_answer_key_consistency.py "Anatomy Exam 1" # scope it

Exit code 0 if nothing is flagged, 1 if any mismatch is found -- safe as a gate.
"""
import re, json, glob, sys, os
from collections import Counter

NEG = re.compile(r'this is inaccurate here|correct answer to this question is', re.I)

def unique_idx(opts):
    """Return the index of the odd-one-out explanation (3 identical + 1 unique), else None."""
    expls = [o[1] for o in opts if isinstance(o, list) and len(o) > 1]
    if len(expls) != len(opts):
        return None
    cnt = Counter(expls)
    if len(cnt) == 2 and sorted(cnt.values()) == [1, len(opts) - 1]:
        for e, n in cnt.items():
            if n == 1:
                return expls.index(e)
    return None

def negating_idx(opts):
    """Return the index of the single non-negating (affirming) option when exactly 3 negate, else None."""
    negs = [bool(NEG.search(o[1])) if (isinstance(o, list) and len(o) > 1) else False for o in opts]
    if sum(negs) == len(opts) - 1:
        return negs.index(False)
    return None

def derived_correct(opts):
    """Best explanation-derived correct index, or None if the question matches neither style."""
    for fn in (negating_idx, unique_idx):
        i = fn(opts)
        if i is not None:
            return i
    return None

def main(argv):
    roots = argv[1:] or ["."]
    files = []
    for r in roots:
        if os.path.isfile(r):
            files.append(r)
        else:
            files += glob.glob(os.path.join(r, "**", "*.html"), recursive=True)
    files = sorted(set(f for f in files if not f.startswith("rpg/")))

    mismatches = []
    checked = classified = unclassified = 0
    for f in files:
        try:
            s = open(f, encoding="utf-8").read()
        except Exception:
            continue
        m = re.search(r'const QUESTIONS\s*=\s*(\[.*?\]);', s, re.S)
        if not m:
            continue
        try:
            arr = json.loads(m.group(1))
        except Exception:
            continue
        checked += 1
        for qi, q in enumerate(arr):
            opts, c = q.get("opts"), q.get("c")
            if not isinstance(opts, list) or len(opts) != 4:
                continue
            di = derived_correct(opts)
            if di is None:
                unclassified += 1
                continue
            classified += 1
            if di != c:
                mismatches.append((f, qi + 1, c, di, opts[di][0][:55], q.get("q", "")[:60]))

    print(f"quiz files scanned: {checked}   classifiable questions: {classified}   "
          f"unclassified (neither style): {unclassified}")
    print(f"ANSWER-KEY MISMATCHES: {len(mismatches)}\n")
    for f, qi, c, di, ans, stem in mismatches:
        print(f"  {f}  Q{qi}: c={c} should be {di}")
        print(f"      correct answer: {ans}")
        print(f"      Q: {stem}")
    return 1 if mismatches else 0

if __name__ == "__main__":
    sys.exit(main(sys.argv))
