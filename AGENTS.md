# 🤖 koishi-ywl-rps 宿主工程开发准则

> 本工程作为 `rpsluna` 插件的宿主整合包运行环境。

- **核心插件生态**：位于 `external/rpsluna`（即独立 Monorepo `D:\TMP\ywl-rps\rpsluna`）。
- **最高开发准则**：详细规范见 [external/rpsluna/AGENTS.md](./external/rpsluna/AGENTS.md)。
- **核心工程哲学**：“**宁可明确崩溃报错（Fail-Fast），绝不默默缩水运行（Silent Failure）**”。
- **端口约定**：
  - `5140` / `51498`：Koishi 控制台主端口（全域运维、房间调度、视觉标定内嵌在控制台原生侧边栏中）；
  - `8498`：基础按键对战门户（`renderer-portal` 备用兜底端）；
  - `9498`：外部多模态视觉体感大屏（`adapter-vision` 独立秀场，Vue 3 + PixiJS 高刷全屏）。
