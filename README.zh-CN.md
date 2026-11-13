# lhy-lecture-skill

面向 Cursor 及兼容 `SKILL.md` 规范的 Agent Skill：提炼李宏毅老师课堂投影片设计与口播讲法，只约束**怎么做页、怎么说话**，更换任意技术课题依然成立。

[English](README.md) · 简体中文

## 核心方法

- **白板资料流页面** — 默认输出 16:9 白底机制页（配黑底标题页）：先设计一张完整主图（`10–25` 个带名零件、箭头旁浮动演算、公式 `w` 蓝 `b` 红加红点线框、机制页零表格），再按「复制递增」逐步揭示。
- **单一映射隐喻与口语讲稿** — 整堂课只用一条带图例的「日常物 → 技术对象」隐喻并一路演到具体算式，配合问句式标题与指图算账的口语化口播稿。
- **硬性交稿门禁** — 结合 [SKILL.md](SKILL.md) 与 [references/anti-patterns.md](references/anti-patterns.md) 检查单页字数密度、非负几何宽高（`cx`/`cy`）与对齐排版；生成 `.pptx` 时配合外部 `pptx` skill 从零绘页。

## 安装与使用

安装为个人全局 Cursor Skill：

```bash
git clone https://github.com/zzzfu411/lhy-lecture-skill.git ~/.cursor/skills/lhy-lecture-style
```

也可放入单个项目的 `.cursor/skills/lhy-lecture-style`（或 `~/.claude/skills/lhy-lecture-style`）。对话中提及「李宏毅风格课件 / 讲课稿」即可触发 [SKILL.md](SKILL.md)；导出 `.pptx` 文件时由宿主环境的 `pptx` skill 负责底层画页。

## 目录结构

| 路径 | 内容 |
| --- | --- |
| [SKILL.md](SKILL.md) | 入口规范、合格线判据与 8 步制课工作流 |
| [references/](references/) | 视觉排版、页型原型、修辞节奏、口播句式、反模式与原课语料对照 |
| [assets/ruler.png](assets/ruler.png) | 按同款扁平贴纸风格图像生成的示例素材 |
| [eval/](eval/) | 换题实测（Bias 专题）的排课计划、`pptxgenjs` 生成脚本与口播稿 |

## 素材与版权声明

从李宏毅原课件 `ppt/media/` 提取的机器人、文档图标等 **PNG 素材不随本公开仓分发**（版权归原课件及图标作者所有，仅限个人持有的课件副本内学习自用）。补充角色贴图请参照 [references/assets.md](references/assets.md) 从自有课件提取或按提示词生成。

仓库内的规则与评测文稿（`SKILL.md`、`references/`、`eval/`）由本仓库维护者整理，未另附开源许可证时默认保留版权。请勿将基于本 skill 生成的内容冒充李宏毅老师本人发布的教材。
