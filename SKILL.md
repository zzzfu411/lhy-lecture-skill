---
name: lhy-lecture-style
description: >-
  Build classroom slides and spoken lecture scripts in Hung-yi Lee (李宏毅)
  craft: white-chalkboard pages with labeled figures and numbers, Office
  highlighter colors, question titles, duplicate-and-increment of a complete
  diagram, one mapped metaphor, and vernacular 口播. Pages must be sparse
  but not empty. Use when the user asks for 李宏毅风格 / Hung-yi Lee style
  PPT, 课件, 投影片, 讲义, 讲课稿, 课堂讲解, 一堂課搞懂, or teaching slides that
  feel like his classroom rather than journal-club or corporate decks.
---

# 李宏毅课件 + 讲课风格

本 skill 只蒸馏两件事：**怎么做页**、**怎么说话**。换课题必须仍成立。

先读 [references/style-essence.md](references/style-essence.md)。出 `.pptx` 用 **python-pptx** 从零画（画布 13.333" × 7.5"；CJK 写 `微軟正黑體`，简体可用 `微软雅黑`；每段文字设 `a:ea`）。pptxgenjs 只留在 [assets.md](references/assets.md) 附录一行，不要当第二套生成栈。**不要**套通用图标卡片盘。也**不要**做成只有标题的空白问句集。

## 先读什么

1. [style-essence.md](references/style-essence.md)（必读）
2. 画页：[ppt-visual.md](references/ppt-visual.md)、[ppt-rhetoric.md](references/ppt-rhetoric.md)、[slide-archetypes.md](references/slide-archetypes.md)、[diagrams-required.md](references/diagrams-required.md)
3. 角色贴图：[assets.md](references/assets.md)（可选；许多 2025 机制页零贴纸）
4. 口播：[lecture-voice.md](references/lecture-voice.md)、[spoken-phrases.md](references/spoken-phrases.md)
5. 课堂口语禁止清单：[humanize-classroom.md](references/humanize-classroom.md)（chrome / 否定式口号 / 比喻一拍）
6. 交稿前：[anti-patterns.md](references/anti-patterns.md)、[BRIEF.md](BRIEF.md)
7. 对照原课，不当规范：[corpus.md](references/corpus.md)、[examples.md](references/examples.md)

## 合格线（先于工作流）

交稿前下列几条必须同时成立。任一失败就重做，不要用「比较像白板」放过。

| 病 | 合格 |
|----|------|
| 概念糊 | 盖住标题，学生仍能顺着图说出主张。隐喻有「日常物 → 技术对象」图例。 |
| 工作表味 | **E/F/K 页禁止 `a:tbl`。** 数字是盒下或箭头旁的浮动演算。表只许两种：`06-TrainingTip` p3 那种 2×3 方法目录（深蓝表头、红框一列、坐在三步块上面），以及 CNN kernel / 像素阵当「格子图」。课程规划表只出现在政策课。资料流用 2.5–3.5 pt 直线 + triangle 尾，不用胖 chevron。 |
| 密度两档 | 稀疏拍 2–8 个形状合法；机制 / Loss / 公式页通常 25–60 个形状；架构 / 网络页 60–200、可以零图。约 40 字只防空标题页。20 分钟机制课 **50–85 页** 疏密混排，不是 24 张中等吉祥物页。 |
| 示意潦草 | 每个零件有名字、对齐；示意 = 数字假，不是图烂；宽高为正。 |
| 不生动 | 钩子是听众正在过的场面（半条资料流 / 点线缺口 / 教室漫画）；有具体失败者；幽默来自机制，不是「笑点是：」标语。 |
| AI 导播腔 | 页上无「本页算完 / 下一步」。底栏不是复盘。禁止「不是 X，是 Y」。比喻一拍能 get。见 [humanize-classroom.md](references/humanize-classroom.md)。 |
| 只点名不画 | 机制页画出那个东西：分布是椭圆云，架构是结构图，对比是点和云同页。禁止公式墙。教学页底边 25%+ 空着失败。芯片内数字垂直居中。见 [diagrams-required.md](references/diagrams-required.md)。 |

宁可 50–85 张疏密混排、各站得住的页，不要 24 张中等密度吉祥物页，也不要 22 张填满数字的机制表。

## 默认年代

- **默认 2025 宽屏**：13.333" × 7.5"（16:9）。内容页白底。标题页见下。
- 2024 / 2021 是另一套产品。用户没点名就不要混进 2024 满版 AI 图封面、2021 的 4:3 Calibri 英文底。
- 原件 run 是微軟正黑體 + 新細明體 + Cambria Math（+ Calibri）。theme 可能写 Aptos。用户写简体就出简体，字体可改微软雅黑。强调蓝可用 `#0000FF`（06 里比 `#0070C0` 更常见）。

### 标题页（封面 72–96 pt，不是内容标题的 28–36 pt）

四条真配方。不要强求第三行包装句，也不要强求 byline。黄是 `#FFFF00`。

| 配方 | 对照 | 画什么 |
|------|------|--------|
| **(i) 默认** | `00-LLM-intro` p1、`03-LLMunderstand` p1 | 平黑。2–3 行**白**字 72–96 pt（03 是 96 pt 两行，可省略「的概念」）。有 byline 时黄、右下。 |
| **(ii) 变体 B** | `05-BasicML` p2 | 居中 72 pt，青绿几何底。黄**只**涂课题词。包装句白。**没有 byline**。 |
| **(iii) 变体 C** | `06-TrainingTip` p1 | 橙→藏青渐变，右对齐约 88 pt **全白**。byline **白、左下**。仅用户要广告封面。 |
| **(iv)** | `02-Agent` | 中英夹心双语封面。用户点名双语课时用。 |

可选第 0 页（可在品牌封面之前）：黑底，白字「请各位同学稍待片刻」，黄字开课时间。对照 `05-BasicML` p1。不是后勤二维码。

可选收尾：黑底 + 二维码 + Colab URL + 左侧和底边细橙 L 框。这是 closer，不是默认封面，也不是空白末页。

## 工作流（每次都走完）

```
- [ ] 1. 一句话课核（机制，能当口头禅）
- [ ] 2. 一条贯穿隐喻 + 页上图例（日常物 → 技术对象）
- [ ] 3. 主图选型：先画出那个东西（云 / 结构图 / 点+云）；淡彩块或贴纸资料流是零件，不是替代品；不要贴纸游行
- [ ] 4. 5–9 个节拍，其中至少一拍是「当场能算的一小步」
- [ ] 5. 先设计一张完整主图，再复制递增揭示（五种合法动作，见 §4）。机制课必须有同一组三步块走三页（原型 G）
- [ ] 6. 口播：带人看图、算那一笔
- [ ] 7. 反模式 + 合格线
- [ ] 8. 出 pptx：生成 → 抽文本看密度 → 查负宽高/表格 → 渲染逐页目检
```

### 1. 课核

听完能用一句人话转述机制。坏：只记得目录。

### 2. 隐喻 + 图例

只选一条。必须能演到数字。写出对照再铺页，例如：

`直尺 → y = b + wx`　`弯的资料 → 真实关系`　`对不齐 → 训练误差下不去`

检验（一拍测试，见 [humanize-classroom.md](references/humanize-classroom.md)）：听完一句，学生能不靠比喻把机制讲回去。物件已在页上或人人认识（课、文件、尺）。还要第二句解释自己 → 删比喻，留数字。对比用两个数，不用「不去旗子 A」。流行文化是贴在图上的抠图，不是主题。

### 3. 节拍

1. **钩子**：听众正在过的场面（这堂课、这份作业、这个界面）。伴奏可以是半条资料流、点线缺口、或教室场景漫画。
2. **当场失败**：一笔残差或一个算出来的数，让人看见「再认真也对不齐」。
3. **课核进场** + 图例。
4. **机制拆开**：用五种复制递增之一。同一组三步淡彩块至少走三页。
5. **诚实简化**。
6. **反例 / 和另一头差在哪**（也要数字）。
7. **今天停在哪**。

### 4. 铺页

- 先画主图，再拆成揭示序列。几何不动。
- 标题用问句或口语断言。
- 复制递增只许五种动作，剩下的几何冻结：（i）多一个看得见的零件；（ii）同一条 `x→f→y` 只换两端；（iii）步骤块不动，底下多一句；（iv）同一坐标轴上更新路径（图当证据时）；（v）公式能独立站住后撤掉图（对照 GD p27–29）。非法：复制空页；只改口播。
- 20 分钟机制课 50–85 页，疏密混排。不要做成 24 张中等页。

### 5. 口播

页上已经有图和数；嘴里指盒子、算那一笔、重复课核。见 [lecture-voice.md](references/lecture-voice.md)。页上禁止导播字幕和复述黄条。

### 6–7. 检查与出片

过 [anti-patterns.md](references/anti-patterns.md)。用 python-pptx 从零画。画完：

- 抽每页字数：约 40 字只防空标题页
- 搜 XML：`cx`/`cy` 不得为负；机制页 `prst="rightArrow"` ≈ 0（G 步块之间的灰箭头除外）；E/F/K 无 `a:tbl`
- 目检：零件有名字、红框不压字、资料流是细直线不是胖 chevron、默认封面课题是白的、无「本页/下一步」、无否定式口号、标签不与别的形状相交、机制页有云/结构图而不是字墙、盒内数字居中、教学页底边没有大块死白

## 和相邻 skill 的边界

| 用户要的 | 用谁 |
|----------|------|
| 李宏毅课堂课件 / 讲课稿 | **本 skill** |
| 组会读 Nature / 论文 PPT | `nature-paper2ppt` |
| 只改已有 pptx 技术细节 | `pptx` |

## 语言

- 用户用简体则默认简体，字体可写微软雅黑。英文专名留英文，括号里给一次中文。
- 每个文字 run 设 `a:ea`。
- 标题可以中英各半：`一堂课搞懂 ______ 的概念`。不要强求第三行包装句。

## 交稿形态

- **课件**：`.pptx` + 四行「课核 / 隐喻图例 / 节拍 / 主图是什么」
- **讲稿**：按时间轴的口播，对照页标题
- **两者**：notes 写入口播

数字和论文必须是真的或标明示意。例子必须具体到能演，不要抽象风景。
