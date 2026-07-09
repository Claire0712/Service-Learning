# Two-Perspective Yangloudong Agent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the existing Yangloudong web app into a two-perspective agent with Visitor and Tea Factory entry flows.

**Architecture:** Keep the current Vite + React + TypeScript app. Add a perspective selector at the app entry, split the existing dashboard into `VisitorView` and `FactoryView`, reuse current factory panels, and add visitor travel/resource/experience panels backed by local bilingual sample data and external links.

**Tech Stack:** Vite, React, TypeScript, Vitest, Testing Library, lucide-react.

---

## File Structure

- Modify `src/types.ts`: add `Perspective`, `ExternalResource`, and `ExperiencePlan` types.
- Modify `src/data/sampleData.ts`: add travel/resource links and tea-picking experience plan data.
- Modify `src/services/localAgentService.ts`: add visitor travel/history/video/experience answers.
- Modify `src/App.tsx`: add perspective state and conditional entry/view rendering.
- Create `src/components/PerspectiveSelector.tsx`: first-screen perspective choice.
- Create `src/components/VisitorView.tsx`: visitor dashboard composition.
- Create `src/components/FactoryView.tsx`: tea factory dashboard composition.
- Create `src/components/TravelPlannerPanel.tsx`: 12306/Ctrip/Trip.com and trip planning.
- Create `src/components/ExperiencePanel.tsx`: tea-picking experience plan.
- Modify `src/components/Header.tsx`: add compact perspective switch.
- Modify `src/styles.css`: add entry screen, perspective layout, link, travel, and experience styles.
- Modify `src/App.test.tsx` and `src/services/localAgentService.test.ts`: add tests for both perspectives and visitor agent answers.
- Modify `主题7_Proposal.md`: add the two-perspective product structure and external-link integration boundary.

## Task 1: Test the New Perspective Requirements

- [ ] Add failing App tests proving:
  - initial screen shows 游客视角 and 茶厂视角;
  - selecting 游客视角 shows 12306, Ctrip, video/resource links, and 采摘体验规划;
  - selecting 茶厂视角 shows 遥感成熟度依据, 采茶路径规划, 数据缺口.
- [ ] Add failing service test proving the local agent answers visitor travel/video/experience questions with 12306/Ctrip and 羊楼洞 context.
- [ ] Run `npm test` and confirm the new tests fail because the features are missing.

## Task 2: Add Visitor Data and Types

- [ ] Extend `src/types.ts` with:
  - `Perspective = "visitor" | "factory"`;
  - `ExternalResource` with bilingual title/description, url, type;
  - `ExperiencePlan` with bilingual title/time/route/notes and plotId.
- [ ] Add `externalResources` and `experiencePlan` exports to `src/data/sampleData.ts`.
- [ ] Run `npm run build` and fix type errors.

## Task 3: Add Two-Perspective Components

- [ ] Create `PerspectiveSelector.tsx`.
- [ ] Create `VisitorView.tsx` using `AgentPanel`, `CulturePanel`, `RoutePanel`, `TravelPlannerPanel`, and `ExperiencePanel`.
- [ ] Create `FactoryView.tsx` using `AgentPanel`, `HarvestPanel`, `SensingPathPanel`, `OrdersPanel`, and `UavPanel`.
- [ ] Create `TravelPlannerPanel.tsx`.
- [ ] Create `ExperiencePanel.tsx`.
- [ ] Modify `App.tsx` to show selector first, then selected view.
- [ ] Modify `Header.tsx` to show perspective switch buttons when a view is active.

## Task 4: Extend Agent Answers

- [ ] Modify `localAgentService.ts` so travel/history/video/experience prompts return visitor-facing answers.
- [ ] Keep NDVI/UAV prompts routed to factory-facing answers.
- [ ] Run service tests and fix failures.

## Task 5: Style and Verify

- [ ] Add responsive styles for selector, visitor dashboard, factory dashboard, external links, and experience plan.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Start `npm run dev` and confirm it prints a Network URL because scripts bind to `0.0.0.0`.
- [ ] Confirm `主题7_Proposal.md` describes Visitor and Tea Factory perspectives.
- [ ] Commit and push changes, excluding the existing `Untitled-1.py` deletion.

## Self-Review

- Spec coverage: The plan covers entry selection, visitor view, factory view, external links, experience planning, NDVI/UAV maturity, picking path, data gap, agent behavior, tests, and dev-server verification.
- Placeholder scan: No implementation placeholders are left in the plan.
- Type consistency: New components use `Language`, `Perspective`, `ExternalResource`, `ExperiencePlan`, and existing sample data types consistently.
