# Service Learning

双视角羊楼洞茶文旅与茶园生产智能体 Web 原型。

Service Learning is a two-perspective web prototype for Yangloudong tea culture tourism and tea-factory harvest planning.

## Online Demo

Public URL:

https://claire0712.github.io/Service-Learning/

Note: this repository is published with GitHub Pages from the `gh-pages` branch.

## Project Overview

本项目把羊楼洞茶文化旅游服务和茶厂采摘决策放在同一个 Web agent 中。用户进入系统后先选择使用视角：

- **游客视角 / Visitor view**: 了解羊楼洞历史文化、青砖茶、万里茶道，查看视频与外部资料链接，并规划交通、住宿和茶园采摘体验。
- **茶厂视角 / Factory view**: 基于 NDVI、无人机影像、冠层颜色和人工记录判断茶叶成熟度，生成地块级采摘优先级、采摘路径和无人机复查任务。

The first version runs as a local-demo-first web application. It uses structured sample data and external links, while leaving a Qwen proxy integration point for agent answers.

## Core Features

- 中英双语界面 / Chinese-English bilingual interface
- 游客与茶厂双入口 / Visitor and factory perspective selector
- 羊楼洞历史文化、青砖茶和万里茶道知识卡片
- 12306、携程、Trip.com 和视频外链
- 从出发、住宿到茶园体验的行程规划
- 基于地块号的茶园成熟度展示
- NDVI、无人机观测、置信度和数据缺口说明
- P1-P4 采摘优先级和采摘路径建议
- 商家订单供货匹配与替代地块建议
- 无人机复查任务列表
- 智能体问答：默认使用本地样例回答，可通过 `VITE_QWEN_PROXY_URL` 接入千问代理

## Data Gap Kept in Version 1

当前版本保留一个明确的数据缺口：`YLD-C009` 缺少 2026-07-08 之后的多光谱 NDVI 复测，因此不会直接进入采摘路径，需要先执行无人机复查。

Current version keeps one explicit data gap: plot `YLD-C009` lacks a multispectral NDVI revisit after 2026-07-08, so it is excluded from the direct harvest route until UAV rechecking is completed.

## Tech Stack

- React
- TypeScript
- Vite
- Vitest
- Lucide React
- GitHub Pages

## Local Development

Install dependencies:

```bash
npm install
```

Optional Qwen proxy configuration:

```bash
cp .env.example .env
```

Set `VITE_QWEN_PROXY_URL` only when a backend proxy endpoint is available. Do not put `DASHSCOPE_API_KEY` in any Vite frontend environment variable, because GitHub Pages is static and frontend variables are public in the built JavaScript.

The included example proxy can be run locally or adapted to a serverless platform:

```bash
DASHSCOPE_API_KEY=your_key_here node server/qwen-proxy.example.mjs
```

Then set:

```bash
VITE_QWEN_PROXY_URL=http://localhost:8787/api/qwen-chat
```

The proxy follows Alibaba Cloud Model Studio / DashScope OpenAI-compatible chat completion format and defaults to `qwen-plus`.

Start the development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

The app is configured for GitHub Pages under the repository path:

```ts
base: "/Service-Learning/"
```

Deployment workflow used for this prototype:

1. Push to `main`.
2. Run `npm run build`.
3. Publish the generated `dist` folder to the `gh-pages` branch.

If deployment fails at the Pages step, check:

- Repository **Settings -> Pages -> Source** is set to **Deploy from a branch**.
- The selected branch is `gh-pages` and the folder is `/ (root)`.
- The repository is public or Pages is enabled for the account plan.

## Project Structure

```text
.
├── .github/workflows/deploy.yml
├── docs/superpowers/
├── src/
│   ├── components/
│   ├── data/
│   ├── services/
│   ├── App.tsx
│   └── styles.css
├── index.html
├── package.json
├── vite.config.ts
└── 主题7_Proposal.md
```

## Future Work

- Connect real-time travel APIs such as 12306, Ctrip, and Trip.com where available.
- Add authenticated tea-factory data import for NDVI, UAV images, orders, and harvest records.
- Replace sample data with field-verified plot boundaries and maturity observations.
- Add map-based harvest path visualization.
- Deploy the Qwen proxy as a production API endpoint and restrict CORS to the public GitHub Pages URL.
- Connect real recommendation APIs for travel planning and tea-factory operations.
