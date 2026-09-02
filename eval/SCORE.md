# 自评（对照公开仓实际文件）

公开仓 `assets/` **只有** 图像生成样例 `ruler.png`。不要写「已从 05-BasicML / 02-Agent 抽出 15 张 PNG 入库」——那些文件不在本树，版权也不允许放进公开仓。

需要角色时：按 `references/assets.md` 先补目录（自己持有的课件提取，或按同款提示词生成），再画页。43/84 的 `05-BasicML` 页零图，许多机制页根本不用贴图。

生成栈是 **python-pptx**。`eval/generate-bias.mjs` 是旧的 pptxgenjs 复测残骸，不是现行规范。

预览：`eval/render_pptx.py`。Linux 先找 Noto Sans CJK SC/TC，再退到 Hiragino / WenQuanYi。预览缺 ² / ₂ 字形时，以 PowerPoint + Cambria Math 为准。
