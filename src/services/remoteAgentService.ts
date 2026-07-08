import type { Language } from "../types";

export async function answerRemotePrompt(_prompt: string, language: Language) {
  return {
    configured: false,
    text:
      language === "zh"
        ? "远程 API/Search 尚未配置。当前使用本地演示数据回答。"
        : "Remote API/Search is not configured. The app is using local demo data.",
  };
}
