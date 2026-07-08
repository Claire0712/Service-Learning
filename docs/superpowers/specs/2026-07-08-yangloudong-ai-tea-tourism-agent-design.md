# Yangloudong AI + Tea Culture and Tourism Agent Design

Date: 2026-07-08

## Goal

Build a responsive bilingual web prototype for the Yangloudong "AI + Tea Culture and Tourism" service agent. The first version is a hybrid demo: it works locally with built-in sample data and rule-based responses, while reserving visible entry points and service interfaces for future API/search integration.

The product should support a service-learning presentation without requiring network access or an API key, and it should be structured so future remote AI and search services can replace the local demo layer.

## Users

- Visitors: ask for Yangloudong routes, tea-culture explanations, and experience suggestions.
- Tea garden managers: review plot-level maturity, harvest priority, UAV revisit tasks, and planning explanations.
- Merchants or tea enterprises: check whether existing or presale orders can be supplied by available plots.
- Presentation audience: understand the project concept, data flow, and service value quickly from the first screen.

## Product Direction

The first screen is an integrated command center, not a marketing landing page. It should expose the agent's main capabilities immediately:

- bilingual natural-language agent;
- tea garden harvest planning;
- tourist route guidance;
- tea culture knowledge;
- merchant supply matching;
- UAV revisit planning.

The page should adapt to both desktop and mobile. Desktop can use a dense multi-column dashboard. Mobile should use a single-column layout with compact navigation and cards that remain readable.

## Bilingual Requirement

All major UI text, data labels, example prompts, and generated demo answers should support Chinese and English. The interface should include a language toggle. Data records may store bilingual fields such as `name.zh`, `name.en`, `reason.zh`, and `reason.en`.

The default language can be Chinese, with English available through the toggle.

## Functional Scope

### Agent Q&A

The agent panel should support example prompts such as:

- 今天最应该采哪个地块？
- 明天如果下雨，采摘顺序要不要调整？
- 哪些地块可以供应已经卖出去的订单？
- YLD-A018 为什么排在第一？
- 无人机下一次应该飞哪些地块？
- Recommend a half-day route in Yangloudong.
- Explain Qingzhuan tea to international visitors.

The first version uses local rule matching and sample data. It should produce useful, explanatory responses rather than only static text.

### Harvest Planning

Display a ranked harvest plan using plot IDs as the primary key. Each row or card should include:

- plot ID;
- maturity status;
- priority level P1-P4;
- estimated yield;
- suggested harvest time;
- reason;
- order binding status where relevant.

The planning logic should be simple and explainable: overripe risk, mature plots, urgent orders, stale inspections, and sufficient yield increase priority.

### Order and Supply Matching

Display sample merchant orders and recommended supply plots. Each suggestion should include:

- merchant or order name;
- required quantity;
- recommended plots;
- expected supply quantity;
- fulfillment status;
- fallback plot suggestions.

### UAV Revisit Tasks

Display UAV revisit priorities. Each task should include:

- priority level;
- plot ID;
- reason;
- recommended action;
- last inspection age or uncertainty marker.

### Tourism Guidance

Display a route module for Yangloudong visitors. It should include sample route stops such as:

- China Qingzhuan Tea Museum;
- Yangloudong ancient street;
- tea garden viewing or experience area;
- tea product or cultural creative shop.

Route suggestions should be bilingual and presentation-ready.

### Tea Culture Knowledge

Display short bilingual knowledge cards for:

- Yangloudong as an important source of the Ten-Thousand-Li Tea Road;
- Qingzhuan tea culture;
- tea garden remote sensing and UAV inspection;
- how AI supports rural revitalization and tea tourism.

## Hybrid API Strategy

The prototype must work without remote services. It should also make the future integration path visible:

- A mode indicator shows "Local demo data" by default.
- API/search buttons or toggles can be shown but disabled or marked "Not configured".
- A service layer should separate local responses from future remote calls.
- Remote service stubs should return a clear "API key not configured" state rather than failing silently.

Suggested internal service split:

- `localAgentService`: local rule-based answers and planning explanations.
- `remoteAgentService`: placeholder functions for future model/search calls.
- `data`: bilingual sample plots, orders, attractions, knowledge cards, and UAV tasks.

## UI and Interaction

The dashboard should feel like an operational service tool with enough visual polish for a presentation. It should avoid a pure marketing hero page. The first viewport should clearly signal:

- Yangloudong / 羊楼洞;
- AI + Tea Culture and Tourism;
- agent input;
- live planning panels.

Desktop layout:

- top bar with product name, language toggle, data mode indicator, and API/search status;
- main area with agent panel and high-priority planning summary;
- supporting panels for routes, culture, orders, and UAV tasks.

Mobile layout:

- single-column cards;
- compact header;
- horizontally scrollable or stacked quick prompts;
- tables converted to cards where needed.

## Data Model

The sample data should include enough records to make the demo credible:

- 6-10 tea garden plots;
- 2-4 merchant orders;
- 3-5 UAV revisit tasks;
- 4-6 tourist attractions or route stops;
- 4-6 tea culture knowledge cards.

Each plot should include:

- `id`;
- bilingual location or note if needed;
- area;
- variety;
- maturity;
- estimated yield;
- last inspection date;
- order binding;
- priority;
- explanation.

## Error Handling

The app should not break when remote mode is unavailable. It should show clear states:

- local demo mode active;
- remote API not configured;
- search not configured;
- sample data in use.

Unknown user questions should receive a graceful fallback that suggests relevant example prompts.

## Testing and Verification

Before completion, verify:

- the app starts locally;
- desktop layout is readable;
- mobile layout is readable;
- language toggle changes major visible UI text;
- sample prompts generate responses;
- local demo mode works without API key;
- remote/API placeholder does not crash;
- no obvious text overlap in common desktop and mobile widths.

## Out of Scope for First Version

- Real OpenAI or search API integration.
- Real map provider integration.
- File upload/import of field data.
- User authentication.
- Persistent database.
- Production deployment.

These can be added after the presentation prototype is stable.
