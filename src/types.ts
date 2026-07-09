export type Language = "zh" | "en";

export type BilingualText = {
  zh: string;
  en: string;
};

export type Priority = "P1" | "P2" | "P3" | "P4";

export type Maturity =
  | "immature"
  | "near"
  | "mature"
  | "overripeRisk"
  | "recheck";

export type Plot = {
  id: string;
  areaMu: number;
  variety: BilingualText;
  maturity: Maturity;
  maturityLabel: BilingualText;
  ndvi: number | null;
  canopyColor: BilingualText;
  uavObservation: BilingualText;
  confidence: number;
  pathStop: number;
  estimatedYieldKg: number;
  lastInspection: string;
  priority: Priority;
  suggestedTime: BilingualText;
  orderBinding: BilingualText;
  reason: BilingualText;
};

export type MerchantOrder = {
  id: string;
  merchant: BilingualText;
  requiredKg: number;
  teaType: BilingualText;
  deadline: BilingualText;
  recommendedPlots: string[];
  expectedSupplyKg: number;
  fulfillment: BilingualText;
  fallback: BilingualText;
};

export type UavTask = {
  priority: "high" | "medium" | "low";
  plotId: string;
  reason: BilingualText;
  action: BilingualText;
};

export type Attraction = {
  id: string;
  name: BilingualText;
  duration: BilingualText;
  description: BilingualText;
};

export type KnowledgeCard = {
  id: string;
  title: BilingualText;
  body: BilingualText;
};

export type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};
