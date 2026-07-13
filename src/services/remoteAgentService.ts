import type { Language } from "../types";
import { buildSearchUrl } from "./searchService";

export async function answerRemotePrompt(prompt: string, language: Language) {
  const apiUrl = import.meta.env.VITE_SEARCH_API_URL?.trim();

  if (apiUrl) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: prompt, language }),
      });

      if (response.ok) {
        const data = (await response.json()) as { text?: string; answer?: string };
        return {
          configured: true,
          text: data.text ?? data.answer ?? (language === "zh" ? "Search API 已返回结果。" : "Search API returned results."),
        };
      }
    } catch {
      // Fall back to the configured external-search link below.
    }
  }

  const searchUrl = buildSearchUrl(prompt, "general", language);

  return {
    configured: Boolean(apiUrl),
    text:
      language === "zh"
        ? `Search 已配置为可点击外部检索：${searchUrl}`
        : `Search is available through this external link: ${searchUrl}`,
  };
}
