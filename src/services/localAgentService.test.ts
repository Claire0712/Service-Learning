import { describe, expect, it } from "vitest";
import { answerLocalPrompt, getTopHarvestPlots } from "./localAgentService";
import { attractions, knowledgeCards, orders, plots, uavTasks } from "../data/sampleData";

const context = {
  plots,
  orders,
  uavTasks,
  attractions,
  knowledgeCards,
};

describe("localAgentService", () => {
  it("returns P1 harvest plots first", () => {
    const top = getTopHarvestPlots(plots);

    expect(top[0].priority).toBe("P1");
    expect(top[0].id).toMatch(/^YLD-/);
  });

  it("answers harvest priority questions with plot IDs", () => {
    const answer = answerLocalPrompt("今天最应该采哪个地块？", "zh", context);

    expect(answer).toContain("YLD-");
    expect(answer).toContain("P1");
  });

  it("answers English route questions in English", () => {
    const answer = answerLocalPrompt("Recommend a half-day route", "en", context);

    expect(answer).toContain("half-day");
    expect(answer).toContain("Yangloudong");
  });

  it("answers NDVI and UAV maturity questions with evidence and a data gap", () => {
    const answer = answerLocalPrompt("从 NDVI 和无人机判断茶是否成熟，并规划采茶路径", "zh", context);

    expect(answer).toContain("NDVI");
    expect(answer).toContain("无人机");
    expect(answer).toContain("采茶路径");
    expect(answer).toContain("数据缺口");
  });

  it("answers visitor travel and video questions with external services", () => {
    const answer = answerLocalPrompt("我想看羊楼洞视频，并从出发到住宿规划行程", "zh", context);

    expect(answer).toContain("羊楼洞");
    expect(answer).toContain("12306");
    expect(answer).toContain("携程");
    expect(answer).toContain("视频");
  });
});
