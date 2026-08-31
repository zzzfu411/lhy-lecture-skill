# 角色素材库（assets/）

「精致剪贴画」不是画出来的，是**嵌 PNG**。他的课件里机器人、文件图标、人物全是 flaticon 风位图。生成课件时按下表嵌图，不要用灰盒子或 emoji 凑。

**公开仓不附带从原课件提取的 PNG**（版权在原作者 / 图标原作者）。本目录只含图像生成样例 `ruler.png`。其余角色请按文末「缺角色时怎么补」，从你自己持有的课件提取，或按同款提示词生成。

素材位置：skill 根下的 `assets/`。下表「原件出处」只说明老师课件里对应哪张，不是本仓发行这些文件。

## 目录

| 文件 | 角色 | 原件出处 | 建议尺寸 |
|------|------|----------|----------|
| robot-f.png | 模型 / 函式 f（cute 机器人） | 05-BasicML image5 | 1.4–1.9" |
| ppt-file.png | 一笔资料 / 一份投影片 | 05-BasicML image6 | 0.9–1.3" |
| flag-goal.png | 目标 / 里程碑 | 05-BasicML image64 | 0.8–1.1" |
| person.png | 人 / 使用者 / 助教 | 02-Agent image106 | 0.9–1.3" |
| person-girl.png | 具体人物角色 | 02-Agent image65 | 0.9–1.3" |
| check.png / cross.png | 对 / 错 | 02-Agent image85/86 | 0.5–0.8" |
| magnifier-doc.png | 找 / 检视 | 02-Agent image67 | 0.9–1.2" |
| toolbox.png | 工具 / 方法集合 | 02-Agent image90 | 0.9–1.2" |
| database.png / docs.png | 资料库 / 文件堆 | 02-Agent image42/43 | 0.9–1.2" |
| question-bubble.png | 疑问 | 02-Agent image96 | 0.8–1.1" |
| face-shock.png | 惊吓 / 出事了 | 02-Agent image71 | 0.7–1.0" |
| robot-blue.png | 第二个机器人（对比用） | 02-Agent image61 | 1.2–1.6" |
| books.png | 教材 / 文献 | 02-Agent image82 | 0.9–1.2" |
| ruler.png | 直尺 / 只准直线的模型 | **图像生成**（以 robot-f + toolbox 为参考图） | 1.1–1.5"（横图 3:2） |

## 用法（pptxgenjs）

```javascript
slide.addImage({ path: ASSETS + "/robot-f.png", x: 4.9, y: 1.7, w: 1.6, h: 1.6 });
```

- 角色图放在流程位置上，旁边配斜体变量（*f*、*x*）或一行人话标签。
- 同一角色整堂课复用同一张图（几何位置不动才有「复制递增」）。
- 多笔资料 = 同一文件图标画三份纵排 + 省略号（他用重着色区分，生成时可直接同色）。
- emoji 只在没有对应素材时用（他本人也用 😊），优先级：素材库 > emoji > 组合形状。

## 缺角色时怎么补（按序尝试）

1. **回原件找**：`LHYML2025/slides/*.pptx` 的 `ppt/media/`，用拼图脚本浏览挑选，语义命名后入库并更新本表。
2. **图像生成**（已实测，ruler.png 就是这么来的）：
   - 把库里 2 张风格最近的贴图当 **reference images**（如 robot-f + toolbox），风格自动对齐
   - 提示词要点：single flat vector sticker icon, thick dark outline, soft pastel colors, cute flaticon style, white background, single object centered, no text, no shadow
   - 后处理：近白像素转透明 → 按内容裁边 → 入库并在上表登记来源为「图像生成」
3. **组合形状**：圆角矩形 + 圆点画简单角色，仅当上面两条都不可行。

## 禁止

- 网络热图 / 水印图标
- 把他的素材用于对外发布的商业物料（库内素材只服务个人学习课件）
- 一页塞五个以上角色（他一页通常 1–3 个）
