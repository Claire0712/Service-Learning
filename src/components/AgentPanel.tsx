import { ListChecks, MessageSquareText, Send } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import type { Attraction, ChatMessage, KnowledgeCard, Language, MerchantOrder, Perspective, Plot, UavTask } from "../types";
import { answerLocalPrompt } from "../services/localAgentService";
import { answerRemotePrompt } from "../services/remoteAgentService";

type AgentPanelProps = {
  language: Language;
  remoteMode: boolean;
  perspective?: Perspective;
  context: {
    plots: Plot[];
    orders: MerchantOrder[];
    uavTasks: UavTask[];
    attractions: Attraction[];
    knowledgeCards: KnowledgeCard[];
  };
};

const promptSets = {
  factory: {
    zh: ["今天最应该采哪个地块？", "从 NDVI 和无人机判断成熟度", "无人机下一次应该飞哪些地块？", "规划采茶路径"],
    en: [
      "Which plot should be harvested first?",
      "Judge maturity with NDVI and UAV",
      "Which plots need the next UAV revisit?",
      "Plan the picking path",
    ],
  },
  visitor: {
    zh: ["羊楼洞有什么历史文化？", "我想看羊楼洞视频", "从出发到住宿规划行程", "安排采摘体验"],
    en: [
      "What is Yangloudong known for?",
      "Show Yangloudong video resources",
      "Plan travel and lodging",
      "Plan a tea-picking experience",
    ],
  },
};

export function AgentPanel({ language, remoteMode, perspective = "factory", context }: AgentPanelProps) {
  const initialMessage = useMemo<ChatMessage>(
    () => ({
      role: "assistant",
      text:
        language === "zh"
          ? perspective === "visitor"
            ? "你好，我可以介绍羊楼洞历史文化、视频资料、行程住宿和采摘体验。"
            : "你好，我可以基于本地样例数据解释茶园采摘顺序、订单供货、无人机复查和采茶路径。"
          : perspective === "visitor"
            ? "Hello. I can introduce Yangloudong history, video resources, travel/lodging, and tea-picking experiences."
            : "Hello. I can explain harvest priority, order supply, UAV revisits, and picking paths using local demo data.",
    }),
    [language, perspective],
  );

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");

  async function askAgent(prompt: string) {
    if (!prompt.trim()) {
      return;
    }

    const userMessage: ChatMessage = { role: "user", text: prompt };
    const response = remoteMode
      ? (await answerRemotePrompt(prompt, language)).text
      : answerLocalPrompt(prompt, language, context);

    setMessages((current) => [...current, userMessage, { role: "assistant", text: response }]);
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void askAgent(input);
  }

  return (
    <section className="panel agent-panel" aria-labelledby="agent-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{language === "zh" ? "证据问答" : "Evidence Q&A"}</p>
          <h2 id="agent-title">{language === "zh" ? "研究与服务问答" : "Research and service notes"}</h2>
        </div>
        <MessageSquareText size={22} />
      </div>

      <div className="quick-prompts" aria-label={language === "zh" ? "示例问题" : "Example prompts"}>
        {promptSets[perspective][language].map((prompt) => (
          <button key={prompt} type="button" onClick={() => void askAgent(prompt)}>
            <ListChecks size={14} />
            {prompt}
          </button>
        ))}
      </div>

      <div className="chat-log" aria-live="polite">
        {messages.map((message, index) => (
          <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>
            {message.text}
          </div>
        ))}
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={language === "zh" ? "输入问题，例如：A018 为什么优先？" : "Ask, e.g. why is A018 high priority?"}
        />
        <button type="submit" aria-label={language === "zh" ? "发送问题" : "Send question"}>
          <Send size={18} />
        </button>
      </form>
    </section>
  );
}
