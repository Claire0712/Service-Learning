import { useState } from "react";
import { FactoryView } from "./components/FactoryView";
import { Header } from "./components/Header";
import { PerspectiveSelector } from "./components/PerspectiveSelector";
import { VisitorView } from "./components/VisitorView";
import { attractions, experiencePlan, externalResources, knowledgeCards, orders, plots, uavTasks } from "./data/sampleData";
import type { Language, Perspective } from "./types";

export default function App() {
  const [language, setLanguage] = useState<Language>("zh");
  const [remoteMode, setRemoteMode] = useState(false);
  const [perspective, setPerspective] = useState<Perspective | null>(null);

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
        perspective={perspective}
        onPerspectiveChange={setPerspective}
      />

      {!perspective ? <PerspectiveSelector language={language} onSelect={setPerspective} /> : null}

      {perspective === "visitor" ? (
        <VisitorView
          language={language}
          remoteMode={remoteMode}
          context={context}
          resources={externalResources}
          experiencePlan={experiencePlan}
        />
      ) : null}

      {perspective === "factory" ? <FactoryView language={language} remoteMode={remoteMode} context={context} /> : null}
    </main>
  );
}
