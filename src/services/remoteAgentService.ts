import type { Attraction, KnowledgeCard, Language, MerchantOrder, Perspective, Plot, UavTask } from "../types";

type AgentContext = {
  plots: Plot[];
  orders: MerchantOrder[];
  uavTasks: UavTask[];
  attractions: Attraction[];
  knowledgeCards: KnowledgeCard[];
};

type QwenProxyResponse = {
  text?: string;
  answer?: string;
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export function getQwenProxyUrl() {
  return import.meta.env.VITE_QWEN_PROXY_URL?.trim() ?? "";
}

export function buildQwenMessages(prompt: string, language: Language, perspective: Perspective) {
  const system =
    language === "zh"
      ? perspective === "factory"
        ? "你是羊楼洞茶厂服务学习平台的生产决策助手。请只基于随请求提供的地块、NDVI、无人机复查、订单和数据缺口信息回答；如果数据不足，明确说明缺口，不要编造实时遥感结果。回答要简洁，可执行。"
        : "你是羊楼洞茶文旅服务学习平台的游客助手。请基于随请求提供的文化、行程、外部资源和采摘体验信息回答；不要声称已经完成订票、订房或实际预约。回答要中英信息友好、简洁可执行。"
      : perspective === "factory"
        ? "You are the production decision assistant for the Yangloudong tea factory service-learning platform. Answer only from the provided plot, NDVI, UAV revisit, order, and data-gap context. If data is insufficient, name the gap instead of inventing live remote-sensing results. Keep answers concise and actionable."
        : "You are the visitor assistant for the Yangloudong tea culture and travel service-learning platform. Use only the provided culture, travel-resource, and tea-picking experience context. Do not claim that tickets, hotels, or reservations have been booked. Keep answers concise and actionable.";

  return [
    { role: "system", content: system },
    { role: "user", content: prompt },
  ];
}

function buildCompactContext(context: AgentContext) {
  return {
    plots: context.plots.map((plot) => ({
      id: plot.id,
      priority: plot.priority,
      maturity: plot.maturityLabel,
      ndvi: plot.ndvi,
      confidence: plot.confidence,
      pathStop: plot.pathStop,
      uavObservation: plot.uavObservation,
      reason: plot.reason,
      dataGap: plot.ndvi === null,
    })),
    orders: context.orders.map((order) => ({
      id: order.id,
      merchant: order.merchant,
      requiredKg: order.requiredKg,
      teaType: order.teaType,
      recommendedPlots: order.recommendedPlots,
      expectedSupplyKg: order.expectedSupplyKg,
    })),
    uavTasks: context.uavTasks,
    attractions: context.attractions,
    knowledgeCards: context.knowledgeCards,
  };
}

export async function answerRemotePrompt(
  prompt: string,
  language: Language,
  perspective: Perspective,
  context: AgentContext,
) {
  const apiUrl = getQwenProxyUrl();

  if (apiUrl) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: "qwen",
          model: "qwen-plus",
          language,
          perspective,
          messages: buildQwenMessages(prompt, language, perspective),
          context: buildCompactContext(context),
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as QwenProxyResponse;
        return {
          configured: true,
          text:
            data.text ??
            data.answer ??
            data.choices?.[0]?.message?.content ??
            (language === "zh" ? "千问代理已返回结果。" : "The Qwen proxy returned a response."),
        };
      }
    } catch {
      return {
        configured: true,
        text: "",
      };
    }
  }

  return {
    configured: false,
    text: "",
  };
}
