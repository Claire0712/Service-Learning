import { BookOpenText } from "lucide-react";
import type { KnowledgeCard, Language } from "../types";

type CulturePanelProps = {
  language: Language;
  cards: KnowledgeCard[];
};

export function CulturePanel({ language, cards }: CulturePanelProps) {
  return (
    <section className="panel" aria-labelledby="culture-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{language === "zh" ? "茶文化知识库" : "Tea culture base"}</p>
          <h2 id="culture-title">{language === "zh" ? "知识卡片" : "Knowledge cards"}</h2>
        </div>
        <BookOpenText size={22} />
      </div>

      <div className="knowledge-grid">
        {cards.map((card) => (
          <article className="knowledge-card" key={card.id}>
            <h3>{card.title[language]}</h3>
            <p>{card.body[language]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
