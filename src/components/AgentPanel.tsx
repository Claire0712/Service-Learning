import { Bot, Send, Sparkles } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import type { Attraction, ChatMessage, KnowledgeCard, Language, MerchantOrder, Plot, UavTask } from "../types";
import { answerLocalPrompt } from "../services/localAgentService";
import { answerRemotePrompt } from "../services/remoteAgentService";

type AgentPanelProps = {
  language: Language;
  remoteMode: boolean;
  context: {
    plots: Plot[];
    orders: MerchantOrder[];
    uavTasks: UavTask[];
    attractions: Attraction[];
    knowledgeCards: KnowledgeCard[];
  };
};

const promptSets = {
  zh: ["今天最应该采哪个地块？", "哪些地块可以供应已经卖出去的订单？", "无人机下一次应该飞哪些地块？", "推荐半日文旅路线"],
  en: [
    "Which plot should be harvested first?",
    "Which plots can supply current orders?",
    "Which plots need the next UAV revisit?",
    "Recommend a half-day route",
  ],
};

export function AgentPanel({ language, remoteMode, context }: AgentPanelProps) {
  const initialMessage = useMemo<ChatMessage>(
    () => ({
      role: "assistant",
      text:
        language === "zh"
          ? "你好，我可以基于本地样例数据解释茶园采摘顺序、订单供货、无人机复查和羊楼洞文旅路线。"
          : "Hello. I can explain harvest priority, order supply, UAV revisits, and Yangloudong visitor routes using local demo data.",
    }),
    [language],
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
          <p className="eyebrow">{language === "zh" ? "双语问答" : "Bilingual Q&A"}</p>
          <h2 id="agent-title">{language === "zh" ? "服务智能体" : "Service agent"}</h2>
        </div>
        <Bot size={22} />
      </div>

      <div className="quick-prompts" aria-label={language === "zh" ? "示例问题" : "Example prompts"}>
        {promptSets[language].map((prompt) => (
          <button key={prompt} type="button" onClick={() => void askAgent(prompt)}>
            <Sparkles size={14} />
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
