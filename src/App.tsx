import { useState } from "react";
import { AgentPanel } from "./components/AgentPanel";
import { CulturePanel } from "./components/CulturePanel";
import { HarvestPanel } from "./components/HarvestPanel";
import { Header } from "./components/Header";
import { OrdersPanel } from "./components/OrdersPanel";
import { RoutePanel } from "./components/RoutePanel";
import { SensingPathPanel } from "./components/SensingPathPanel";
import { UavPanel } from "./components/UavPanel";
import { attractions, knowledgeCards, orders, plots, uavTasks } from "./data/sampleData";
import type { Language } from "./types";

export default function App() {
  const [language, setLanguage] = useState<Language>("zh");
  const [remoteMode, setRemoteMode] = useState(false);

  const context = {
    plots,
    orders,
    uavTasks,
    attractions,
    knowledgeCards,
  };

  return (
    <main className="app-shell">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        remoteMode={remoteMode}
        onRemoteModeChange={setRemoteMode}
      />

      <section className="summary-strip" aria-label={language === "zh" ? "关键指标" : "Key metrics"}>
        <div>
          <span>{language === "zh" ? "P1 地块" : "P1 plots"}</span>
          <strong>{plots.filter((plot) => plot.priority === "P1").length}</strong>
        </div>
        <div>
          <span>{language === "zh" ? "可匹配订单" : "Matched orders"}</span>
          <strong>{orders.length}</strong>
        </div>
        <div>
          <span>{language === "zh" ? "无人机任务" : "UAV tasks"}</span>
          <strong>{uavTasks.length}</strong>
        </div>
        <div>
          <span>{language === "zh" ? "文旅站点" : "Route stops"}</span>
          <strong>{attractions.length}</strong>
        </div>
      </section>

      <div className="dashboard-grid">
        <AgentPanel language={language} remoteMode={remoteMode} context={context} />
        <HarvestPanel language={language} plots={plots} />
        <SensingPathPanel language={language} plots={plots} />
        <RoutePanel language={language} attractions={attractions} />
        <OrdersPanel language={language} orders={orders} />
        <UavPanel language={language} tasks={uavTasks} />
        <CulturePanel language={language} cards={knowledgeCards} />
      </div>
    </main>
  );
}
