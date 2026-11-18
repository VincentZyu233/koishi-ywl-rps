# 🎮 koishi-bundle-rpsluna

> 开箱即用的石头剪刀布多模态体感博弈平台整合包 (Koishi Bundle)

本整合包预置了全套 `rpsluna` 石头剪刀布交互生态，包含核心调度引擎、博弈论预测策略（马尔可夫转移、Iocaine Powder、作弊彩蛋）、大模型心理战、桌面窗口手势识别网关以及专供公网免登录访问的独立 Web 竞技场。

---

## ⚡ 极速起步 (Two-Command Start)

无需手工配置插件，直接启动即可运行：

```bash
# 1. 安装与链接工作区依赖
yarn

# 2. 启动服务 (内置 HMR 毫秒级热重载)
yarn dev
```

启动完成后，直接在浏览器中打开：
- 🌐 **公网独立对战 Portal**：[http://localhost:8498](http://localhost:8498) （可直接用 FRP 穿透公网供评委与玩家免登录游玩）
- 🛠️ **Koishi 管理控制台**：[http://localhost:51498](http://localhost:51498) (514 生日 + 498 RPS 彩蛋端口)

---

## 🔑 环境变量与私密配置

本整合包采用三层安全配置体系：

1. **`.env` (公开示范配置)**：已包含默认端口（8498、18082）与示范占位符，安全可提交；
2. **`.env.local` (本地私密覆盖)**：若需要接入真实的 NewAPI / OpenAI 大模型心理战，只需在根目录下创建 `.env.local`：
   ```ini
   LLM_ENDPOINT=https://your-newapi-proxy.com/v1
   LLM_API_KEY=sk-your-real-secret-key
   LLM_MODEL=gpt-4o-mini
   ```
   *`.env.local` 已被 `.gitignore` 严密忽略，永不泄露。*

---

## 📹 外部窗口视觉手势捕获 (可选)

如果需要接手机投屏软件（如 RustDesk 或 scrcpy）：

```bash
cd external/rpsluna/tools/window_detector

# 第一步：先列出当前桌面所有可见窗口标题
uv run detector.py --list
```

> [!TIP] 实战示例：精准捕获手机投屏画面
> 执行 `--list` 后会列出当前桌面的所有窗口，例如：
> ```text
> [02] "iqoo12安卓机@vivo-V2307A - Remote Desktop - RustDesk" (463x942 @ 46,40)
> [04] "RustDesk" (1197x920 @ 211,119)
> ```
> 可以看到 `[02]` 才是真正的手机投屏画面窗口。提取特征词即可精准推流：
> ```bash
> # 第二步：精准捕获手机竖屏画面推流 (YOLO 实时目标检测)
> uv run detector.py iqoo12
> 
> # 如需走代理下载模型，加上 --proxy 参数
> uv run detector.py iqoo12 --proxy http://127.0.0.1:7890
> ```

---

## 🧩 预置功能清单

- **`rpsluna-core`**：多房间会话管理器、倒计时与连续流式状态机服务。
- **`rpsluna-adapter-satori-command`**：Satori 跨平台聊天指令与交互按钮适配器 (支持 QQ / Telegram / Discord 等原生按钮与文字指令)。
- **`rpsluna-strategy-markov`**：基于人类出拳转移矩阵的概率博弈算法。
- **`rpsluna-strategy-all`**：经典 Iocaine Powder 博弈大师算法与视觉作弊模式。
- **`rpsluna-strategy-llm`**：接入大模型的心理弱点分析与毒舌嘲讽裁判。
- **`rpsluna-adapter-window`**：监听 `18082` 端口的高性能手势推流网关。
- **`rpsluna-renderer-portal`**：监听 `8498` 端口的赛博风 Web 对战大屏。
- **`rpsluna-renderer-console`**：向 Koishi 控制台实时广播对战战况与数据看板。
