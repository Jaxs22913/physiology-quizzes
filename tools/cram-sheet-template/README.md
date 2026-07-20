# Cram Sheet template

One condensed, night-before-the-exam reference page per **exam** (e.g. "Physiology Exam 3"),
not per topic and not one page for a whole class. Every exam that has a study guide should
have a matching cram sheet, linked right after that guide's card on `guides.html`.

A cram sheet is a companion to the full guide, not a replacement — it assumes the material
has already been learned and surfaces only the highest-yield facts, condensed into a
term → fact table per topic. It explicitly links back to the full guide for anyone who needs
the actual explanation.

## Schema

```python
topics = [
    {
        "id": "s1",                # anchor id, used by the jump-to-topic chip
        "label": "Blood & Hemostasis",
        "color": "#b91c1c",        # accent color for this topic's chip/table header/zebra tint
        "rows": [
            ["Term or concept (2-6 words)", "1-3 dense sentences of the highest-yield facts about it."],
            ...
        ],
    },
    ...
]
```

4-9 topics per exam is typical (matches however many decks/systems the source guide has).
5-8 rows per topic is a good density — enough to be genuinely useful, not so much that it
stops being a "cram" sheet.

### Multi-column mode (e.g. muscle Origin/Insertion/Action/Innervation tables)

Some content doesn't fit a 2-column term→fact shape — e.g. a muscle reference table where
every row needs Action/Insertion/Innervation as separate columns. Give the topic `cols`
instead of the default, and make `rows` entries tuples matching `cols` length (or a
`{"group": "..."}` dict for a full-width group-header row, matching how the source Pearson
muscle tables group by e.g. "GLUTEAL GROUP" / "FLEXORS" / "EXTENSORS"):

```python
{
    "id": "appendicular-musculature",
    "label": "Appendicular Musculature — Muscle Reference",
    "color": "#9c3b3b",
    "cols": ["Muscle", "Action", "Insertion", "Innervation"],
    "rows": [
        {"group": "GLUTEAL GROUP"},
        ("Gluteus maximus", "Extension and lateral rotation at hip; ...", "Iliotibial tract and gluteal tuberosity of femur", "Inferior gluteal nerve (L5-S2)"),
        ...
    ],
}
```

This was built 2026-07-20 for Anatomy Exam 4's Appendicular/Axial Musculature topics (144
muscles total, action/insertion/innervation transcribed verbatim from the source PPT's own
embedded O/I/A/N table images — see "Sourcing O/I/A/N tables" below). Falls back to the
original 2-column term/fact rendering automatically when `cols` is omitted, so existing
cram sheets are unaffected.

## Usage

```python
import sys
sys.path.insert(0, "/Users/jaxonluke/Documents/PA_Quizzes/tools/cram-sheet-template")
from render import render

html = render(
    title="Cram Sheet — Physiology Exam 1",
    kicker="Physiology Exam 1 · Class of 2028",
    h1="Physiology Exam 1 Cram Sheet",
    sub="One-line description of what's covered.",
    topics=topics,
    guide_href="physiology-exam-1-study-guide.html",   # relative link back to the full guide, same folder
    footer_note="Condensed from the Physiology Exam 1 Study Guide (Class of 2028). For the full explanation and figures behind any of these, see the full guide.",
)
open("Physiology Exam 1/physiology-exam-1-cram-sheet.html", "w", encoding="utf-8").write(html)
```

`render()` derives light-tint/zebra/ink shades for each topic's `color` automatically (blend
toward white/black, not HLS lightening — HLS produces inconsistent results across hues at
different starting lightness). You only need to supply one hex color per topic.

## How the content gets built

The content itself (the `rows`) is real synthesis, not mechanical extraction, for every guide
except Physiology Exam 3 (which already had per-system "recap tables" that could be pulled
directly). For everything else: read the source study guide's `<section class="deck">` (or
equivalent) blocks in full and hand-condense each into dense term→fact rows — do not fabricate,
only compress what's already in the guide, and preserve exact numbers/names/years verbatim.
When building several cram sheets at once, this is a good candidate for parallel subagents (one
per exam, each reading its own guide and returning condensed JSON in the schema above) — see
the extraction approach used to build the initial 12 for reference.

## Sourcing Origin/Insertion/Action/Innervation-style tables

For anatomy content, this kind of granular per-item reference table (muscles, but the same
applies to nerves/vessels/etc.) usually already exists in the source lecture PPT — but often
as a **screenshot/image of a textbook table**, not a native PowerPoint table object. `python-pptx`
text extraction (`shape.has_text_frame`) will silently miss these entirely; check
`shape.has_table` too, and if neither picks up the table content, extract the slide's picture
shape(s) as image files (`shape.image.blob`, see [[new-content-full-build-policy]]'s figure-
extraction snippet) and view them directly with the Read tool to transcribe the data by hand.
Verify the "Table N.N" slide title pattern (or similar) to find exactly which slides have these
tables before transcribing anything, and always view the actual image rather than guessing from
adjacent bullet-point slides, which are usually an incomplete summary of the same data.

## After building or regenerating any cram sheet

Add its card to `guides.html` right after that exam's main study-guide card, using the
`guide-card cram` / `cram-badge` CSS classes already defined there (distinct purple accent
from the amber "Quick Reference" cards, since a cram sheet is specifically a condensed version
of *that exam's own* guide, not a standalone cross-cutting reference).
