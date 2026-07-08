# Yangloudong AI Tea Tourism Agent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive bilingual hybrid-demo web prototype for the Yangloudong AI + Tea Culture and Tourism service agent.

**Architecture:** Create a Vite + React single-page app in the workspace. Keep sample data, local agent logic, remote-service placeholder logic, and UI components separated so the local demo works now and future API/search integration can replace the service layer.

**Tech Stack:** Vite, React, TypeScript, CSS modules/plain CSS, Vitest, Testing Library, lucide-react.

---

## File Structure

- `package.json`: project scripts and dependencies.
- `index.html`: Vite entry HTML.
- `src/main.tsx`: React bootstrap.
- `src/App.tsx`: application shell, language state, mode state, and dashboard composition.
- `src/styles.css`: responsive desktop/mobile layout and visual styling.
- `src/types.ts`: shared bilingual and domain types.
- `src/data/sampleData.ts`: bilingual sample plots, orders, UAV tasks, attractions, and knowledge cards.
- `src/services/localAgentService.ts`: local rule-based agent responses and planning helpers.
- `src/services/remoteAgentService.ts`: remote/API placeholder that returns a clear not-configured state.
- `src/components/*.tsx`: focused UI panels for agent chat, harvest planning, orders, routes, culture, UAV tasks, and header controls.
- `src/services/localAgentService.test.ts`: unit tests for core local agent behavior.
- `src/App.test.tsx`: interaction tests for language toggle and local demo prompts.

## Task 1: Scaffold the React App

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`

- [ ] **Step 1: Create project metadata and scripts**

Create `package.json`:

```json
{
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "tsc && vite build",
    "preview": "vite preview --host 127.0.0.1",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "latest",
    "typescript": "latest",
    "react": "latest",
    "react-dom": "latest",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@testing-library/user-event": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "jsdom": "latest",
    "vitest": "latest"
  }
}
```

- [ ] **Step 2: Create the Vite HTML entry**

Create `index.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Yangloudong AI Tea Tourism Agent</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Add a minimal React bootstrap**

Create `src/main.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 4: Add a temporary app shell**

Create `src/App.tsx`:

```tsx
export default function App() {
  return (
    <main className="app-shell">
      <h1>羊楼洞 AI + 茶文旅服务智能体</h1>
      <p>Yangloudong AI + Tea Culture and Tourism Agent</p>
    </main>
  );
}
```

- [ ] **Step 5: Add base styles**

Create `src/styles.css`:

```css
:root {
  font-family: Inter, "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
  color: #17211b;
  background: #f4f7f3;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.app-shell {
  min-height: 100vh;
  padding: 24px;
}
```

- [ ] **Step 6: Install dependencies**

Run: `npm install`

Expected: dependencies install and `package-lock.json` is created.

- [ ] **Step 7: Verify the scaffold builds**

Run: `npm run build`

Expected: TypeScript and Vite build complete successfully.

## Task 2: Add Domain Types and Sample Data

**Files:**
- Create: `src/types.ts`
- Create: `src/data/sampleData.ts`

- [ ] **Step 1: Define shared domain types**

Create `src/types.ts`:

```ts
export type Language = "zh" | "en";

export type BilingualText = {
  zh: string;
  en: string;
};

export type Priority = "P1" | "P2" | "P3" | "P4";

export type Maturity =
  | "immature"
  | "near"
  | "mature"
  | "overripeRisk"
  | "recheck";

export type Plot = {
  id: string;
  areaMu: number;
  variety: BilingualText;
  maturity: Maturity;
  maturityLabel: BilingualText;
  estimatedYieldKg: number;
  lastInspection: string;
  priority: Priority;
  suggestedTime: BilingualText;
  orderBinding: BilingualText;
  reason: BilingualText;
};

export type MerchantOrder = {
  id: string;
  merchant: BilingualText;
  requiredKg: number;
  teaType: BilingualText;
  deadline: BilingualText;
  recommendedPlots: string[];
  expectedSupplyKg: number;
  fulfillment: BilingualText;
  fallback: BilingualText;
};

export type UavTask = {
  priority: "high" | "medium" | "low";
  plotId: string;
  reason: BilingualText;
  action: BilingualText;
};

export type Attraction = {
  id: string;
  name: BilingualText;
  duration: BilingualText;
  description: BilingualText;
};

export type KnowledgeCard = {
  id: string;
  title: BilingualText;
  body: BilingualText;
};

export type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};
```

- [ ] **Step 2: Add bilingual sample data**

Create `src/data/sampleData.ts` with 8 plots, 3 orders, 4 UAV tasks, 4 route stops, and 4 knowledge cards. Include plots such as `YLD-A012`, `YLD-A018`, `YLD-B006`, `YLD-C009`, and `YLD-B014`; include reasons that mention maturity, order binding, stale inspection, and UAV recheck needs.

- [ ] **Step 3: Verify typechecking**

Run: `npm run build`

Expected: build passes with the new data files.

## Task 3: Implement Local and Remote Agent Services

**Files:**
- Create: `src/services/localAgentService.ts`
- Create: `src/services/remoteAgentService.ts`
- Create: `src/services/localAgentService.test.ts`

- [ ] **Step 1: Write failing tests for local agent responses**

Create `src/services/localAgentService.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { answerLocalPrompt, getTopHarvestPlots } from "./localAgentService";
import { plots, orders, uavTasks, attractions, knowledgeCards } from "../data/sampleData";

describe("localAgentService", () => {
  it("returns P1 harvest plots first", () => {
    const top = getTopHarvestPlots(plots);
    expect(top[0].priority).toBe("P1");
    expect(top[0].id).toMatch(/^YLD-/);
  });

  it("answers harvest priority questions with plot IDs", () => {
    const answer = answerLocalPrompt("今天最应该采哪个地块？", "zh", {
      plots,
      orders,
      uavTasks,
      attractions,
      knowledgeCards,
    });
    expect(answer).toContain("YLD-");
    expect(answer).toContain("P1");
  });

  it("answers English route questions in English", () => {
    const answer = answerLocalPrompt("Recommend a half-day route", "en", {
      plots,
      orders,
      uavTasks,
      attractions,
      knowledgeCards,
    });
    expect(answer).toContain("half-day");
    expect(answer).toContain("Yangloudong");
  });
});
```

- [ ] **Step 2: Run tests to confirm failure**

Run: `npm test -- src/services/localAgentService.test.ts`

Expected: fails because service files are not implemented.

- [ ] **Step 3: Implement local agent service**

Create `src/services/localAgentService.ts` with:

```ts
import type { Attraction, KnowledgeCard, Language, MerchantOrder, Plot, UavTask } from "../types";

type AgentContext = {
  plots: Plot[];
  orders: MerchantOrder[];
  uavTasks: UavTask[];
  attractions: Attraction[];
  knowledgeCards: KnowledgeCard[];
};

export function getTopHarvestPlots(plots: Plot[]) {
  const order = { P1: 1, P2: 2, P3: 3, P4: 4 };
  return [...plots].sort((a, b) => order[a.priority] - order[b.priority]);
}

export function answerLocalPrompt(prompt: string, language: Language, context: AgentContext) {
  const normalized = prompt.toLowerCase();
  if (normalized.includes("路线") || normalized.includes("route")) {
    return routeAnswer(language, context.attractions);
  }
  if (normalized.includes("订单") || normalized.includes("卖") || normalized.includes("供") || normalized.includes("order") || normalized.includes("supply")) {
    return orderAnswer(language, context.orders);
  }
  if (normalized.includes("无人机") || normalized.includes("复查") || normalized.includes("uav") || normalized.includes("drone")) {
    return uavAnswer(language, context.uavTasks);
  }
  if (normalized.includes("青砖茶") || normalized.includes("文化") || normalized.includes("qingzhuan") || normalized.includes("culture")) {
    return cultureAnswer(language, context.knowledgeCards);
  }
  return harvestAnswer(language, getTopHarvestPlots(context.plots));
}

function harvestAnswer(language: Language, plots: Plot[]) {
  const top = plots.slice(0, 3);
  if (language === "zh") {
    return `建议优先采摘 ${top[0].id}（${top[0].priority}），原因：${top[0].reason.zh}。后续顺序为 ${top.map((plot) => `${plot.id}/${plot.priority}`).join("、")}。`;
  }
  return `Prioritize ${top[0].id} (${top[0].priority}) because ${top[0].reason.en}. Suggested sequence: ${top.map((plot) => `${plot.id}/${plot.priority}`).join(", ")}.`;
}

function orderAnswer(language: Language, orders: MerchantOrder[]) {
  const order = orders[0];
  if (language === "zh") {
    return `${order.merchant.zh} 需要 ${order.requiredKg} kg ${order.teaType.zh}，推荐地块 ${order.recommendedPlots.join("、")}，预计可供 ${order.expectedSupplyKg} kg。满足情况：${order.fulfillment.zh}。`;
  }
  return `${order.merchant.en} needs ${order.requiredKg} kg of ${order.teaType.en}. Recommended plots: ${order.recommendedPlots.join(", ")} with about ${order.expectedSupplyKg} kg available. Fulfillment: ${order.fulfillment.en}.`;
}

function uavAnswer(language: Language, tasks: UavTask[]) {
  const high = tasks[0];
  if (language === "zh") {
    return `下一次无人机应优先复查 ${high.plotId}，原因：${high.reason.zh}。建议动作：${high.action.zh}。`;
  }
  return `The next UAV revisit should prioritize ${high.plotId}: ${high.reason.en}. Recommended action: ${high.action.en}.`;
}

function routeAnswer(language: Language, attractions: Attraction[]) {
  if (language === "zh") {
    return `半日路线建议：${attractions.map((item) => item.name.zh).join(" -> ")}。这条路线兼顾古街文化、青砖茶展示和茶园体验。`;
  }
  return `Recommended half-day route in Yangloudong: ${attractions.map((item) => item.name.en).join(" -> ")}. This route connects heritage, Qingzhuan tea culture, and tea garden experience.`;
}

function cultureAnswer(language: Language, cards: KnowledgeCard[]) {
  const card = cards[0];
  if (language === "zh") {
    return `${card.title.zh}：${card.body.zh}`;
  }
  return `${card.title.en}: ${card.body.en}`;
}
```

- [ ] **Step 4: Implement remote placeholder**

Create `src/services/remoteAgentService.ts`:

```ts
import type { Language } from "../types";

export async function answerRemotePrompt(_prompt: string, language: Language) {
  return {
    configured: false,
    text:
      language === "zh"
        ? "远程 API/Search 尚未配置。当前使用本地演示数据回答。"
        : "Remote API/Search is not configured. The app is using local demo data.",
  };
}
```

- [ ] **Step 5: Run service tests**

Run: `npm test -- src/services/localAgentService.test.ts`

Expected: all tests pass.

## Task 4: Build Dashboard Components

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/AgentPanel.tsx`
- Create: `src/components/HarvestPanel.tsx`
- Create: `src/components/OrdersPanel.tsx`
- Create: `src/components/UavPanel.tsx`
- Create: `src/components/RoutePanel.tsx`
- Create: `src/components/CulturePanel.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Implement `Header`**

Create a header with product name, language toggle, local demo badge, and disabled API/search buttons.

- [ ] **Step 2: Implement `AgentPanel`**

Create chat UI with quick prompts, text input, local response generation, and remote-mode placeholder message when requested.

- [ ] **Step 3: Implement planning panels**

Create harvest, orders, UAV, route, and culture panels using the sample data. Use plot IDs as primary labels in planning and order views.

- [ ] **Step 4: Compose dashboard in `App.tsx`**

Use state for `language` and pass data into components. Desktop layout should place agent and harvest panels prominently; supporting panels should appear below or beside them.

- [ ] **Step 5: Build**

Run: `npm run build`

Expected: app compiles without TypeScript errors.

## Task 5: Add Responsive Presentation Styling

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Style desktop dashboard**

Create a dense but readable dashboard using CSS grid, restrained colors, 8px card radius, visible status badges, and non-overlapping panel content.

- [ ] **Step 2: Style mobile layout**

Add media queries below 760px so cards stack in one column, prompts wrap or scroll, tables become compact cards, and header controls remain readable.

- [ ] **Step 3: Build**

Run: `npm run build`

Expected: app compiles and CSS does not introduce missing class issues.

## Task 6: Add UI Interaction Tests

**Files:**
- Create: `src/App.test.tsx`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Configure Vitest with jsdom**

Create `vitest.config.ts` and `src/test/setup.ts` so Testing Library can render React components.

- [ ] **Step 2: Add tests**

Create tests that verify the Chinese title renders, switching to English updates visible text, and clicking a quick prompt adds an assistant answer containing a plot ID.

- [ ] **Step 3: Run tests**

Run: `npm test`

Expected: all service and UI tests pass.

## Task 7: Final Verification

**Files:**
- Modify only if verification finds a defect.

- [ ] **Step 1: Run production build**

Run: `npm run build`

Expected: build passes.

- [ ] **Step 2: Start local dev server**

Run: `npm run dev`

Expected: Vite serves the app on a local URL.

- [ ] **Step 3: Browser check**

Open the local URL, check desktop and mobile widths, verify no major text overlap, test language toggle, quick prompts, local demo mode, and remote placeholder.

- [ ] **Step 4: Report**

Report the local URL, files changed, tests run, and any known limitations.

## Self-Review

- Spec coverage: The plan covers bilingual UI, integrated dashboard, local demo data, local rule-based agent, remote/API placeholder, harvest planning, orders, UAV tasks, tourism, culture, responsive layout, and verification.
- Placeholder scan: The plan uses the word "placeholder" only for the intentional remote/API not-configured implementation required by the spec.
- Type consistency: The data, service, and component tasks share the same `Language`, `Plot`, `MerchantOrder`, `UavTask`, `Attraction`, and `KnowledgeCard` types.
