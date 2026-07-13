import { useState } from "react";
import { AgentPanel } from "./AgentPanel";
import { FeatureNav } from "./FeatureNav";
import { HarvestPanel } from "./HarvestPanel";
import { OrdersPanel } from "./OrdersPanel";
import { SensingPathPanel } from "./SensingPathPanel";
import { UavFieldPanel } from "./UavFieldPanel";
import { UavPanel } from "./UavPanel";
import type { Attraction, KnowledgeCard, Language, MerchantOrder, Plot, UavTask } from "../types";

type FactoryFeature = "field" | "notes" | "harvest" | "sensing" | "orders" | "uav";

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
  const [activeFeature, setActiveFeature] = useState<FactoryFeature>("field");

  function renderActiveFeature() {
    switch (activeFeature) {
      case "notes":
        return <AgentPanel language={language} remoteMode={remoteMode} perspective="factory" context={context} />;
      case "harvest":
        return <HarvestPanel language={language} plots={context.plots} />;
      case "sensing":
        return <SensingPathPanel language={language} plots={context.plots} />;
      case "orders":
        return <OrdersPanel language={language} orders={context.orders} />;
      case "uav":
        return <UavPanel language={language} tasks={context.uavTasks} />;
      case "field":
      default:
        return <UavFieldPanel language={language} plots={context.plots} />;
    }
  }

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
      <FeatureNav language={language} perspective="factory" activeId={activeFeature} onSelect={(id) => setActiveFeature(id as FactoryFeature)} />
      <div className="feature-stage factory-feature-stage">
        {renderActiveFeature()}
      </div>
    </>
  );
}
