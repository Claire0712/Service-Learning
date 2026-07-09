import { AgentPanel } from "./AgentPanel";
import { HarvestPanel } from "./HarvestPanel";
import { OrdersPanel } from "./OrdersPanel";
import { SensingPathPanel } from "./SensingPathPanel";
import { UavPanel } from "./UavPanel";
import type { Attraction, KnowledgeCard, Language, MerchantOrder, Plot, UavTask } from "../types";

type FactoryViewProps = {
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

export function FactoryView({ language, remoteMode, context }: FactoryViewProps) {
  return (
    <>
      <section className="view-title">
        <p className="eyebrow">{language === "zh" ? "生产决策" : "Production decision"}</p>
        <h2>{language === "zh" ? "茶厂视角" : "Tea factory perspective"}</h2>
      </section>
      <section className="summary-strip" aria-label={language === "zh" ? "关键指标" : "Key metrics"}>
        <div>
          <span>{language === "zh" ? "P1 地块" : "P1 plots"}</span>
          <strong>{context.plots.filter((plot) => plot.priority === "P1").length}</strong>
        </div>
        <div>
          <span>{language === "zh" ? "可匹配订单" : "Matched orders"}</span>
          <strong>{context.orders.length}</strong>
        </div>
        <div>
          <span>{language === "zh" ? "无人机任务" : "UAV tasks"}</span>
          <strong>{context.uavTasks.length}</strong>
        </div>
        <div>
          <span>{language === "zh" ? "数据缺口" : "Data gaps"}</span>
          <strong>{context.plots.filter((plot) => plot.ndvi === null).length}</strong>
        </div>
      </section>
      <div className="dashboard-grid factory-grid">
        <AgentPanel language={language} remoteMode={remoteMode} perspective="factory" context={context} />
        <HarvestPanel language={language} plots={context.plots} />
        <SensingPathPanel language={language} plots={context.plots} />
        <OrdersPanel language={language} orders={context.orders} />
        <UavPanel language={language} tasks={context.uavTasks} />
      </div>
    </>
  );
}
