import { Footprints, Leaf } from "lucide-react";
import type { ExperiencePlan, Language } from "../types";

type ExperiencePanelProps = {
  language: Language;
  plan: ExperiencePlan;
};

export function ExperiencePanel({ language, plan }: ExperiencePanelProps) {
  return (
    <section className="panel experience-panel" aria-labelledby="experience-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{language === "zh" ? `示范地块 ${plan.plotId}` : `Demo plot ${plan.plotId}`}</p>
          <h2 id="experience-title">{language === "zh" ? "采摘体验规划" : "Tea-picking experience plan"}</h2>
        </div>
        <Leaf size={22} />
      </div>
      <div className="experience-time">{plan.time[language]}</div>
      <ol className="experience-route">
        {plan.route.map((step) => (
          <li key={step.zh}>{step[language]}</li>
        ))}
      </ol>
      <div className="experience-notes">
        <Footprints size={18} />
        <div>
          {plan.notes.map((note) => (
            <p key={note.zh}>{note[language]}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
