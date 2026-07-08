import { Plane } from "lucide-react";
import type { Language, UavTask } from "../types";

type UavPanelProps = {
  language: Language;
  tasks: UavTask[];
};

const labels = {
  high: { zh: "高", en: "High" },
  medium: { zh: "中", en: "Medium" },
  low: { zh: "低", en: "Low" },
};

export function UavPanel({ language, tasks }: UavPanelProps) {
  return (
    <section className="panel" aria-labelledby="uav-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{language === "zh" ? "遥感巡检" : "Remote sensing"}</p>
          <h2 id="uav-title">{language === "zh" ? "无人机复查任务" : "UAV revisit tasks"}</h2>
        </div>
        <Plane size={22} />
      </div>

      <div className="stack-list">
        {tasks.map((task) => (
          <article className="compact-card" key={`${task.priority}-${task.plotId}`}>
            <div className="card-row">
              <strong>{task.plotId}</strong>
              <span className={`revisit ${task.priority}`}>{labels[task.priority][language]}</span>
            </div>
            <p>{task.reason[language]}</p>
            <small>{task.action[language]}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
