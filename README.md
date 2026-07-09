# Service Learning

双视角羊楼洞茶文旅与茶园生产智能体 Web 原型。

Service Learning is a two-perspective web prototype for Yangloudong tea culture tourism and tea-factory harvest planning.

## Online Demo

Public URL:

https://claire0712.github.io/Service-Learning/

Note: this repository is configured for GitHub Pages deployment through GitHub Actions. If the URL returns `404`, enable GitHub Pages in the repository settings and set the source to **GitHub Actions**.

## Project Overview

本项目把羊楼洞茶文化旅游服务和茶厂采摘决策放在同一个 Web agent 中。用户进入系统后先选择使用视角：

- **游客视角 / Visitor view**: 了解羊楼洞历史文化、青砖茶、万里茶道，查看视频与外部资料链接，并规划交通、住宿和茶园采摘体验。
- **茶厂视角 / Factory view**: 基于 NDVI、无人机影像、冠层颜色和人工记录判断茶叶成熟度，生成地块级采摘优先级、采摘路径和无人机复查任务。

The first version runs as a local-demo-first web application. It uses structured sample data and external links, while leaving API/search integration points for future work.

## Core Features

- 中英双语界面 / Chinese-English bilingual interface
- 游客与茶厂双入口 / Visitor and factory perspective selector
- 羊楼洞历史文化、青砖茶和万里茶道知识卡片
- 12306、携程、Trip.com、视频和资料检索外链
- 从出发、住宿到茶园体验的行程规划
- 基于地块号的茶园成熟度展示
- NDVI、无人机观测、置信度和数据缺口说明
- P1-P4 采摘优先级和采摘路径建议
- 商家订单供货匹配与替代地块建议
- 无人机复查任务列表
- 预留远程 API/search 模式按钮

## Data Gap Kept in Version 1

当前版本保留一个明确的数据缺口：`YLD-C009` 缺少 2026-07-08 之后的多光谱 NDVI 复测，因此不会直接进入采摘路径，需要先执行无人机复查。

Current version keeps one explicit data gap: plot `YLD-C009` lacks a multispectral NDVI revisit after 2026-07-08, so it is excluded from the direct harvest route until UAV rechecking is completed.

## Tech Stack

- React
- TypeScript
- Vite
- Vitest
- Lucide React
- GitHub Pages + GitHub Actions

## Local Development

Install dependencies:

```bash
npm install
```

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

Deployment workflow:

1. Push to `main`.
2. GitHub Actions installs dependencies and runs `npm run build`.
3. The generated `dist` folder is uploaded to GitHub Pages.

If deployment fails at the Pages step, check:

- Repository **Settings -> Pages -> Source** is set to **GitHub Actions**.
- GitHub Actions has permission to deploy Pages.
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
- Add backend API endpoints for search, recommendation, and agent reasoning.

