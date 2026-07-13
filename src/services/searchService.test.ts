import { describe, expect, it } from "vitest";
import { buildSearchUrl, getDefaultSearchQuery } from "./searchService";

describe("searchService", () => {
  it("builds an external search URL with the query and language", () => {
    const url = buildSearchUrl("NDVI 茶叶成熟", "remoteSensing", "zh");
    const parsed = new URL(url);

    expect(url).toContain("https://www.bing.com/search?");
    expect(parsed.searchParams.get("q")).toContain("NDVI 茶叶成熟");
    expect(parsed.searchParams.get("lang")).toBe("zh");
  });

  it("provides default queries for both perspectives", () => {
    expect(getDefaultSearchQuery("visitor", "zh")).toContain("羊楼洞");
    expect(getDefaultSearchQuery("factory", "en")).toContain("NDVI");
  });
});
