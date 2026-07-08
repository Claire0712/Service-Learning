import type { Attraction, KnowledgeCard, MerchantOrder, Plot, UavTask } from "../types";

export const plots: Plot[] = [
  {
    id: "YLD-A012",
    areaMu: 38,
    variety: { zh: "青砖茶原料茶", en: "Qingzhuan tea raw-leaf cultivar" },
    maturity: "mature",
    maturityLabel: { zh: "已成熟", en: "Mature" },
    estimatedYieldKg: 280,
    lastInspection: "2026-07-08",
    priority: "P1",
    suggestedTime: { zh: "明日上午", en: "Tomorrow morning" },
    orderBinding: { zh: "已绑定商家 A 订单", en: "Bound to Merchant A order" },
    reason: {
      zh: "成熟度达标且已绑定交付订单，预计产量可覆盖首批供货。",
      en: "Maturity is ready and the plot is bound to a delivery order; estimated yield can cover the first supply batch.",
    },
  },
  {
    id: "YLD-A018",
    areaMu: 26,
    variety: { zh: "早芽型茶树", en: "Early-bud tea cultivar" },
    maturity: "overripeRisk",
    maturityLabel: { zh: "过熟风险", en: "Overripe risk" },
    estimatedYieldKg: 190,
    lastInspection: "2026-07-08",
    priority: "P1",
    suggestedTime: { zh: "明日下午", en: "Tomorrow afternoon" },
    orderBinding: { zh: "未绑定，可补充高品质订单", en: "Unbound; suitable as a premium-order supplement" },
    reason: {
      zh: "成熟窗口较短，若延后采摘可能影响茶叶品质。",
      en: "The harvest window is short; delaying harvest may reduce leaf quality.",
    },
  },
  {
    id: "YLD-B006",
    areaMu: 44,
    variety: { zh: "中生群体种", en: "Mid-season mixed cultivar" },
    maturity: "near",
    maturityLabel: { zh: "接近成熟", en: "Nearly mature" },
    estimatedYieldKg: 320,
    lastInspection: "2026-07-07",
    priority: "P2",
    suggestedTime: { zh: "后天上午", en: "The morning after tomorrow" },
    orderBinding: { zh: "可供应商家 B 预售订单", en: "Can supply Merchant B presale order" },
    reason: {
      zh: "预计 24-48 小时进入采摘窗口，产量较高，适合作为后续订单主供地块。",
      en: "Expected to enter the harvest window within 24-48 hours, with high yield suitable for later orders.",
    },
  },
  {
    id: "YLD-C009",
    areaMu: 31,
    variety: { zh: "青砖茶拼配原料", en: "Qingzhuan blending raw material" },
    maturity: "recheck",
    maturityLabel: { zh: "需复查", en: "Needs recheck" },
    estimatedYieldKg: 210,
    lastInspection: "2026-07-04",
    priority: "P2",
    suggestedTime: { zh: "无人机复查后确认", en: "Confirm after UAV revisit" },
    orderBinding: { zh: "候选替代地块", en: "Fallback candidate plot" },
    reason: {
      zh: "上次巡检已超过 3 天且接近成熟，需要复查后再进入采摘计划。",
      en: "Last inspection is older than three days and maturity is close; revisit before scheduling harvest.",
    },
  },
  {
    id: "YLD-B014",
    areaMu: 22,
    variety: { zh: "山地茶", en: "Hillside tea cultivar" },
    maturity: "recheck",
    maturityLabel: { zh: "需复查", en: "Needs recheck" },
    estimatedYieldKg: 150,
    lastInspection: "2026-07-06",
    priority: "P3",
    suggestedTime: { zh: "复查后 1-2 天", en: "1-2 days after revisit" },
    orderBinding: { zh: "未绑定订单", en: "No order binding" },
    reason: {
      zh: "影像疑似长势不均，需补拍多光谱或近景照片。",
      en: "Imagery suggests uneven growth; capture multispectral or close-range photos.",
    },
  },
  {
    id: "YLD-A003",
    areaMu: 35,
    variety: { zh: "晚生茶树", en: "Late-season tea cultivar" },
    maturity: "immature",
    maturityLabel: { zh: "未成熟", en: "Immature" },
    estimatedYieldKg: 260,
    lastInspection: "2026-07-08",
    priority: "P4",
    suggestedTime: { zh: "3 天后观察", en: "Observe again in three days" },
    orderBinding: { zh: "暂不供货", en: "Not available for supply yet" },
    reason: {
      zh: "当前成熟度不足，不建议进入 1-3 天采摘计划。",
      en: "Current maturity is insufficient; not recommended for the 1-3 day harvest plan.",
    },
  },
  {
    id: "YLD-C028",
    areaMu: 29,
    variety: { zh: "高香型茶树", en: "High-aroma tea cultivar" },
    maturity: "mature",
    maturityLabel: { zh: "已成熟", en: "Mature" },
    estimatedYieldKg: 230,
    lastInspection: "2026-07-08",
    priority: "P2",
    suggestedTime: { zh: "后天下午", en: "The afternoon after tomorrow" },
    orderBinding: { zh: "适合文旅体验采摘", en: "Suitable for visitor harvest experience" },
    reason: {
      zh: "成熟度稳定，交通距离较近，可兼顾体验活动和生产采摘。",
      en: "Maturity is stable and access is convenient, supporting both visitor experience and production harvest.",
    },
  },
  {
    id: "YLD-D011",
    areaMu: 41,
    variety: { zh: "标准青砖茶原料", en: "Standard Qingzhuan raw material" },
    maturity: "near",
    maturityLabel: { zh: "接近成熟", en: "Nearly mature" },
    estimatedYieldKg: 300,
    lastInspection: "2026-07-07",
    priority: "P3",
    suggestedTime: { zh: "2-3 天后", en: "In 2-3 days" },
    orderBinding: { zh: "可作为大宗订单备选", en: "Backup for bulk orders" },
    reason: {
      zh: "产量较高但成熟度尚未完全达标，建议继续观察。",
      en: "Yield is high but maturity is not fully ready; continue monitoring.",
    },
  },
];

export const orders: MerchantOrder[] = [
  {
    id: "ORD-A-0710",
    merchant: { zh: "商家 A", en: "Merchant A" },
    requiredKg: 500,
    teaType: { zh: "青砖茶原料鲜叶", en: "Fresh leaves for Qingzhuan tea" },
    deadline: { zh: "7 月 10 日晚前", en: "Before the evening of July 10" },
    recommendedPlots: ["YLD-A012", "YLD-A018", "YLD-B006"],
    expectedSupplyKg: 790,
    fulfillment: { zh: "可满足，建议分两批采摘交付", en: "Fulfillable; split into two harvest batches" },
    fallback: { zh: "若 A018 品质下降，可用 C009 复查后补充", en: "If A018 quality declines, use C009 after revisit" },
  },
  {
    id: "ORD-B-0711",
    merchant: { zh: "商家 B", en: "Merchant B" },
    requiredKg: 300,
    teaType: { zh: "高香型体验茶", en: "High-aroma experience tea" },
    deadline: { zh: "7 月 11 日中午前", en: "Before noon on July 11" },
    recommendedPlots: ["YLD-C028", "YLD-B006"],
    expectedSupplyKg: 550,
    fulfillment: { zh: "可满足，并适合文旅采摘体验", en: "Fulfillable and suitable for visitor harvest experience" },
    fallback: { zh: "若体验活动延期，可改用 D011 作为大宗补充", en: "If the activity is delayed, use D011 as bulk backup" },
  },
  {
    id: "ORD-C-0712",
    merchant: { zh: "合作社预售单", en: "Cooperative presale order" },
    requiredKg: 650,
    teaType: { zh: "标准青砖茶拼配原料", en: "Standard Qingzhuan blending leaves" },
    deadline: { zh: "7 月 12 日前", en: "Before July 12" },
    recommendedPlots: ["YLD-B006", "YLD-D011", "YLD-C009"],
    expectedSupplyKg: 830,
    fulfillment: { zh: "需等待 B006 和 D011 成熟窗口", en: "Requires B006 and D011 to reach harvest window" },
    fallback: { zh: "C009 复查通过后可作为补充", en: "C009 can supplement after a successful revisit" },
  },
];

export const uavTasks: UavTask[] = [
  {
    priority: "high",
    plotId: "YLD-C009",
    reason: { zh: "上次巡检超过 3 天且接近成熟", en: "Last inspection is older than three days and maturity is close" },
    action: { zh: "明早优先复查 RGB 与多光谱影像", en: "Prioritize RGB and multispectral revisit tomorrow morning" },
  },
  {
    priority: "medium",
    plotId: "YLD-B014",
    reason: { zh: "影像疑似长势不均", en: "Imagery suggests uneven canopy growth" },
    action: { zh: "补拍多光谱影像并记录现场备注", en: "Capture multispectral imagery and field notes" },
  },
  {
    priority: "medium",
    plotId: "YLD-D011",
    reason: { zh: "大宗订单备选地块，需要确认成熟窗口", en: "Bulk-order backup plot; harvest window needs confirmation" },
    action: { zh: "后天上午航线复查", en: "Schedule route revisit the morning after tomorrow" },
  },
  {
    priority: "low",
    plotId: "YLD-A003",
    reason: { zh: "当前未成熟且无紧急订单", en: "Currently immature with no urgent order" },
    action: { zh: "3 天后常规复查", en: "Routine revisit in three days" },
  },
];

export const attractions: Attraction[] = [
  {
    id: "museum",
    name: { zh: "中国青砖茶博物馆", en: "China Qingzhuan Tea Museum" },
    duration: { zh: "60 分钟", en: "60 minutes" },
    description: {
      zh: "了解青砖茶工艺、万里茶道和羊楼洞茶产业历史。",
      en: "Learn about Qingzhuan tea craft, the Ten-Thousand-Li Tea Road, and Yangloudong tea history.",
    },
  },
  {
    id: "old-street",
    name: { zh: "羊楼洞明清石板街", en: "Yangloudong Ming-Qing Stone Street" },
    duration: { zh: "45 分钟", en: "45 minutes" },
    description: {
      zh: "参观古街建筑、茶商遗迹和茶马古道文化空间。",
      en: "Visit historic buildings, tea merchant traces, and Tea Road cultural spaces.",
    },
  },
  {
    id: "tea-garden",
    name: { zh: "万亩茶园体验区", en: "Ten-thousand-mu Tea Garden Experience Area" },
    duration: { zh: "75 分钟", en: "75 minutes" },
    description: {
      zh: "结合无人机巡检样例，理解茶园数字化管理与采摘规划。",
      en: "Use UAV inspection examples to understand digital tea garden management and harvest planning.",
    },
  },
  {
    id: "creative-shop",
    name: { zh: "茶文创与产品体验店", en: "Tea Cultural Creative and Product Shop" },
    duration: { zh: "30 分钟", en: "30 minutes" },
    description: {
      zh: "体验青砖茶产品、文创伴手礼和品牌故事。",
      en: "Experience Qingzhuan tea products, cultural gifts, and brand stories.",
    },
  },
];

export const knowledgeCards: KnowledgeCard[] = [
  {
    id: "tea-road",
    title: { zh: "万里茶道源头", en: "Source of the Ten-Thousand-Li Tea Road" },
    body: {
      zh: "羊楼洞是万里茶道的重要源头之一，青砖茶贸易曾连接中国内陆与欧亚市场。",
      en: "Yangloudong is an important source of the Ten-Thousand-Li Tea Road, where Qingzhuan tea trade connected inland China with Eurasian markets.",
    },
  },
  {
    id: "qingzhuan",
    title: { zh: "青砖茶文化", en: "Qingzhuan Tea Culture" },
    body: {
      zh: "青砖茶以压制成砖、便于运输和长期保存为特色，是羊楼洞茶文化的核心符号。",
      en: "Qingzhuan tea is compressed into bricks for transport and storage, making it a core symbol of Yangloudong tea culture.",
    },
  },
  {
    id: "remote-sensing",
    title: { zh: "无人机与遥感", en: "UAV and Remote Sensing" },
    body: {
      zh: "无人机影像可辅助判断冠层颜色、覆盖度和异常区域，但应与人工记录共同校验。",
      en: "UAV imagery can help assess canopy color, coverage, and anomalies, but should be verified with field observations.",
    },
  },
  {
    id: "rural-ai",
    title: { zh: "AI 助力乡村振兴", en: "AI for Rural Revitalization" },
    body: {
      zh: "服务智能体把游客服务、茶文化传播和茶园生产规划连接起来，形成可展示、可迭代的数字服务方案。",
      en: "The service agent connects visitor service, tea-culture communication, and production planning into a demonstrable and extensible digital service.",
    },
  },
];
