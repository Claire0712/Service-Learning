import type { Attraction, KnowledgeCard, Language, MerchantOrder, Plot, UavTask } from "../types";

type AgentContext = {
  plots: Plot[];
  orders: MerchantOrder[];
  uavTasks: UavTask[];
  attractions: Attraction[];
  knowledgeCards: KnowledgeCard[];
};

const priorityOrder = { P1: 1, P2: 2, P3: 3, P4: 4 };

export function getTopHarvestPlots(plots: Plot[]) {
  return [...plots].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

export function answerLocalPrompt(prompt: string, language: Language, context: AgentContext) {
  const normalized = prompt.toLowerCase();

  if (
    normalized.includes("ndvi") ||
    normalized.includes("成熟") ||
    normalized.includes("采茶路径") ||
    normalized.includes("picking path") ||
    normalized.includes("maturity")
  ) {
    return sensingAnswer(language, getTopHarvestPlots(context.plots));
  }

  if (normalized.includes("路线") || normalized.includes("route") || normalized.includes("游客")) {
    return routeAnswer(language, context.attractions);
  }

  if (
    normalized.includes("订单") ||
    normalized.includes("卖") ||
    normalized.includes("供") ||
    normalized.includes("order") ||
    normalized.includes("supply")
  ) {
    return orderAnswer(language, context.orders);
  }

  if (
    normalized.includes("无人机") ||
    normalized.includes("复查") ||
    normalized.includes("uav") ||
    normalized.includes("drone")
  ) {
    return uavAnswer(language, context.uavTasks);
  }

  if (
    normalized.includes("青砖茶") ||
    normalized.includes("文化") ||
    normalized.includes("qingzhuan") ||
    normalized.includes("culture")
  ) {
    return cultureAnswer(language, context.knowledgeCards);
  }

  return harvestAnswer(language, getTopHarvestPlots(context.plots));
}

function harvestAnswer(language: Language, plots: Plot[]) {
  const top = plots.slice(0, 3);
  if (language === "zh") {
    return `建议优先采摘 ${top[0].id}（${top[0].priority}），原因：${top[0].reason.zh}。后续顺序为 ${top
      .map((plot) => `${plot.id}/${plot.priority}`)
      .join("、")}。`;
  }

  return `Prioritize ${top[0].id} (${top[0].priority}) because ${top[0].reason.en}. Suggested sequence: ${top
    .map((plot) => `${plot.id}/${plot.priority}`)
    .join(", ")}.`;
}

function orderAnswer(language: Language, orders: MerchantOrder[]) {
  const order = orders[0];
  if (language === "zh") {
    return `${order.merchant.zh} 需要 ${order.requiredKg} kg ${order.teaType.zh}，推荐地块 ${order.recommendedPlots.join(
      "、",
    )}，预计可供 ${order.expectedSupplyKg} kg。满足情况：${order.fulfillment.zh}。`;
  }

  return `${order.merchant.en} needs ${order.requiredKg} kg of ${
    order.teaType.en
  }. Recommended plots: ${order.recommendedPlots.join(", ")} with about ${
    order.expectedSupplyKg
  } kg available. Fulfillment: ${order.fulfillment.en}.`;
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

  return `Recommended half-day route in Yangloudong: ${attractions
    .map((item) => item.name.en)
    .join(" -> ")}. This half-day route connects heritage, Qingzhuan tea culture, and tea garden experience.`;
}

function cultureAnswer(language: Language, cards: KnowledgeCard[]) {
  const card = cards[0];
  if (language === "zh") {
    return `${card.title.zh}：${card.body.zh}`;
  }

  return `${card.title.en}: ${card.body.en}`;
}

function sensingAnswer(language: Language, plots: Plot[]) {
  const harvestPath = plots.filter((plot) => plot.pathStop > 0).sort((a, b) => a.pathStop - b.pathStop);
  const evidence = harvestPath
    .slice(0, 3)
    .map((plot) => {
      const index = plot.ndvi === null ? "NDVI 缺失" : `NDVI ${plot.ndvi.toFixed(2)}`;
      return `${plot.id}（${index}，${plot.maturityLabel[language]}）`;
    })
    .join(language === "zh" ? " -> " : " -> ");
  const gap = plots.find((plot) => plot.ndvi === null);

  if (language === "zh") {
    return `可用 NDVI、无人机 RGB/多光谱影像和冠层颜色综合判断成熟度。当前采茶路径建议为 起点 -> ${harvestPath
      .map((plot) => plot.id)
      .join(" -> ")} -> 加工点；依据为 ${evidence}。数据缺口：${gap?.id ?? "无"} 缺少最新多光谱 NDVI 复测，需先无人机复查后再决定是否加入路径。`;
  }

  return `Maturity is judged with NDVI, UAV RGB/multispectral imagery, and canopy color. Suggested picking path: Start -> ${harvestPath
    .map((plot) => plot.id)
    .join(" -> ")} -> processing site; evidence: ${evidence}. Data gap: ${
    gap?.id ?? "none"
  } lacks the latest multispectral NDVI revisit, so it should be checked by UAV before joining the path.`;
}
