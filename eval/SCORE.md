# v5 自评（素材管线落地）

## 为什么之前做不到精致剪贴画

他的「精致剪贴画」不是画的，是 flaticon 风 PNG **嵌图**。他的原件就在本仓库里，之前却用 emoji 凑——是管线缺了「素材库」这一环，不是做不到。

## 这次补上的管线

1. **建库**：从 `05-BasicML` / `02-Agent` 的 `ppt/media/` 提取 15 个角色贴图，语义命名进 `assets/`（robot-f、ppt-file、person、toolbox、check/cross、face-shock……），目录写在 `references/assets.md`。
2. **选角色**：工作流第 3 步新增「列出本课抽象对象 → 逐个对上贴图，缺的先补库」。补库顺序：原件挑图 → 图像生成 flat-icon → 组合形状。
3. **嵌图生成**：pptxgenjs `addImage`；同一角色整堂课同一张图、几何不动。
4. **渲染目检**：`eval/render_pptx.py`（支持图片、按文档顺序绘制）逐页出图检查。

## v5 复测（17 页）

- f 框中央是他原件的 cute 机器人；资料是他的 PPT 文件图标纵排三份
- 助教 = person 贴图；抽屉 = toolbox；资料 = database；出事 = face-shock
- 表格 0、负宽高 0、禁用口号 0、嵌图 19 张
- 修过的 bug：机器人定位数学错一次；预览器先画图后画形状盖住了机器人（已改按文档顺序）

## 已知边界

- 预览图里 ² / ₂ 显示为方框是预览字体缺字形；实际文件用 Cambria Math，PowerPoint 正常
- 素材取自他的课件，只用于个人学习课件；对外物料需换图源（assets.md 已写明）
- 17 页仍是 20 分钟骨架
