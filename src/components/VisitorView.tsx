import { AgentPanel } from "./AgentPanel";
import { CulturePanel } from "./CulturePanel";
import { ExperiencePanel } from "./ExperiencePanel";
import { FeatureNav } from "./FeatureNav";
import { RoutePanel } from "./RoutePanel";
import { SearchPanel } from "./SearchPanel";
import { TravelPlannerPanel } from "./TravelPlannerPanel";
import type { Attraction, ExperiencePlan, ExternalResource, KnowledgeCard, Language, MerchantOrder, Plot, UavTask } from "../types";

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
  return (
    <>
      <section className="view-title">
        <p className="eyebrow">{language === "zh" ? "游客服务" : "Visitor service"}</p>
        <h2>{language === "zh" ? "游客视角" : "Visitor perspective"}</h2>
      </section>
      <FeatureNav language={language} perspective="visitor" />
      <div className="dashboard-grid visitor-grid">
        <AgentPanel language={language} remoteMode={remoteMode} perspective="visitor" context={context} />
        <SearchPanel language={language} perspective="visitor" />
        <TravelPlannerPanel language={language} resources={resources} />
        <RoutePanel language={language} attractions={context.attractions} />
        <ExperiencePanel language={language} plan={experiencePlan} />
        <CulturePanel language={language} cards={context.knowledgeCards} />
      </div>
    </>
  );
}
