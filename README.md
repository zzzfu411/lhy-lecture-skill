# lhy-lecture-skill

An agent skill for Cursor and SKILL.md-compatible coding agents that distills Prof. Hung-yi Lee's (李宏毅) classroom slide design and spoken lecture craft into topic-agnostic authoring rules.

English · [简体中文](README.zh-CN.md)

## Craft Rules

- **Chalkboard dataflow slides** — Builds 16:9 white-canvas mechanism slides (with black section covers) around one complete labeled diagram (`10–25` elements, inline numeric calculations, blue `w` / red `b` formula highlights, dashed callouts, and zero worksheet tables), unfolded via duplicate-and-increment steps.
- **Single mapped metaphor** — Grounds each lecture in one explicit everyday-to-technical legend that carries through concrete arithmetic, paired with question-driven slide titles and vernacular spoken scripts (`口播`).
- **Pre-delivery gates** — Enforces minimum per-slide text density, positive shape dimensions (`cx`/`cy`), anti-pattern checks ([references/anti-patterns.md](references/anti-patterns.md)), and visual layout inspection alongside your environment's `pptx` rendering skill.

## Installation

Install globally for Cursor:

```bash
git clone https://github.com/zzzfu411/lhy-lecture-skill.git ~/.cursor/skills/lhy-lecture-style
```

Or copy into a project's `.cursor/skills/lhy-lecture-style` (or `~/.claude/skills/lhy-lecture-style`). Ask for "Hung-yi Lee style slides or lecture script" (`李宏毅风格课件 / 讲课稿`) to load [SKILL.md](SKILL.md); `.pptx` generation delegates drawing primitives to your installed `pptx` skill.

## Repository Layout

| Path | Contents |
| --- | --- |
| [SKILL.md](SKILL.md) | Entry workflow, 8-step authoring checklist, and quality gates |
| [references/](references/) | Visual specs, slide archetypes, rhetoric, spoken phrasing, anti-patterns, and corpus notes |
| [assets/ruler.png](assets/ruler.png) | Sample AI-generated flat sticker icon matching the classroom clipart style |
| [eval/](eval/) | Topic-transfer evaluation plan, `pptxgenjs` generator script, and spoken script on model bias |

## Assets & Copyright

Original clipart PNGs from Prof. Hung-yi Lee's `ppt/media/` slide decks are **not redistributed** in this public repository; those rights remain with the original courseware and icon authors. Follow [references/assets.md](references/assets.md) to extract icons from your own personal courseware copies or generate matching stickers.

The skill specifications and scripts (`SKILL.md`, `references/`, `eval/`) are authored by the repository maintainer with all rights reserved unless otherwise noted. Do not pass off generated materials as official courseware by Prof. Hung-yi Lee.
