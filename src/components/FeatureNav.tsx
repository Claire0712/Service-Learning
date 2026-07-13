import { ClipboardList, Leaf, MapPinned, PackageCheck, Plane, Sprout, TrainFront } from "lucide-react";
import type { Language, Perspective } from "../types";

type FeatureNavProps = {
  language: Language;
  perspective: Perspective;
  activeId?: string;
  onSelect?: (id: string) => void;
};

const featureItems = {
  visitor: [
    { id: "notes", icon: ClipboardList, zh: "问答", en: "Notes" },
    { id: "travel", icon: TrainFront, zh: "行程", en: "Travel" },
    { id: "route", icon: MapPinned, zh: "路线", en: "Route" },
    { id: "experience", icon: Sprout, zh: "采摘体验", en: "Experience" },
    { id: "culture", icon: Leaf, zh: "文化", en: "Culture" },
  ],
  factory: [
    { id: "field", icon: MapPinned, zh: "示范田", en: "Field" },
    { id: "notes", icon: ClipboardList, zh: "问答", en: "Notes" },
    { id: "harvest", icon: Sprout, zh: "采摘", en: "Harvest" },
    { id: "sensing", icon: Leaf, zh: "遥感", en: "Sensing" },
    { id: "orders", icon: PackageCheck, zh: "供货", en: "Supply" },
    { id: "uav", icon: Plane, zh: "无人机", en: "UAV" },
  ],
};

export function FeatureNav({ language, perspective, activeId, onSelect }: FeatureNavProps) {
  return (
    <nav className="feature-nav" aria-label={language === "zh" ? "功能入口" : "Feature shortcuts"}>
      <span>{language === "zh" ? "功能入口" : "Shortcuts"}</span>
      {featureItems[perspective].map((item) => {
        const Icon = item.icon;

        if (onSelect) {
          return (
            <button
              className={activeId === item.id ? "active" : ""}
              type="button"
              key={item.id}
              onClick={() => onSelect(item.id)}
            >
              <Icon size={15} />
              {item[language]}
            </button>
          );
        }

        return (
          <a href={`#${item.id}`} key={item.id}>
            <Icon size={15} />
            {item[language]}
          </a>
        );
      })}
    </nav>
  );
}
