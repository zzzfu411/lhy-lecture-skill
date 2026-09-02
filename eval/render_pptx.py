"""Approximate renderer for generated pptx decks (QA preview, 100 px/inch).

Usage: python render_pptx.py deck.pptx outdir/
Supports the shapes this skill's generators emit: rect, roundRect, ellipse,
line (flips/dash/arrowheads), rightArrow, mathPlus, pictures, text runs.
Chinese preview fonts: Noto Sans CJK SC/TC, then macOS Hiragino,
then Source Han Sans / WenQuanYi (real deck uses 微軟正黑體).
"""
import math
import re
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

from PIL import Image, ImageDraw, ImageFont

EMU = 914400
SCALE = 100
A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
P = "{http://schemas.openxmlformats.org/presentationml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"

PPTX = sys.argv[1]
OUT = Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)

CJK_CANDIDATES = [
    "/usr/share/fonts/opentype/noto/NotoSansCJKsc-Regular.otf",
    "/usr/share/fonts/opentype/noto/NotoSansCJKtc-Regular.otf",
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
    "/usr/share/fonts/opentype/noto/NotoSansCJK.ttc",
    "/usr/share/fonts/noto-cjk/NotoSansCJK-Regular.ttc",
    "/usr/share/fonts/opentype/source-han-sans/SourceHanSansCN-Regular.otf",
    "/usr/share/fonts/source-han-sans-sc/SourceHanSansSC-Regular.otf",
    "/System/Library/Fonts/Hiragino Sans GB.ttc",
    "/usr/share/fonts/truetype/wqy/wqy-microhei.ttc",
    "/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc",
    "/usr/share/fonts/truetype/droid/DroidSansFallbackFull.ttf",
]
EMOJI_CANDIDATES = [
    "/System/Library/Fonts/Apple Color Emoji.ttc",
    "/usr/share/fonts/truetype/noto/NotoColorEmoji.ttf",
    "/usr/share/fonts/truetype/noto-color-emoji/NotoColorEmoji.ttf",
]

def _first_existing(paths):
    for p in paths:
        if Path(p).is_file():
            return p
    return None

CJK = _first_existing(CJK_CANDIDATES)
EMOJI = _first_existing(EMOJI_CANDIDATES)
FONT_CACHE = {}

def font_for(px, bold=False):
    key = (px, bold)
    if key not in FONT_CACHE:
        font = None
        if CJK:
            try:
                font = ImageFont.truetype(CJK, px, index=1 if bold else 0)
            except Exception:
                try:
                    font = ImageFont.truetype(CJK, px)
                except Exception:
                    font = None
        FONT_CACHE[key] = font or ImageFont.load_default()
    return FONT_CACHE[key]

EMOJI_STRIKES = [160, 137, 96, 64, 48, 40, 32, 26, 20]
def emoji_font(px):
    best = min(EMOJI_STRIKES, key=lambda s: abs(s - px))
    key = ("e", best)
    if key not in FONT_CACHE:
        if EMOJI:
            try:
                FONT_CACHE[key] = ImageFont.truetype(EMOJI, best)
            except Exception:
                FONT_CACHE[key] = font_for(px)
        else:
            FONT_CACHE[key] = font_for(px)
    return FONT_CACHE[key], best

def color_of(el):
    c = el.find(f".//{A}srgbClr")
    if c is None:
        return None
    a = 255
    al = c.find(f"{A}alpha")
    if al is not None:
        a = int(int(al.get("val")) / 100000 * 255)
    v = c.get("val")
    return (int(v[0:2], 16), int(v[2:4], 16), int(v[4:6], 16), a)

def is_emoji_text(s):
    s = s.strip()
    return 0 < len(s) <= 3 and any(ord(ch) >= 0x1F000 or 0x2600 <= ord(ch) <= 0x27BF for ch in s)

def render(xml, idx, rels_xml, zf):
    img = Image.new("RGB", (1333, 750), "white")
    dr = ImageDraw.Draw(img, "RGBA")
    root = ET.fromstring(xml)
    rmap = {}
    if rels_xml is not None:
        rroot = ET.fromstring(rels_xml)
        rmap = {r.get("Id"): r.get("Target") for r in rroot}
    import io

    def draw_pic(pic):
        blip = pic.find(f".//{A}blip")
        if blip is None:
            return
        tgt = rmap.get(blip.get(f"{R}embed"))
        if not tgt:
            return
        media = "ppt/" + tgt.replace("../", "")
        try:
            pim = Image.open(io.BytesIO(zf.read(media))).convert("RGBA")
        except Exception:
            return
        spPr = pic.find(f"{P}spPr")
        ext = spPr.find(f"{A}xfrm/{A}ext") if spPr is not None else None
        off = spPr.find(f"{A}xfrm/{A}off") if spPr is not None else None
        if ext is None or off is None:
            return
        x = int(off.get("x")) / EMU * SCALE
        y = int(off.get("y")) / EMU * SCALE
        w = max(1, int(int(ext.get("cx")) / EMU * SCALE))
        h = max(1, int(int(ext.get("cy")) / EMU * SCALE))
        pim = pim.resize((w, h))
        img.paste(pim, (int(x), int(y)), pim)

    spTree = root.find(f"{P}cSld/{P}spTree")
    elements = list(spTree) if spTree is not None else []
    texts_todo = []
    for el in elements:
        tag = el.tag.split("}")[1]
        if tag == "pic":
            draw_pic(el)
            continue
        if tag != "sp":
            continue
        sp = el
        spPr = sp.find(f"{P}spPr")
        if spPr is None:
            continue
        xfrm = spPr.find(f"{A}xfrm")
        if xfrm is None:
            continue
        off = xfrm.find(f"{A}off"); ext = xfrm.find(f"{A}ext")
        x = int(off.get("x")) / EMU * SCALE
        y = int(off.get("y")) / EMU * SCALE
        w = int(ext.get("cx")) / EMU * SCALE
        h = int(ext.get("cy")) / EMU * SCALE
        flipH = xfrm.get("flipH") == "1"
        flipV = xfrm.get("flipV") == "1"
        geom = spPr.find(f"{A}prstGeom")
        shape = geom.get("prst") if geom is not None else "rect"
        sf = spPr.find(f"{A}solidFill")
        fill = color_of(sf) if sf is not None else None
        ln = spPr.find(f"{A}ln")
        line_col = None; line_w = 1; dash = None; head_t = tail_t = None
        if ln is not None:
            lf = ln.find(f"{A}solidFill")
            line_col = color_of(lf) if lf is not None else None
            if ln.get("w"):
                line_w = max(1, round(int(ln.get("w")) / 12700 / 72 * SCALE))
            pd = ln.find(f"{A}prstDash")
            dash = pd.get("val") if pd is not None else None
            he = ln.find(f"{A}headEnd"); te = ln.find(f"{A}tailEnd")
            head_t = he.get("type") if he is not None and he.get("type") != "none" else None
            tail_t = te.get("type") if te is not None and te.get("type") != "none" else None

        if shape == "line":
            x1, y1, x2, y2 = x, y, x + w, y + h
            if flipH: x1, x2 = x2, x1
            if flipV: y1, y2 = y2, y1
            col = line_col or (0, 0, 0, 255)
            if dash in ("sysDot", "dash"):
                L = max(1.0, math.hypot(x2 - x1, y2 - y1)); n = max(2, int(L / 6))
                for i in range(0, n, 2):
                    t0, t1 = i / n, min((i + 1) / n, 1)
                    dr.line([x1+(x2-x1)*t0, y1+(y2-y1)*t0, x1+(x2-x1)*t1, y1+(y2-y1)*t1], fill=col, width=line_w)
            else:
                dr.line([x1, y1, x2, y2], fill=col, width=line_w)
            ang = math.atan2(y2 - y1, x2 - x1)
            def arrow(px_, py_, a_):
                sz = 7 + line_w * 2.5
                dr.polygon([(px_, py_), (px_-sz*math.cos(a_-0.42), py_-sz*math.sin(a_-0.42)), (px_-sz*math.cos(a_+0.42), py_-sz*math.sin(a_+0.42))], fill=col)
            if tail_t: arrow(x2, y2, ang)
            if head_t: arrow(x1, y1, ang + math.pi)
            continue

        box = [x, y, x + w, y + h]
        if shape == "roundRect":
            r = max(2, min(w, h) * 0.15)
            if fill and fill[3] > 10:
                dr.rounded_rectangle(box, radius=r, fill=fill)
            if line_col and line_col[3] > 10:
                if dash in ("sysDot", "dash"):
                    step = 8
                    xx = x
                    while xx < x + w:
                        dr.line([xx, y, min(xx+step, x+w), y], fill=line_col, width=line_w)
                        dr.line([xx, y+h, min(xx+step, x+w), y+h], fill=line_col, width=line_w)
                        xx += step * 2
                    yy = y
                    while yy < y + h:
                        dr.line([x, yy, x, min(yy+step, y+h)], fill=line_col, width=line_w)
                        dr.line([x+w, yy, x+w, min(yy+step, y+h)], fill=line_col, width=line_w)
                        yy += step * 2
                else:
                    dr.rounded_rectangle(box, radius=r, outline=line_col, width=line_w)
        elif shape == "ellipse":
            if fill and fill[3] > 10: dr.ellipse(box, fill=fill)
            if line_col and line_col[3] > 10: dr.ellipse(box, outline=line_col, width=line_w)
        elif shape == "rightArrow":
            col = fill or (166, 166, 166, 255)
            bh = h * 0.5
            dr.polygon([(x, y+(h-bh)/2), (x+w*0.55, y+(h-bh)/2), (x+w*0.55, y), (x+w, y+h/2), (x+w*0.55, y+h), (x+w*0.55, y+(h+bh)/2), (x, y+(h+bh)/2)], fill=col)
        elif shape == "mathPlus":
            col = fill or (166, 166, 166, 255)
            t = w * 0.32
            dr.rectangle([x+(w-t)/2, y, x+(w+t)/2, y+h], fill=col)
            dr.rectangle([x, y+(h-t)/2, x+w, y+(h+t)/2], fill=col)
        else:
            if fill and fill[3] > 10: dr.rectangle(box, fill=fill)
            if line_col and line_col[3] > 10 and shape == "rect": dr.rectangle(box, outline=line_col, width=line_w)

        tx = sp.find(f"{P}txBody")
        if tx is None:
            continue
        bodyPr = tx.find(f"{A}bodyPr")
        anchor = bodyPr.get("anchor") if bodyPr is not None else None
        lines = []
        for para in tx.findall(f"{A}p"):
            pPr = para.find(f"{A}pPr")
            algn = pPr.get("algn") if pPr is not None else None
            runs = []
            for r in para.findall(f"{A}r"):
                rPr = r.find(f"{A}rPr"); t = r.find(f"{A}t")
                if t is None or not (t.text or ""):
                    continue
                size = int(rPr.get("sz", "1800")) / 100 if rPr is not None else 18
                bold = rPr is not None and rPr.get("b") == "1"
                und = rPr is not None and rPr.get("u") not in (None, "none")
                col = (0, 0, 0, 255)
                if rPr is not None:
                    sfr = rPr.find(f"{A}solidFill")
                    if sfr is not None:
                        col = color_of(sfr) or col
                runs.append((t.text, size, bold, und, col))
            if runs:
                lines.append((algn, runs))
        if lines:
            texts_todo.append((x, y, w, h, anchor, lines))

    for x, y, w, h, anchor, lines in texts_todo:
        metrics = [max(r[1] for r in runs) / 72 * SCALE * 1.28 for _, runs in lines]
        total = sum(metrics)
        ty = y + (h - total) / 2 if anchor == "ctr" else y + 2
        for (algn, runs), lh in zip(lines, metrics):
            pieces = []; tw = 0
            for text, size, bold, und, col in runs:
                px = max(8, round(size / 72 * SCALE))
                if is_emoji_text(text):
                    f, strike = emoji_font(px)
                    pw = px * 1.15
                    pieces.append((text, f, col, pw, px, True, und, strike))
                else:
                    f = font_for(px, bold)
                    bb = dr.textbbox((0, 0), text, font=f)
                    pieces.append((text, f, col, bb[2] - bb[0], px, False, und, 0))
                    pw = bb[2] - bb[0]
                tw += pw
            if algn == "ctr": cx = x + (w - tw) / 2
            elif algn == "r": cx = x + w - tw
            else: cx = x + 3
            for text, f, col, pw, px, emj, und, strike in pieces:
                if emj:
                    eimg = Image.new("RGBA", (strike + 20, strike + 20), (0, 0, 0, 0))
                    ed = ImageDraw.Draw(eimg)
                    try:
                        ed.text((0, 0), text.strip(), font=f, embedded_color=True)
                        eimg = eimg.resize((px + 4, px + 4))
                        img.paste(eimg, (int(cx), int(ty)), eimg)
                    except Exception:
                        dr.ellipse([cx, ty, cx + px, ty + px], fill=(255, 200, 60, 255))
                else:
                    dr.text((cx, ty), text, font=f, fill=col)
                    if und:
                        bb = dr.textbbox((cx, ty), text, font=f)
                        dr.line([bb[0], bb[3] + 2, bb[2], bb[3] + 2], fill=col, width=2)
                cx += pw
            ty += lh
    img.save(OUT / f"s{idx:02d}.png")

z = zipfile.ZipFile(PPTX)
slides = sorted([n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)], key=lambda s: int(re.search(r"(\d+)", s).group(1)))
for i, name in enumerate(slides, 1):
    relname = name.replace("slides/", "slides/_rels/") + ".rels"
    rels = z.read(relname) if relname in z.namelist() else None
    render(z.read(name), i, rels, z)
print("rendered", len(slides))
