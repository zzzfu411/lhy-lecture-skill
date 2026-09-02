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

先读 [references/style-essence.md](references/style-essence.md)。出 `.pptx` 用 **python-pptx** 从零画（画布 13.333" × 7.5"，CJK 写 `微軟正黑體`）。pptxgenjs 能画同一套形状，只当一行等价实现，不要再开第二份 API。**不要**套通用图标卡片盘。也**不要**做成只有标题的空白问句集。

## 先读什么

1. [style-essence.md](references/style-essence.md)（必读）
2. 画页：[ppt-visual.md](references/ppt-visual.md)、[ppt-rhetoric.md](references/ppt-rhetoric.md)、[slide-archetypes.md](references/slide-archetypes.md)
3. 角色贴图：[assets.md](references/assets.md)（可选；许多 2025 机制页零贴纸）
4. 口播：[lecture-voice.md](references/lecture-voice.md)、[spoken-phrases.md](references/spoken-phrases.md)
5. 交稿前：[anti-patterns.md](references/anti-patterns.md)
6. 对照原课，不当规范：[corpus.md](references/corpus.md)、[examples.md](references/examples.md)

## 合格线（先于工作流）

交稿前下列几条必须同时成立。任一失败就重做，不要用「比较像白板」放过。

| 病 | 合格 |
|----|------|
| 概念糊 | 盖住标题，学生仍能顺着图说出主张。隐喻有「日常物 → 技术对象」图例。 |
| 工作表味 | **不要把机制的资料行 / Loss 行装进表格。** 数字是盒下或箭头旁的浮动演算（金：`05-BasicML` p11、p42）。空的提问模板表可以（`06-TrainingTip` p3）。课程规划表可以。贴纸不是必选项。公式 w 蓝 b 红 + 红点线框。 |
| 空页 | 「约 40 字」是防空页的地板，不是目标。三盒 + 一笔算出来的数就够。只有标题的页失败。不要为了凑密度把整条路径图画满。 |
| 示意潦草 | 每个零件有名字、对齐；示意 = 数字假，不是图烂；宽高为正。 |
| 不生动 | 钩子是听众正在过的场面（半条资料流 / 点线缺口 / 教室漫画）；有具体失败者；笑点是机制。 |

宁可 25 张各站得住、留得住白的页，不要 70 张空页，也不要 22 张填满数字的表。

## 默认年代

- **默认 2025 宽屏**：13.333" × 7.5"（16:9）。内容页白底。标题页见下。
- 2024 / 2021 是另一套产品。用户没点名就不要混进 2024 满版 AI 图封面、2021 的 4:3 Calibri 英文底。
- 原件 CJK 是微軟正黑體（theme 可能写 Aptos）。用户写简体就出简体。

### 标题页（默认品牌，对照 `00-LLM-intro` p1、`03-LLMunderstand` p1）

满版纯黑。2–4 行超大**白字**：`一堂课搞懂 / 看懂` + 课题 + `的原理 / 的概念`。课题也是白的。黄 `#FFD400` **只**给右下 byline。

- **变体 B**（`05-BasicML` p2）：只把课题词涂黄，包装句仍白。课题是一对要点亮的词时才用。
- **变体 C**（`06-TrainingTip` p1）：橙→紫渐变广告封面。仅用户要「广告封面 / designed cover」。
- **可选第 0 页**：黑底仪式，白字「请各位同学稍待片刻」，黄字开课时间。不是后勤二维码。对照 `05-BasicML` p1。
- **可选收尾**：黑底 + 二维码 + Colab URL + 左侧和底边细橙 L 框。这是 closer，不是默认封面，也不是空白末页。

## 工作流（每次都走完）

```
- [ ] 1. 一句话课核（机制，能当口头禅）
- [ ] 2. 一条贯穿隐喻 + 页上图例（日常物 → 技术对象）
- [ ] 3. 主图选型：淡彩圆角块（2025 更常见）或贴纸资料流（只用在需要具象样本的页）；不要贴纸游行
- [ ] 4. 5–9 个节拍，其中至少一拍是「当场能算的一小步」
- [ ] 5. 先设计一张完整主图，再复制递增揭示（三种合法动作，见 §4）
- [ ] 6. 口播：带人看图、算那一笔
- [ ] 7. 反模式 + 合格线四条
- [ ] 8. 出 pptx：生成 → 抽文本看密度 → 查负宽高/表格 → 渲染逐页目检
```

### 1. 课核

听完能用一句人话转述机制。坏：只记得目录。

### 2. 隐喻 + 图例

只选一条。必须能演到数字。写出对照再铺页，例如：

`直尺 → y = b + wx`　`弯的资料 → 真实关系`　`对不齐 → 训练误差下不去`

检验：把比喻拿掉，图和数字还讲得清；把图例拿掉，学生对不上词。后一种才说明隐喻在干活。流行文化是贴在图上的抠图，不是主题。

### 3. 节拍

1. **钩子**：听众正在过的场面（这堂课、这份作业、这个界面）。伴奏可以是半条资料流、点线缺口、或教室场景漫画。
2. **当场失败**：一笔残差或一个算出来的数，让人看见「再认真也对不齐」。
3. **课核进场** + 图例。
4. **机制拆开**：2–4 拍，用三种复制递增之一，每拍都有数字。
5. **诚实简化**。
6. **反例 / 和另一头差在哪**（也要数字）。
7. **今天停在哪**。

### 4. 铺页

- 先画主图，再拆成揭示序列。几何不动。
- 标题用问句或口语断言。
- 复制递增只许三种动作：（i）多一个看得见的零件（一行、一项公式、一个红框、一条点线旁白）；（ii）同一条 `x→f→y` 骨架只换两端（换任务，f 不动）；（iii）步骤块不动，底下多一句注释。非法：复制空页；只改口播。
- 页数服从完整图，不服从「必须 70 页」。

### 5. 口播

页上已经有图和数；嘴里指盒子、算那一笔、重复课核。见 [lecture-voice.md](references/lecture-voice.md)。

### 6–7. 检查与出片

过 [anti-patterns.md](references/anti-patterns.md)。用 python-pptx 从零画。画完：

- 抽每页字数：约 40 字是地板（防空页），不是要写满
- 搜 XML：`cx`/`cy` 不得为负
- 目检：零件有名字、红框不压字、机制数字不在表格里、封面课题是白的

## 和相邻 skill 的边界

| 用户要的 | 用谁 |
|----------|------|
| 李宏毅课堂课件 / 讲课稿 | **本 skill** |
| 组会读 Nature / 论文 PPT | `nature-paper2ppt` |
| 只改已有 pptx 技术细节 | `pptx` |

## 语言

- 用户用简体则默认简体。英文专名留英文，括号里给一次中文。
- 标题可以中英各半：`一堂课搞懂 ______ 的概念`。

## 交稿形态

- **课件**：`.pptx` + 四行「课核 / 隐喻图例 / 节拍 / 主图是什么」
- **讲稿**：按时间轴的口播，对照页标题
- **两者**：notes 写入口播

数字和论文必须是真的或标明示意。例子必须具体到能演，不要抽象风景。
