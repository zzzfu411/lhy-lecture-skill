# lhy-lecture-skill

Cursor Agent Skill：按李宏毅课堂手艺做课件和口播稿。只管**怎么做页、怎么说话**，换课题仍成立。

本仓库从学习仓 `cloud-2summer` 里的 `.cursor/skills/lhy-lecture-style` 单独拆出。

## 安装

个人全局：

```bash
git clone https://github.com/zzzfu411/lhy-lecture-skill.git ~/.cursor/skills/lhy-lecture-style
```

或拷进某个项目的 `.cursor/skills/lhy-lecture-style`。

说「李宏毅风格课件 / 讲课稿」时，Agent 会读这里的 `SKILL.md`。出 `.pptx` 用 python-pptx（pptxgenjs 只留附录一行）。

## 目录

| 路径 | 内容 |
|------|------|
| `SKILL.md` | 入口、合格线、工作流 |
| `BRIEF.md` | 生成时核对（chrome / 口语 / 比喻 / 图） |
| `references/` | 视觉、页型、图硬规则、口播、反模式、课堂口语禁止清单、语料对照 |
| `assets/` | 公开仓只带图像生成的样例 `ruler.png` |
| `eval/` | bias 换题实测的计划、脚本、口播（不含成品 pptx） |

## 贴图版权

从李宏毅原课件 `ppt/media/` 提取的机器人、文件图标等 **PNG 不进本公开仓**。那些图版权在原课件/图标原作者，只可在你自己持有的课件副本里个人学习复用。

需要角色图时：按 `references/assets.md` 从你自己的课件提取，或按同文件的提示词生成。

## 许可

仓库里的 skill 正文（`SKILL.md`、`references/`、`eval/` 文稿）由本仓库作者整理。未另附开源许可证时，默认保留版权。不要把本 skill 冒充李宏毅老师本人发布的教材。
