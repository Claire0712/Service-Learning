import type { Attraction, ExperiencePlan, ExternalResource, KnowledgeCard, MerchantOrder, Plot, UavTask } from "../types";

export const plots: Plot[] = [
  {
    id: "YLD-A012",
    areaMu: 38,
    variety: { zh: "青砖茶原料茶", en: "Qingzhuan tea raw-leaf cultivar" },
    maturity: "mature",
    maturityLabel: { zh: "已成熟", en: "Mature" },
    ndvi: 0.68,
    canopyColor: { zh: "嫩梢颜色均匀，冠层偏亮绿", en: "Uniform young shoots with bright green canopy" },
    uavObservation: {
      zh: "无人机 RGB 影像显示冠层连续、缺株少，适合进入采摘窗口。",
      en: "UAV RGB imagery shows continuous canopy and few gaps, suitable for harvest window.",
    },
    confidence: 0.86,
    pathStop: 1,
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
    ndvi: 0.63,
    canopyColor: { zh: "冠层转深绿，局部老叶比例升高", en: "Canopy turning darker green with more older leaves locally" },
    uavObservation: {
      zh: "无人机影像显示成熟斑块集中，需提前采摘避免品质下降。",
      en: "UAV imagery shows concentrated mature patches; harvest early to avoid quality decline.",
    },
    confidence: 0.82,
    pathStop: 2,
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
    ndvi: 0.71,
    canopyColor: { zh: "冠层长势旺，嫩梢比例仍在上升", en: "Vigorous canopy with rising share of young shoots" },
    uavObservation: {
      zh: "无人机航片显示长势均匀，建议作为第二天后续采摘地块。",
      en: "UAV imagery shows even growth; schedule as a follow-up plot on the next day.",
    },
    confidence: 0.78,
    pathStop: 3,
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
    ndvi: null,
    canopyColor: { zh: "冠层颜色接近成熟区，但影像时间过旧", en: "Canopy color resembles mature plots, but imagery is outdated" },
    uavObservation: {
      zh: "数据缺口：缺少 7 月 8 日后的多光谱 NDVI 复测，不能直接排入采摘路径。",
      en: "Data gap: missing multispectral NDVI revisit after July 8; cannot be directly placed into the picking path.",
    },
    confidence: 0.52,
    pathStop: 0,
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
    ndvi: 0.58,
    canopyColor: { zh: "局部长势偏弱，颜色不均", en: "Locally weak growth with uneven color" },
    uavObservation: {
      zh: "无人机影像疑似长势不均，先复查，不进入当天路径。",
      en: "UAV imagery suggests uneven growth; revisit first and exclude from today's route.",
    },
    confidence: 0.61,
    pathStop: 0,
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
    ndvi: 0.76,
    canopyColor: { zh: "冠层偏嫩绿，生长旺但未到采摘标准", en: "Tender green canopy, vigorous but not at harvest standard" },
    uavObservation: {
      zh: "无人机影像显示长势旺盛，但成熟度不足，3 天后复查。",
      en: "UAV imagery shows vigorous growth but insufficient maturity; revisit in three days.",
    },
    confidence: 0.74,
    pathStop: 0,
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
    ndvi: 0.66,
    canopyColor: { zh: "冠层颜色稳定，适合体验采摘", en: "Stable canopy color suitable for visitor harvest experience" },
    uavObservation: {
      zh: "无人机影像显示道路可达性好，可作为体验采摘补充路径。",
      en: "UAV imagery shows good road access, suitable as a supplemental visitor picking path.",
    },
    confidence: 0.8,
    pathStop: 4,
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
    ndvi: 0.72,
    canopyColor: { zh: "长势较旺，成熟度略滞后", en: "Vigorous growth with slightly delayed maturity" },
    uavObservation: {
      zh: "无人机影像显示地块面积大，适合作为后续大宗采摘路径。",
      en: "UAV imagery shows a large plot, suitable for a later bulk-picking route.",
    },
    confidence: 0.73,
    pathStop: 0,
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

export const externalResources: ExternalResource[] = [
  {
    id: "railway-12306",
    type: "travel",
    title: { zh: "12306 火车票", en: "12306 train tickets" },
    description: {
      zh: "用于查询到咸宁、赤壁等周边站点的火车票。外链跳转，不在本系统内下单。",
      en: "Check train tickets to Xianning, Chibi, and nearby stations. Opens externally; booking is not handled inside this app.",
    },
    url: "https://www.12306.cn/",
  },
  {
    id: "ctrip",
    type: "lodging",
    title: { zh: "携程出行与住宿", en: "Ctrip travel and lodging" },
    description: {
      zh: "用于查询酒店、交通和当地旅游产品。外链跳转。",
      en: "Search hotels, transport, and local travel products. Opens externally.",
    },
    url: "https://www.ctrip.com/",
  },
  {
    id: "trip",
    type: "lodging",
    title: { zh: "Trip.com 国际游客入口", en: "Trip.com for international visitors" },
    description: {
      zh: "适合英文界面用户查询住宿与行程产品。",
      en: "Useful for English-interface users planning lodging and travel products.",
    },
    url: "https://www.trip.com/",
  },
  {
    id: "video-search",
    type: "video",
    title: { zh: "羊楼洞视频资料", en: "Yangloudong video resources" },
    description: {
      zh: "跳转搜索羊楼洞古街、青砖茶、万里茶道相关视频。",
      en: "Open video search results for Yangloudong old street, Qingzhuan tea, and the Tea Road.",
    },
    url: "https://www.bing.com/videos/search?q=%E7%BE%8A%E6%A5%BC%E6%B4%9E+%E9%9D%92%E7%A0%96%E8%8C%B6",
  },
  {
    id: "culture-search",
    type: "culture",
    title: { zh: "羊楼洞历史文化资料", en: "Yangloudong history resources" },
    description: {
      zh: "用于继续查阅羊楼洞、青砖茶和万里茶道背景资料。",
      en: "Continue reading about Yangloudong, Qingzhuan tea, and the Ten-Thousand-Li Tea Road.",
    },
    url: "https://www.bing.com/search?q=%E7%BE%8A%E6%A5%BC%E6%B4%9E+%E4%B8%87%E9%87%8C%E8%8C%B6%E9%81%93+%E9%9D%92%E7%A0%96%E8%8C%B6",
  },
];

export const experiencePlan: ExperiencePlan = {
  title: { zh: "青砖茶采摘体验", en: "Qingzhuan tea picking experience" },
  plotId: "YLD-C028",
  time: { zh: "建议 14:30-16:00，避开正午高温", en: "Suggested 14:30-16:00, avoiding midday heat" },
  route: [
    { zh: "中国青砖茶博物馆集合", en: "Meet at China Qingzhuan Tea Museum" },
    { zh: "前往万亩茶园体验区", en: "Transfer to the ten-thousand-mu tea garden experience area" },
    { zh: "YLD-C028 示范地块采摘体验", en: "Tea-picking experience at demo plot YLD-C028" },
    { zh: "返回茶文创与产品体验店", en: "Return to the tea cultural creative and product shop" },
  ],
  notes: [
    { zh: "体验地块应避开生产采摘 P1 地块。", en: "Experience plots should avoid production P1 harvest plots." },
    { zh: "雨后或无人机复查未确认时不进入茶园。", en: "Do not enter the garden after rain or before UAV revisit confirmation." },
    { zh: "穿防滑鞋，听从茶园工作人员安排。", en: "Wear non-slip shoes and follow garden staff instructions." },
  ],
};
