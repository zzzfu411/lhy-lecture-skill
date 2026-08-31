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

先读 [references/style-essence.md](references/style-essence.md)。生成 `.pptx` 时画页跟仓库外的 `pptx` skill；**不要**套通用图标卡片盘。也**不要**做成只有标题的空白问句集。

## 先读什么

1. [style-essence.md](references/style-essence.md)（必读）
2. 画页：[ppt-visual.md](references/ppt-visual.md)、[ppt-rhetoric.md](references/ppt-rhetoric.md)、[slide-archetypes.md](references/slide-archetypes.md)
3. 角色贴图：[assets.md](references/assets.md)（素材库目录 + 缺角色怎么补）
4. 口播：[lecture-voice.md](references/lecture-voice.md)、[spoken-phrases.md](references/spoken-phrases.md)
5. 交稿前：[anti-patterns.md](references/anti-patterns.md)
6. 对照原课，不当规范：[corpus.md](references/corpus.md)、[examples.md](references/examples.md)

## 合格线（先于工作流）

交稿前这四条必须同时成立。任一失败就重做，不要用「比较像白板」放过。

| 病 | 合格 |
|----|------|
| 概念糊 | 盖住标题，学生仍能顺着资料流说出主张。隐喻有「日常物 → 技术对象」图例。 |
| 工作表味 | **机制页零表格**。数字是箭头旁的浮动演算；抽象概念角色化（机器人 / 文件图标 / emoji）；公式 w 蓝 b 红 + 红点线框；实线资料流 + 点线旁白。 |
| 密度太小 | 机制页 10–25 个元素、至少一笔算出来的数。只有标题的页失败。 |
| 示意潦草 | 每个零件有名字、对齐；示意 = 数字假，不是图烂；宽高为正。 |
| 不生动 | 钩子是听众正在过的场面；有具体失败者；笑点是机制（一个不公平的数字）。 |

宁可 25 张画满资料流的页，不要 70 张空页，也不要 22 张表格。

## 默认年代

- **默认 2025 宽屏**：13.333" × 7.5"（16:9）。标题页黑底，内容页白底。
- 用户明确说「2021 / 4:3 / 英文公式向」才切经典。

## 工作流（每次都走完）

```
- [ ] 1. 一句话课核（机制，能当口头禅）
- [ ] 2. 一条贯穿隐喻 + 页上图例（日常物 → 技术对象）
- [ ] 3. 选角色：列出本课的抽象对象，逐个对上 assets/ 的贴图；缺的先补库
- [ ] 4. 5–9 个节拍，其中至少一拍是「当场能算的一小步」
- [ ] 5. 先设计一张完整主资料流（角色 + 箭头 + 演算），再复制递增揭示
- [ ] 6. 口播：带人看图、算那一笔
- [ ] 7. 反模式 + 合格线四条
- [ ] 8. 出 pptx：生成 → 抽文本看密度 → 查负宽高/表格 → 渲染逐页目检
```

### 1. 课核

听完能用一句人话转述机制。坏：只记得目录。

### 2. 隐喻 + 图例

只选一条。必须能演到数字。写出对照再铺页，例如：

`直尺 → y = b + wx`　`弯的资料 → 真实关系`　`对不齐 → 训练误差下不去`

检验：把比喻拿掉，图和数字还讲得清；把图例拿掉，学生对不上词。后一种才说明隐喻在干活。流行文化只当数据或反例。

### 3. 节拍

1. **钩子**：听众正在过的场面（这堂课、这份作业、这个界面）。
2. **当场失败**：一张表或一个残差，让人看见「再认真也对不齐」。
3. **课核进场** + 图例。
4. **机制拆开**：2–4 拍，每拍加一个零件，每拍都有数字。
5. **诚实简化**。
6. **反例 / 和另一头差在哪**（也要数字）。
7. **今天停在哪**。

### 4. 铺页

- 先画主图/主表，再拆成揭示序列。
- 标题用问句或口语断言。
- 同一标题连用可以，但每一页都要新增一个**看得见的**零件（一列数、一条拟合、一个红框残差），不是只改口播。
- 页数服从完整图，不服从「必须 70 页」。

### 5. 口播

页上已经有表；嘴里指格子、算残差、重复课核。见 [lecture-voice.md](references/lecture-voice.md)。

### 6–7. 检查与出片

过 [anti-patterns.md](references/anti-patterns.md)。pptx 用 `pptx` skill 从零画。画完：

- 抽每页字数：机制页不得低于约 40 字
- 搜 XML：`cx`/`cy` 不得为负
- 目检：标签是否在、红框是否压字、表是否对齐

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
