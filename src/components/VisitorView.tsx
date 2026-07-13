import { useState } from "react";
import { AgentPanel } from "./AgentPanel";
import { CulturePanel } from "./CulturePanel";
import { ExperiencePanel } from "./ExperiencePanel";
import { FeatureNav } from "./FeatureNav";
import { RoutePanel } from "./RoutePanel";
import { SearchPanel } from "./SearchPanel";
import { TravelPlannerPanel } from "./TravelPlannerPanel";
import type { Attraction, ExperiencePlan, ExternalResource, KnowledgeCard, Language, MerchantOrder, Plot, UavTask } from "../types";

type VisitorFeature = "notes" | "search" | "travel" | "route" | "experience" | "culture";

type VisitorViewProps = {
  language: Language;
  remoteMode: boolean;
  context: {
    plots: Plot[];
    orders: MerchantOrder[];
    uavTasks: UavTask[];
    attractions: Attraction[];
    knowledgeCards: KnowledgeCard[];
  };
  resources: ExternalResource[];
  experiencePlan: ExperiencePlan;
};

export function VisitorView({ language, remoteMode, context, resources, experiencePlan }: VisitorViewProps) {
  const [activeFeature, setActiveFeature] = useState<VisitorFeature>("search");

  function renderActiveFeature() {
    switch (activeFeature) {
      case "notes":
        return <AgentPanel language={language} remoteMode={remoteMode} perspective="visitor" context={context} />;
      case "travel":
        return <TravelPlannerPanel language={language} resources={resources} />;
      case "route":
        return <RoutePanel language={language} attractions={context.attractions} />;
      case "experience":
        return <ExperiencePanel language={language} plan={experiencePlan} />;
      case "culture":
        return <CulturePanel language={language} cards={context.knowledgeCards} />;
      case "search":
      default:
        return <SearchPanel language={language} perspective="visitor" />;
    }
  }

  return (
    <>
      <section className="view-title">
        <p className="eyebrow">{language === "zh" ? "游客服务" : "Visitor service"}</p>
        <h2>{language === "zh" ? "游客视角" : "Visitor perspective"}</h2>
      </section>
      <FeatureNav language={language} perspective="visitor" activeId={activeFeature} onSelect={(id) => setActiveFeature(id as VisitorFeature)} />
      <div className="visitor-feature-stage">
        {renderActiveFeature()}
      </div>
    </>
  );
}
