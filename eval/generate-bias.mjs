import pptxgen from "pptxgenjs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(__dirname, "..", "assets");
const FONT = "Microsoft JhengHei";
const MATH = "Cambria Math";

const C = {
  black: "000000", white: "FFFFFF",
  red: "FF0000", blue: "0070C0", green: "00B050", gold: "FFC000",
  yellow: "FFD400", fbox: "BDD7EE", fline: "4472C4", gray: "666666",
  arrowGray: "A6A6A6",
  lav: "B4C7E7", pale: "FFE699", coral: "F8CBAD",
};

const pres = new pptxgen();
pres.defineLayout({ name: "LHY_WIDE", width: 13.333, height: 7.5 });
pres.layout = "LHY_WIDE";
pres.author = "lhy-lecture-style eval v3";
pres.title = "一堂课看懂 bias（复测 v3）";

const notes = (s, t) => s.addNotes(t);

function title(s, text) {
  s.addText(text, {
    x: 0.45, y: 0.2, w: 12.5, h: 0.62,
    fontFace: FONT, fontSize: 30, color: C.black, margin: 0,
  });
}

function txt(s, text, o = {}) {
  s.addText(text, {
    fontFace: o.math ? MATH : FONT,
    fontSize: 18, color: C.black, margin: 0, align: "left", ...o,
  });
}

/** solid black data-flow arrow (horizontal) */
function flowArrow(s, x, y, len) {
  s.addShape(pres.shapes.LINE, {
    x, y, w: len, h: 0.001,
    line: { color: C.black, width: 3, endArrowType: "triangle" },
  });
}

/** dotted aside line/arrow; dir: "none" | "end" | "begin" */
function dotted(s, x1, y1, x2, y2, opts = {}) {
  const x = Math.min(x1, x2), y = Math.min(y1, y2);
  const w = Math.max(Math.abs(x2 - x1), 0.001), h = Math.max(Math.abs(y2 - y1), 0.001);
  s.addShape(pres.shapes.LINE, {
    x, y, w, h,
    flipH: x2 < x1, flipV: y2 < y1,
    line: {
      color: opts.color || C.black, width: opts.width || 1.75, dashType: "sysDot",
      ...(opts.head === "end" ? { endArrowType: "triangle" } : {}),
      ...(opts.head === "begin" ? { beginArrowType: "triangle" } : {}),
    },
  });
}

/** solid diagonal arrow for trees */
function diag(s, x1, y1, x2, y2, opts = {}) {
  const x = Math.min(x1, x2), y = Math.min(y1, y2);
  const w = Math.max(Math.abs(x2 - x1), 0.001), h = Math.max(Math.abs(y2 - y1), 0.001);
  s.addShape(pres.shapes.LINE, {
    x, y, w, h,
    flipH: x2 < x1, flipV: y2 < y1,
    line: { color: opts.color || C.black, width: opts.width || 2.5, endArrowType: "triangle", dashType: opts.dash || "solid" },
  });
}

function redRoundFrame(s, x, y, w, h, dash = false) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: C.white, transparency: 100 },
    line: { color: C.red, width: 2.5, ...(dash ? { dashType: "dash" } : {}) },
    rectRadius: 0.12,
  });
}

function dottedBox(s, x, y, w, h) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: C.white, transparency: 100 },
    line: { color: C.black, width: 2, dashType: "sysDot" },
    rectRadius: 0.1,
  });
}

/** the model box with robot clipart (his image5) */
function fBox(s, x, y, w, h, label = "f") {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, fill: { color: C.fbox }, line: { color: C.fline, width: 1.5 }, rectRadius: 0.15,
  });
  const iw = Math.min(w - 0.5, h * 0.45, 1.35);
  const iy = y + Math.max(h * 0.08, (h - iw - 0.55) / 2);
  s.addImage({ path: join(ASSETS, "robot-f.png"), x: x + (w - iw) / 2, y: iy, w: iw, h: iw });
  txt(s, label, { x, y: iy + iw + 0.05, w, h: 0.5, fontSize: 28, italic: true, math: true, align: "center" });
}

/** one data sample: his PPT-file clipart + label */
function sample(s, x, y, label) {
  s.addImage({ path: join(ASSETS, "ppt-file.png"), x, y, w: 0.8, h: 0.8 });
  txt(s, label, { x: x - 0.4, y: y + 0.84, w: 1.6, h: 0.35, fontSize: 15, align: "center" });
}

/** colored formula y = w x + b */
function formula(s, x, y, runs, size = 30, w = 4.0) {
  s.addText(
    runs.map(([t, c, it]) => ({
      text: t,
      options: { color: c || C.black, italic: it !== false, fontFace: MATH, fontSize: size },
    })),
    { x, y, w, h: 0.62, margin: 0 }
  );
}

// ============ 1 封面 ============
{
  const s = pres.addSlide();
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.black }, line: { color: C.black, width: 0 } });
  txt(s, "一堂课看懂", { x: 0.7, y: 1.5, w: 12, h: 0.6, fontSize: 28, color: C.white });
  txt(s, "bias", { x: 0.7, y: 2.2, w: 12, h: 1.2, fontSize: 72, color: C.yellow, italic: true, math: true });
  txt(s, "的概念", { x: 0.7, y: 3.5, w: 12, h: 0.6, fontSize: 28, color: C.white });
  txt(s, "能用的函式太少，再认真也对不齐", { x: 0.7, y: 4.35, w: 11, h: 0.5, fontSize: 18, color: "CCCCCC" });
  txt(s, "评测用 · v3", { x: 10.1, y: 6.75, w: 2.6, h: 0.4, fontSize: 18, color: C.yellow, align: "right" });
  notes(s, "好，那我们就开始上课吧。今天只讲一件事：有时候不是你算得不够认真，是你能用的函式太少。今天不讲 overfitting。");
}

// ============ 2 钩子 ============
{
  const s = pres.addSlide();
  title(s, "这堂课的投影片有 80 页，还要讲多久？");
  sample(s, 2.0, 2.0, "80 页");
  txt(s, "x", { x: 1.75, y: 3.15, w: 1.4, h: 0.45, fontSize: 26, italic: true, math: true, align: "center" });
  flowArrow(s, 3.3, 2.45, 1.3);
  s.addImage({ path: join(ASSETS, "question-bubble.png"), x: 4.95, y: 1.75, w: 1.15, h: 1.15 });
  txt(s, "还要讲几分钟", { x: 4.35, y: 3.05, w: 2.4, h: 0.4, fontSize: 18, align: "center" });
  s.addImage({ path: join(ASSETS, "person.png"), x: 8.3, y: 1.95, w: 0.95, h: 0.95 });
  txt(s, "正在估的你", { x: 8.0, y: 2.95, w: 1.6, h: 0.4, fontSize: 15, align: "center", color: C.gray });
  dotted(s, 5.75, 5.35, 5.75, 3.75, { head: "end" });
  txt(s, "你心里已经有一个函式在跑了", { x: 4.05, y: 5.45, w: 5.4, h: 0.45, fontSize: 20 });
  txt(s, "往年：10 页讲了 18 分钟，20 页讲了 32 分钟（数字是示意）", { x: 0.45, y: 6.55, w: 12.4, h: 0.4, fontSize: 16, color: C.gray });
  notes(s, "先不讲名词。你现在就坐在教室里，看到 80 页，心里已经在估还要讲多久。这个「估」就是一个函式。等一下我们让助教把它写出来。");
}

// ============ 3 资料流全图 ============
{
  const s = pres.addSlide();
  title(s, "把问题画出来：页数进去，分钟出来");
  sample(s, 1.7, 2.1, "投影片");
  txt(s, "x", { x: 1.45, y: 3.25, w: 1.4, h: 0.45, fontSize: 26, italic: true, math: true, align: "center" });
  txt(s, "（页数）", { x: 1.25, y: 3.7, w: 1.8, h: 0.35, fontSize: 14, align: "center", color: C.gray });
  flowArrow(s, 3.1, 2.5, 1.4);
  fBox(s, 4.7, 1.5, 2.3, 2.2);
  flowArrow(s, 7.2, 2.5, 1.4);
  txt(s, "Regression", { x: 9.0, y: 1.35, w: 3.4, h: 0.5, fontSize: 24, underline: true, align: "center", fontFace: "Calibri", bold: true });
  txt(s, "数字", { x: 9.0, y: 2.0, w: 3.4, h: 0.5, fontSize: 24, align: "center" });
  txt(s, "（还要讲几分钟）", { x: 9.0, y: 2.55, w: 3.4, h: 0.4, fontSize: 16, align: "center" });
  txt(s, "f(x)", { x: 9.0, y: 3.1, w: 3.4, h: 0.5, fontSize: 26, italic: true, math: true, align: "center" });
  dotted(s, 5.85, 5.6, 5.85, 4.0, { head: "end" });
  txt(s, "如何根据资料找出这个函式 f ？", { x: 3.9, y: 5.7, w: 6.0, h: 0.5, fontSize: 20 });
  notes(s, "输入是页数，输出是一个数字：还要讲几分钟。这种输出数字的问题叫 Regression。问题只剩一个：函式 f 怎么来？");
}

// ============ 4 模型：公式上色 ============
{
  const s = pres.addSlide();
  title(s, "助教的抽屉里只有一条直线");
  // left: candidate inputs
  txt(s, "函式的输入只能是数字", { x: 0.5, y: 1.15, w: 2.9, h: 0.75, fontSize: 16 });
  txt(s, "页数", { x: 0.6, y: 2.15, w: 1.4, h: 0.4, fontSize: 18 });
  txt(s, "x", { x: 2.0, y: 2.13, w: 0.6, h: 0.45, fontSize: 22, italic: true, math: true });
  txt(s, "内容总字数", { x: 0.6, y: 2.75, w: 1.7, h: 0.4, fontSize: 18, color: C.gray });
  txt(s, "x₂", { x: 2.3, y: 2.73, w: 0.6, h: 0.45, fontSize: 22, italic: true, math: true, color: C.gray });
  txt(s, "老师的兴致", { x: 0.6, y: 3.35, w: 1.7, h: 0.4, fontSize: 18, color: C.gray });
  txt(s, "x₃", { x: 2.3, y: 3.33, w: 0.6, h: 0.45, fontSize: 22, italic: true, math: true, color: C.gray });
  dotted(s, 1.5, 3.95, 1.5, 4.55);
  txt(s, "（今天只准用页数这一项）", { x: 0.5, y: 4.7, w: 3.2, h: 0.4, fontSize: 14, color: C.red });
  // right: model formula in red dotted frame
  redRoundFrame(s, 4.6, 1.7, 4.4, 1.0, true);
  formula(s, 4.95, 1.9, [["y", null], [" = ", C.black, false], ["w", C.blue], [" x", null], [" + ", C.black, false], ["b", C.red]], 34, 3.8);
  txt(s, "模型 (Model)", { x: 9.25, y: 1.55, w: 2.6, h: 0.45, fontSize: 20, color: C.blue });
  s.addImage({ path: join(ASSETS, "person.png"), x: 9.2, y: 2.2, w: 0.62, h: 0.62 });
  txt(s, "出自助教对下课的渴望，\n不是对资料的理解", { x: 9.95, y: 2.15, w: 3.2, h: 0.8, fontSize: 15, color: C.red });
  formula(s, 4.95, 3.3, [["y", null], [" = ", C.black, false], ["w₁", C.blue], ["x", null], [" + ", C.black, false], ["w₂", C.blue], ["x²", null], [" + ", C.black, false], ["b", C.red]], 26);
  formula(s, 4.95, 4.0, [["y", null], [" = ", C.black, false], ["w₁", C.blue], ["x", null], [" + ", C.black, false], ["w₂", C.blue], ["x²", null], [" + ", C.black, false], ["w₃", C.blue], ["x³", null], [" + ", C.black, false], ["b", C.red]], 26);
  txt(s, "本来有无尽的可能……", { x: 4.95, y: 4.75, w: 3.6, h: 0.45, fontSize: 18, color: C.gray });
  txt(s, "但抽屉被锁在第一条 🔒", { x: 8.4, y: 4.75, w: 3.8, h: 0.45, fontSize: 18, color: C.red });
  s.addImage({ path: join(ASSETS, "ruler.png"), x: 5.3, y: 5.35, w: 1.35, h: 0.9 });
  txt(s, "抽屉里唯一的工具", { x: 6.85, y: 5.6, w: 3.2, h: 0.4, fontSize: 16, color: C.gray });
  txt(s, "w 是斜率（蓝），b 是截距（红）。能弯的项今天都不准用。", { x: 0.45, y: 6.55, w: 12.4, h: 0.4, fontSize: 16, color: C.gray });
  notes(s, "模型长这样。蓝色的 w、红色的 b 是仅有的两个旋钮。下面那些带平方、立方的式子才弯得起来，但今天抽屉锁住，只准第一条。");
}

// ============ 5–7 浮动演算（复制递增） ============
const ROWS = [
  { page: "10 页", pred: "17", calc: "(18−17)² = 1", act: "18" },
  { page: "20 页", pred: "29", calc: "(32−29)² = 9", act: "32" },
  { page: "80 页", pred: "101", calc: "(58−101)² = 1849", act: "58" },
];
const ROW_Y = [1.35, 2.85, 4.35];

function lossPage(nRows, opts = {}) {
  const s = pres.addSlide();
  title(s, "助教的直线，拿去对答案会怎样？");
  txt(s, "直线预测", { x: 6.15, y: 0.85, w: 1.5, h: 0.4, fontSize: 16, color: C.gray, align: "center" });
  txt(s, "实际讲了", { x: 11.3, y: 0.85, w: 1.5, h: 0.4, fontSize: 16, color: C.gray, align: "center" });
  for (let i = 0; i < nRows; i++) {
    const y = ROW_Y[i];
    const r = ROWS[i];
    sample(s, 0.85, y - 0.15, r.page);
    flowArrow(s, 2.15, y + 0.22, 0.9);
    if (i === 0) fBox(s, 3.2, 1.15, 1.9, nRows === 1 ? 1.35 : 4.3);
    flowArrow(s, 5.25, y + 0.22, 0.75);
    txt(s, r.pred, { x: 6.15, y: y - 0.05, w: 1.5, h: 0.6, fontSize: 26, math: true, align: "center", color: i === 2 ? C.red : C.black });
    dotted(s, 7.75, y + 0.22, 8.25, y + 0.22);
    txt(s, r.calc, { x: 8.3, y: y - 0.02, w: 2.75, h: 0.55, fontSize: 20, math: true, color: i === 2 ? C.red : C.black });
    dotted(s, 11.15, y + 0.22, 11.5, y + 0.22);
    txt(s, r.act, { x: 11.5, y: y - 0.05, w: 1.3, h: 0.6, fontSize: 26, math: true, align: "center" });
  }
  if (nRows >= 3) {
    dotted(s, 3.0, 5.5, 3.0, 5.5); // no-op keeper
    dottedBox(s, 8.15, 1.0, 3.05, 4.35);
    txt(s, "残差平方，越大越糟", { x: 7.0, y: 5.65, w: 3.4, h: 0.45, fontSize: 18 });
    dotted(s, 10.35, 5.87, 11.0, 5.87, { head: "end" });
    txt(s, "Loss", { x: 11.05, y: 5.6, w: 1.6, h: 0.5, fontSize: 24, bold: true, fontFace: "Calibri" });
  }
  if (opts.explode) {
    redRoundFrame(s, 8.2, 4.15, 2.95, 0.85);
    txt(s, "80 页那笔爆炸了：不是没认真，是尺子太直", { x: 0.45, y: 6.55, w: 12.4, h: 0.45, fontSize: 18, color: C.red });
  } else {
    txt(s, "数字是示意。w、b 已调到这条直线能做到的最好。", { x: 0.45, y: 6.55, w: 12.4, h: 0.4, fontSize: 16, color: C.gray });
  }
  return s;
}
notes(lossPage(1), "对答案。第一笔：10 页，直线说 17 分钟，实际 18。差 1 分钟，平方是 1。很好。");
notes(lossPage(3), "把三笔都对完。10 页差 1，20 页差 9。80 页呢？直线说 101，实际 58。(58−101) 的平方，1849。把每一笔加起来，就是 Loss。");
notes(lossPage(3, { explode: true }), "红框圈住那笔。1849 不是助教偷懒——w 和 b 已经调到这条直线的极限。资料后半段是弯的，直线追不上去。这就是今天的主角。");

// ============ 8 课核 + 图例 ============
{
  const s = pres.addSlide();
  title(s, "能用的函式太少，再认真也对不齐");
  s.addImage({ path: join(ASSETS, "toolbox.png"), x: 1.45, y: 1.5, w: 1.05, h: 1.05 });
  txt(s, "抽屉里只有直线", { x: 0.75, y: 2.7, w: 2.5, h: 0.4, fontSize: 16, align: "center" });
  dotted(s, 2.9, 2.1, 3.8, 2.1, { head: "end" });
  formula(s, 3.95, 1.85, [["y", null], [" = ", C.black, false], ["w", C.blue], [" x", null], [" + ", C.black, false], ["b", C.red]], 26, 2.8);
  s.addImage({ path: join(ASSETS, "database.png"), x: 7.0, y: 1.5, w: 1.05, h: 1.05 });
  txt(s, "资料后半是弯的", { x: 6.4, y: 2.7, w: 2.5, h: 0.4, fontSize: 16, align: "center" });
  dotted(s, 8.5, 2.1, 9.4, 2.1, { head: "end" });
  txt(s, "(58−101)² = 1849", { x: 9.5, y: 1.85, w: 3.4, h: 0.55, fontSize: 22, math: true, color: C.red });
  redRoundFrame(s, 1.15, 3.75, 11.0, 1.5);
  txt(s, "训练资料上的 Loss 就已经下不去了\n—— 这不是没训练够，是模型太笨", { x: 1.5, y: 3.95, w: 10.3, h: 1.1, fontSize: 24, align: "center" });
  txt(s, "图例：抽屉 = 模型的候选集合；直尺 = y=wx+b；对不齐 = 训练 Loss 高", { x: 0.45, y: 6.55, w: 12.4, h: 0.4, fontSize: 16, color: C.gray });
  notes(s, "今天要记住的就是这一句。抽屉太小，最好的那条直线也差 1849。等一下给它英文名字。");
}

// ============ 9 命名 ============
{
  const s = pres.addSlide();
  title(s, "bias 是什么意思呢？");
  txt(s, "你可以把它想成：", { x: 0.6, y: 1.2, w: 5.0, h: 0.5, fontSize: 24 });
  txt(s, "能找的函式太少", { x: 0.6, y: 1.85, w: 6.2, h: 0.8, fontSize: 40, bold: true });
  s.addImage({ path: join(ASSETS, "toolbox.png"), x: 1.55, y: 3.0, w: 0.95, h: 0.95 });
  txt(s, "小抽屉", { x: 1.35, y: 4.0, w: 1.4, h: 0.4, fontSize: 17, align: "center" });
  diag(s, 3.4, 3.55, 4.6, 3.55);
  txt(s, "最好的一条仍差 1849", { x: 4.7, y: 3.3, w: 4.3, h: 0.5, fontSize: 22, math: false });
  dotted(s, 5.4, 4.35, 5.4, 3.85, { head: "end", color: C.red });
  txt(s, "训练的时候就露馅，不用等考试", { x: 3.4, y: 4.45, w: 6.2, h: 0.5, fontSize: 20, color: C.red });
  txt(s, "（有人叫它 underfitting，同一张脸的另一个名字）", { x: 0.6, y: 5.5, w: 9.5, h: 0.45, fontSize: 18, color: C.gray });
  txt(s, "model bias 的 bias ≠ 统计学里 estimator 的 bias，今天先不分家。", { x: 0.45, y: 6.55, w: 12.4, h: 0.4, fontSize: 14, color: C.gray });
  notes(s, "这个东西有个名字，叫 bias。bias 是什么意思呢？你可以把它想成：能找的函式太少。训练资料上就输了，这是它和另一头最大的差别。");
}

// ============ 10 判断树 ============
{
  const s = pres.addSlide();
  title(s, "Loss 下不去，先看哪里？");
  txt(s, "General Guide", { x: 0.5, y: 0.95, w: 3.0, h: 0.5, fontSize: 22, italic: true, underline: true, fontFace: "Calibri", bold: true });
  redRoundFrame(s, 4.7, 1.05, 3.9, 0.7);
  txt(s, "训练资料上的 Loss", { x: 4.7, y: 1.15, w: 3.9, h: 0.5, fontSize: 20, align: "center" });
  diag(s, 5.6, 1.85, 3.4, 3.0);
  txt(s, "大", { x: 3.7, y: 2.05, w: 0.8, h: 0.45, fontSize: 20, bold: true });
  diag(s, 7.7, 1.85, 9.9, 3.0);
  txt(s, "小", { x: 8.9, y: 2.05, w: 0.8, h: 0.45, fontSize: 20, bold: true });
  // left: bias vs optimization
  redRoundFrame(s, 1.15, 3.1, 2.6, 0.95);
  txt(s, "model bias\n抽屉太小", { x: 1.15, y: 3.2, w: 2.6, h: 0.8, fontSize: 17, align: "center" });
  diag(s, 4.2, 3.1, 5.4, 3.75);
  txt(s, "optimization", { x: 4.75, y: 2.62, w: 2.3, h: 0.45, fontSize: 17 });
  txt(s, "换更有弹性的模型\n（加 x²，或换网络）", { x: 0.7, y: 4.35, w: 3.5, h: 0.8, fontSize: 17, color: C.blue });
  txt(s, "下一讲", { x: 5.2, y: 4.0, w: 1.8, h: 0.45, fontSize: 17, color: C.blue });
  // right: testing loss
  txt(s, "测试资料上的 Loss", { x: 8.9, y: 3.1, w: 3.3, h: 0.5, fontSize: 19 });
  diag(s, 9.9, 3.6, 8.9, 4.6);
  txt(s, "大", { x: 9.0, y: 3.85, w: 0.7, h: 0.4, fontSize: 18, bold: true });
  diag(s, 11.0, 3.6, 12.0, 4.6);
  txt(s, "小", { x: 11.55, y: 3.85, w: 0.7, h: 0.4, fontSize: 18, bold: true });
  txt(s, "overfitting\n（今天不讲）", { x: 7.6, y: 4.75, w: 2.6, h: 0.8, fontSize: 17, color: C.blue, align: "center" });
  s.addImage({ path: join(ASSETS, "face-shock.png"), x: 8.05, y: 5.6, w: 0.62, h: 0.62 });
  txt(s, "😊", { x: 11.6, y: 4.7, w: 1.0, h: 0.85, fontSize: 44, align: "center" });
  txt(s, "先看训练 Loss。训练就大 → 今天这一页；训练小测试大 → 另一头。", { x: 0.45, y: 6.55, w: 12.4, h: 0.45, fontSize: 17 });
  notes(s, "以后 Loss 下不去，照这棵树走。先看训练资料。训练就大，往左：可能是 bias，也可能是 optimization 没做好，那是下一讲。训练小、测试大，才轮到 overfitting。都小，恭喜。");
}

// ============ 11 请注意 ============
{
  const s = pres.addSlide();
  title(s, "请注意：今天骗了你一点点");
  redRoundFrame(s, 0.9, 1.3, 11.5, 1.05, true);
  txt(s, "（假设「页数 → 分钟」只用一条直线；虽然实际上模型可以复杂得多）", { x: 1.2, y: 1.55, w: 11.0, h: 0.55, fontSize: 20 });
  txt(s, "数字全是示意：17、29、101 是方便口算的整数，不是真的最小二乘解", { x: 1.2, y: 2.9, w: 11.4, h: 0.5, fontSize: 20 });
  txt(s, "VC 维、bias-variance 分解，今天一个都不推", { x: 1.2, y: 3.7, w: 11.4, h: 0.5, fontSize: 20 });
  txt(s, "但「训练 Loss 高 → 先怀疑抽屉」这个判断，是真的可以带走的", { x: 1.2, y: 4.5, w: 11.4, h: 0.55, fontSize: 20, color: C.blue });
  txt(s, "诚实简化。不是开玩笑。", { x: 0.45, y: 6.55, w: 12.4, h: 0.4, fontSize: 14, color: C.gray });
  notes(s, "请注意在这堂课中，我把很多东西简化了。数字是示意。VC 维不推。但那个判断顺序是真的。");
}

// ============ 12–13 步骤 3+1 ============
function stepsPage(highlight) {
  const s = pres.addSlide();
  title(s, "找函式步骤 3 + 1，bias 出在哪一步？");
  const blocks = [
    { fill: C.lav, t: "步骤一：\n我要找什么", d: "页数 → 分钟" },
    { fill: C.pale, t: "步骤二：\n我有哪些选择", d: "只准 y = wx + b" },
    { fill: C.coral, t: "步骤三：\n选一个最好的", d: "调到 (58−101)²" },
  ];
  blocks.forEach((b, i) => {
    const x = 0.8 + i * 4.15;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.5, w: 3.3, h: 3.1, fill: { color: b.fill }, line: { color: b.fill, width: 0 }, rectRadius: 0.25,
    });
    txt(s, b.t, { x, y: 2.05, w: 3.3, h: 1.0, fontSize: 20, align: "center" });
    txt(s, b.d, { x, y: 3.25, w: 3.3, h: 0.6, fontSize: 16, align: "center", color: "333333" });
    if (i < 2) {
      s.addShape(i === 0 ? pres.shapes.MATH_PLUS : pres.shapes.RIGHT_ARROW, {
        x: x + 3.42, y: 2.75, w: 0.62, h: 0.62, fill: { color: C.arrowGray }, line: { color: C.arrowGray, width: 0 },
      });
    }
  });
  const hx = 0.68 + highlight * 4.15;
  redRoundFrame(s, hx, 1.38, 3.54, 3.34);
  txt(
    s,
    highlight === 1 ? "bias 是步骤二的病：候选集合里根本没有对的函式" : "步骤三已经尽力了：再怎么选，也只能选到差 1849 的那条",
    { x: 0.8, y: 5.15, w: 11.8, h: 0.5, fontSize: 20 }
  );
  return s;
}
notes(stepsPage(1), "找函式三步。bias 出在步骤二：你有哪些选择。选择里没有弯的函式，后面怎么选都白搭。");
notes(stepsPage(2), "很多人怪步骤三：是不是没选好、学习率不对？红框挪过来看——步骤三已经把这条直线调到极限了。病根在上一步。");

// ============ 14 当场算 ============
{
  const s = pres.addSlide();
  title(s, "当场算一笔：三个点，直线过不了中间");
  // mini axes
  diag(s, 1.5, 5.4, 1.5, 1.5, { width: 1.5 });
  diag(s, 1.5, 5.4, 6.7, 5.4, { width: 1.5 });
  // three points A(1,2) B(2,5) C(3,3) mapped: x: 1→2.6, 2→3.9, 3→5.2 ; y: 2→4.6, 5→2.2, 3→3.8
  const P = [
    { x: 2.6, y: 4.6, l: "A (1, 2)" },
    { x: 3.9, y: 2.2, l: "B (2, 5)" },
    { x: 5.2, y: 3.8, l: "C (3, 3)" },
  ];
  P.forEach((p) => {
    s.addShape(pres.shapes.OVAL, { x: p.x - 0.09, y: p.y - 0.09, w: 0.18, h: 0.18, fill: { color: "156082" }, line: { color: "156082", width: 0 } });
    txt(s, p.l, { x: p.x + 0.12, y: p.y - 0.4, w: 1.5, h: 0.4, fontSize: 15, math: true });
  });
  // best line through A and C
  diag(s, 2.3, 4.85, 5.6, 3.55, { width: 2.5 });
  // gap at B
  dotted(s, 3.9, 4.25, 3.9, 2.35, { color: C.red, width: 2.25 });
  txt(s, "线上是 3.5，资料是 5\n差 1.5", { x: 4.15, y: 2.75, w: 2.6, h: 0.8, fontSize: 17, color: C.red });
  // right: computation
  txt(s, "过 A、C 的直线：", { x: 7.6, y: 1.6, w: 4.6, h: 0.5, fontSize: 20 });
  formula(s, 7.6, 2.15, [["y", null], [" = ", C.black, false], ["0.5", C.blue], ["x", null], [" + ", C.black, false], ["1.5", C.red]], 28, 4.6);
  txt(s, "x = 2 代进去：0.5×2 + 1.5 = 2.5？", { x: 7.6, y: 3.0, w: 5.2, h: 0.5, fontSize: 20, math: true });
  txt(s, "（口算一下，故意写错了，你抓一下）", { x: 7.6, y: 3.55, w: 5.2, h: 0.45, fontSize: 15, color: C.gray });
  txt(s, "正确是 3.5，资料是 5，怎么转都差", { x: 7.6, y: 4.25, w: 5.2, h: 0.5, fontSize: 20 });
  txt(s, "三个点都在训练集里。中间那个点，直线永远接不住。这就是微型的 bias。", { x: 0.45, y: 6.55, w: 12.4, h: 0.45, fontSize: 17 });
  notes(s, "拿张纸跟我算。A 一二、C 三三，拉一条线。x 等于二的时候线上是三点五。资料是五。你把线怎么转，B 都接不住。这就是 bias 的微型版。");
}

// ============ 15 作业接口 ============
{
  const s = pres.addSlide();
  title(s, "作业 Loss 下不去的时候");
  txt(s, "① 先看训练 Loss 高不高", { x: 1.0, y: 1.4, w: 6.5, h: 0.55, fontSize: 24 });
  diag(s, 7.6, 1.68, 8.4, 1.68);
  txt(s, "高 → 抽屉问题，往下走", { x: 8.5, y: 1.4, w: 4.3, h: 0.55, fontSize: 20, color: C.blue });
  txt(s, "② 模型是不是太瘦", { x: 1.0, y: 2.5, w: 6.5, h: 0.55, fontSize: 24 });
  diag(s, 7.6, 2.78, 8.4, 2.78);
  txt(s, "加宽、加层、加特征", { x: 8.5, y: 2.5, w: 4.3, h: 0.55, fontSize: 20, color: C.blue });
  txt(s, "③ 别急着调学习率", { x: 1.0, y: 3.6, w: 6.5, h: 0.55, fontSize: 24 });
  diag(s, 7.6, 3.88, 8.4, 3.88);
  txt(s, "那是 optimization，下一讲", { x: 8.5, y: 3.6, w: 4.3, h: 0.55, fontSize: 20, color: C.blue });
  redRoundFrame(s, 0.85, 4.75, 11.6, 0.95);
  txt(s, "训练资料上就输的模型，加再多训练时间也救不回来", { x: 1.1, y: 4.95, w: 11.2, h: 0.55, fontSize: 22, color: C.red });
  txt(s, "照这三步走，不保证满分，保证不冤枉自己。", { x: 0.45, y: 6.55, w: 12.4, h: 0.4, fontSize: 16, color: C.gray });
  notes(s, "作业接口。Loss 下不去，先看训练 Loss。训练就高，别怪学习率，先把模型加宽。训练小测试大才是另一头的事。");
}

// ============ 16 回声 ============
{
  const s = pres.addSlide();
  title(s, "能用的函式太少，再认真也对不齐");
  sample(s, 1.3, 2.0, "80 页");
  flowArrow(s, 2.6, 2.42, 0.9);
  fBox(s, 3.65, 1.6, 1.9, 1.7);
  flowArrow(s, 5.7, 2.42, 0.8);
  txt(s, "101", { x: 6.6, y: 2.1, w: 1.2, h: 0.6, fontSize: 28, math: true, color: C.red, align: "center" });
  dotted(s, 7.85, 2.42, 8.3, 2.42);
  txt(s, "(58−101)² = 1849", { x: 8.35, y: 2.12, w: 3.3, h: 0.55, fontSize: 22, math: true, color: C.red });
  txt(s, "今天记住的还是这一句。只是现在：", { x: 1.3, y: 4.15, w: 8.5, h: 0.5, fontSize: 22 });
  txt(s, "它有名字（bias），有一棵判断树（先看训练 Loss），有一个解法方向（把抽屉开大）", { x: 1.3, y: 4.8, w: 11.2, h: 0.8, fontSize: 20, color: C.blue });
  notes(s, "开场那句还在：能用的函式太少，再认真也对不齐。只是现在它有名字、有判断树、有解法方向。不是换了一件事。");
}

// ============ 17 停 ============
{
  const s = pres.addSlide();
  title(s, "今天停在这里");
  txt(s, "下一讲：训练 Loss 明明很小，考试却爆炸 —— 另一头的故事", { x: 0.8, y: 1.6, w: 12, h: 0.6, fontSize: 24 });
  txt(s, "作业：如果怎么调 Loss 都下不去，回来看那棵树", { x: 0.8, y: 2.5, w: 12, h: 0.6, fontSize: 24 });
  txt(s, "😊", { x: 10.9, y: 4.4, w: 1.3, h: 1.1, fontSize: 60, align: "center" });
  txt(s, "好，那讲到这边呢，我们就告一个段落。", { x: 0.8, y: 4.8, w: 9.5, h: 0.55, fontSize: 20, color: C.gray });
  notes(s, "好，那讲到这边呢，我们就告一个段落。下一讲讲另一头。回去记那张图：80 页，101 对 58。那就是 bias。");
}

const out = join(__dirname, "bias-test.pptx");
await pres.writeFile({ fileName: out });
console.log("wrote", out, "slides", pres.slides.length);
