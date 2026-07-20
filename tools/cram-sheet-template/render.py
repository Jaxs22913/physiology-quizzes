import colorsys, os

_HERE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE = open(os.path.join(_HERE, "template.html"), encoding="utf-8").read()

def hex_to_rgb(h):
    h = h.lstrip("#")
    if len(h) == 3:
        h = "".join(c*2 for c in h)
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(rgb):
    return "#" + "".join(f"{max(0,min(255,int(round(c)))):02x}" for c in rgb)

def mix(hexcolor, target, frac):
    r, g, b = hex_to_rgb(hexcolor)
    tr, tg, tb = target
    return rgb_to_hex((r + (tr-r)*frac, g + (tg-g)*frac, b + (tb-b)*frac))

def tint(hexcolor, frac):
    """Blend toward white by `frac` (0-1) -- consistent pastel regardless of the source hue's own lightness."""
    return mix(hexcolor, (255, 255, 255), frac)

def shade(hexcolor, frac):
    """Blend toward black by `frac` (0-1) -- for a readable dark ink version of an accent color."""
    return mix(hexcolor, (0, 0, 0), frac)

def topic_html(topic):
    acc = topic["color"]
    acc_bg = tint(acc, 0.86)
    acc_zebra = tint(acc, 0.93)
    acc_ink = shade(acc, 0.22)
    tid = topic["id"]
    label = topic["label"]
    tag = topic.get("tag", "")
    tag_html = f'<span class="tag">{tag}</span>' if tag else ""
    rows_html = "\n".join(
        f'          <tr><td class="h">{term}</td><td>{fact}</td></tr>'
        for term, fact in topic["rows"]
    )
    return f"""  <section class="topic" id="{tid}" style="--acc:{acc};--acc-bg:{acc_bg};--acc-zebra:{acc_zebra};--acc-ink:{acc_ink}">
    <div class="shead"><span class="dot" style="background:{acc}"></span><h2>{label}{tag_html}</h2></div>
    <div class="scroll">
      <table>
        <thead><tr><th class="term">{topic.get('col1', 'Term')}</th><th>{topic.get('col2', 'What you need to know')}</th></tr></thead>
        <tbody>
{rows_html}
        </tbody>
      </table>
    </div>
  </section>"""

def toc_chip(topic):
    acc_ink = shade(topic["color"], 0.22)
    return f'      <a href="#{topic["id"]}" style="color:{acc_ink}"><span class="dot" style="background:{topic["color"]}"></span>{topic["label"]}</a>'

def render(*, title, kicker, h1, sub, topics, guide_href, footer_note, primary=None):
    if primary is None:
        primary = topics[0]["color"]
    toc_html = "\n".join(toc_chip(t) for t in topics)
    topics_html = "\n\n".join(topic_html(t) for t in topics)
    src = TEMPLATE
    src = src.replace("__TITLE__", title)
    src = src.replace("__KICKER__", kicker)
    src = src.replace("__H1__", h1)
    src = src.replace("__SUB__", sub)
    src = src.replace("__TOC_CHIPS__", toc_html)
    src = src.replace("__GUIDE_HREF__", guide_href)
    src = src.replace("__TOPICS_HTML__", topics_html)
    src = src.replace("__FOOTER_NOTE__", footer_note)
    src = src.replace("__PRIMARY__", primary)
    return src
