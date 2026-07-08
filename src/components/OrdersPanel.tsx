import { PackageCheck } from "lucide-react";
import type { Language, MerchantOrder } from "../types";

type OrdersPanelProps = {
  language: Language;
  orders: MerchantOrder[];
};

export function OrdersPanel({ language, orders }: OrdersPanelProps) {
  return (
    <section className="panel" aria-labelledby="orders-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{language === "zh" ? "销售联动" : "Sales linkage"}</p>
          <h2 id="orders-title">{language === "zh" ? "商家供货建议" : "Merchant supply"}</h2>
        </div>
        <PackageCheck size={22} />
      </div>

      <div className="stack-list">
        {orders.map((order) => (
          <article className="compact-card" key={order.id}>
            <div className="card-row">
              <strong>{order.merchant[language]}</strong>
              <span>{order.requiredKg} kg</span>
            </div>
            <p>{order.fulfillment[language]}</p>
            <div className="tag-row">
              {order.recommendedPlots.map((plotId) => (
                <span className="tag" key={plotId}>
                  {plotId}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
