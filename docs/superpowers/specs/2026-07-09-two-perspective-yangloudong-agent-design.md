# Two-Perspective Yangloudong Agent Design

Date: 2026-07-09

## Goal

Rework the web agent into two entry perspectives:

- Visitor perspective: explain Yangloudong history and tea culture, link to media/resources, plan travel, lodging, and tea-picking experiences.
- Tea factory perspective: judge tea maturity from NDVI and UAV observations, preserve known data gaps, and generate plot-based picking paths.

The first version remains a local demo with bilingual data and external links. It does not perform real booking, ticket purchase, hotel search, or live API inventory lookup.

The project proposal `主题7_Proposal.md` should be updated to describe the same two-perspective structure so the web prototype and written proposal stay aligned.

## Entry Experience

The first screen must ask users to choose a perspective:

- 游客视角 / Visitor
- 茶厂视角 / Tea factory

After selection, users can switch perspective from the header without reloading the app.

## Visitor Perspective

The visitor interface should include:

- Yangloudong history and culture cards.
- Qingzhuan tea and Ten-Thousand-Li Tea Road context.
- External resource links for official travel, video search, and reference viewing.
- Trip planning from departure to lodging:
  - 12306 train ticket link: `https://www.12306.cn/`
  - Ctrip link: `https://www.ctrip.com/`
  - Trip.com link: `https://www.trip.com/`
- A tea-picking experience plan with time, route stops, suggested experience plot, and safety/field notes.

External links must open in a new tab and be clearly marked as external resources. The app should avoid pretending that booking APIs are integrated.

## Tea Factory Perspective

The factory interface should focus on production decisions:

- NDVI + UAV maturity evidence.
- Plot maturity, confidence, canopy color, UAV observation, and order/harvest priority.
- Picking path: start point -> plot IDs in order -> processing/transport point.
- UAV revisit tasks.
- One explicit data gap remains visible: `YLD-C009` lacks latest multispectral NDVI revisit and should not be directly added to the picking path.

The factory view should be operational and dense. Plot IDs must remain the primary execution labels.

## Agent Behavior

The local rule-based agent should answer:

- Visitor questions about Yangloudong history, Qingzhuan tea, videos, travel, lodging, and tea-picking experience.
- Factory questions about NDVI, UAV maturity, harvest priority, and picking paths.

Unknown questions should receive a useful fallback with suggested prompts.

## Technical Approach

Keep the current Vite + React + TypeScript app. Add perspective state in `App.tsx` and split dashboard composition into:

- `PerspectiveSelector`
- `VisitorView`
- `FactoryView`
- `TravelPlannerPanel`
- `ExperiencePanel`
- existing factory panels reused: `AgentPanel`, `HarvestPanel`, `SensingPathPanel`, `UavPanel`, `OrdersPanel`

Add sample data for external links and experience plans in `sampleData.ts`.

## Testing

Tests should verify:

- Initial screen shows the two perspective choices.
- Visitor perspective shows history/culture content, 12306, Ctrip/Trip.com links, video/resource links, and tea-picking experience planning.
- Factory perspective shows NDVI/UAV maturity evidence, the picking path, and the data gap.
- Existing language toggle and quick prompt behavior still work.

## Out of Scope

- Real 12306/Ctrip/Trip.com API integration.
- Login, booking, payment, ticket purchase, or hotel inventory.
- Real map routing.
- Real uploaded UAV image processing.
- Production deployment.
