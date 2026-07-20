import json, colorsys, os

_HERE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE = open(os.path.join(_HERE, "template.html"), encoding="utf-8").read()

def hex_to_rgb(h):
    h = h.lstrip("#")
    if len(h) == 3:
        h = "".join(c*2 for c in h)
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(rgb):
    return "#" + "".join(f"{max(0,min(255,int(round(c)))):02x}" for c in rgb)

def lighten(hexcolor, amount):
    r, g, b = [c/255 for c in hex_to_rgb(hexcolor)]
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    l = min(1, l + amount)
    r2, g2, b2 = colorsys.hls_to_rgb(h, l, s)
    return rgb_to_hex((r2*255, g2*255, b2*255))

def darken(hexcolor, amount):
    return lighten(hexcolor, -amount)

def derive_palette(oxblood, brass, teal):
    """Map the site's existing 3-color quiz palette onto the exam-navigator
    engine's 4-slot palette (navy/indigo/gold/ice), preserving each file's
    established visual identity rather than inventing new colors."""
    navy = darken(oxblood, 0.06) if sum(hex_to_rgb(oxblood)) > 200 else oxblood
    indigo = teal
    gold = brass
    ice = lighten(teal, 0.46)
    return navy, indigo, gold, ice

def convert_question(q):
    """{topic,q,choices,answer,correct,why,src} -> {topic,io,q,opts,c,cite}
    Per-option explanation text isn't available in the source schema (only
    one consolidated 'correct' string and one consolidated 'why' string
    covering all wrong choices together) -- rather than fabricate false
    per-option distinctions, every wrong choice's row shows the same shared
    'why' text and the correct choice's row shows 'correct'. This preserves
    100% of the original explanatory content without inventing anything."""
    choices = q["choices"]
    ans = q["answer"]
    correct_text = q.get("correct", "")
    why_text = q.get("why", "")
    opts = [[c, (correct_text if i == ans else why_text)] for i, c in enumerate(choices)]
    topic = q.get("topic", "")
    return {
        "topic": topic,
        "io": topic,
        "q": q["q"],
        "opts": opts,
        "c": ans,
        "cite": q.get("src", ""),
    }

def render(*, title, h1, sub, pill, chips, intro, questions,
           oxblood=None, brass=None, teal=None,
           navy=None, indigo=None, gold=None, ice=None,
           already_converted=False):
    """already_converted=True: `questions` are already in the native
    {topic,io,q,opts:[[text,explanation],...],c,cite} schema (the preferred
    path for brand-new quiz content, where each option can get its own real
    explanation instead of a shared 'why' text). Default False expects the
    legacy {topic,q,choices,answer,correct,why,src} schema and runs
    convert_question() first."""
    if not (navy and indigo and gold and ice):
        navy, indigo, gold, ice = derive_palette(oxblood, brass, teal)
    converted = questions if already_converted else [convert_question(q) for q in questions]
    chips_html = "".join(f'<span class="chip">{c}</span>' for c in chips)
    src = TEMPLATE
    src = src.replace("__NAVY__", navy)
    src = src.replace("__INDIGO__", indigo)
    src = src.replace("__GOLD__", gold)
    src = src.replace("__ICE__", ice)
    src = src.replace("__TITLE__", title)
    src = src.replace("__H1__", h1)
    src = src.replace("__SUB__", sub)
    src = src.replace("__PILL__", pill)
    src = src.replace("__CHIPS__", chips_html)
    src = src.replace("__INTRO__", intro)
    src = src.replace("__QUESTIONS_JSON__", json.dumps(converted, ensure_ascii=False))
    return src
