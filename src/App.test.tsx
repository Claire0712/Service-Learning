import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

describe("App", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("shows perspective choices before entering the app", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "羊楼洞茶文旅与茶园遥感决策平台" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "选择研究与服务视角" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /游客视角/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /茶厂视角/ })).toBeInTheDocument();
  });

  it("switches visible interface text to English", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "切换到英文" }));

    expect(screen.getByRole("heading", { name: "Yangloudong Tea Culture and Remote-Sensing Decision Platform" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Visitor/ })).toBeInTheDocument();
  });

  it("lets visitors choose one feature before showing its detail panel", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /游客视角/ }));

    expect(await screen.findByRole("heading", { name: "游客视角" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "功能入口" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "研究与服务问答" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "检索" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "资料检索" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "采摘体验规划" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "采摘体验" }));

    expect(screen.getByRole("heading", { name: "采摘体验规划" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "研究与服务问答" })).not.toBeInTheDocument();
  });

  it("shows visitor travel links when the travel feature is selected", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /游客视角/ }));
    await user.click(screen.getByRole("button", { name: "行程" }));

    expect(screen.getByText(/12306/)).toBeInTheDocument();
    expect(screen.getByText(/携程/)).toBeInTheDocument();
    expect(screen.getAllByText(/视频|Video/).length).toBeGreaterThan(0);
  });

  it("shows factory remote-sensing maturity evidence and a picking path", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /茶厂视角/ }));

    expect(await screen.findByRole("heading", { name: "茶厂视角" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "功能入口" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "无人机示范田判读" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "遥感成熟度依据" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "采茶路径规划" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "资料检索" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "检索" })).not.toBeInTheDocument();
    expect(screen.getByAltText("无人机扫描示范田正射影像")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "遥感" }));

    expect(screen.getByRole("heading", { name: "遥感成熟度依据" })).toBeInTheDocument();
    expect(screen.getAllByText(/NDVI/).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "采茶路径规划" })).toBeInTheDocument();
    expect(screen.getByText(/起点/)).toBeInTheDocument();
    expect(screen.getAllByText(/数据缺口/).length).toBeGreaterThan(0);
  });

  it("adds a factory assistant answer containing a plot ID when a quick prompt is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /茶厂视角/ }));
    await user.click(screen.getByRole("button", { name: "问答" }));
    await user.click(await screen.findByRole("button", { name: /今天最应该采哪个地块/ }));

    expect(await screen.findByText(/建议优先采摘 YLD-A012/)).toBeInTheDocument();
    expect(screen.getByText(/YLD-A012\/P1/)).toBeInTheDocument();
  });

  it("sends perspective context to a configured Qwen proxy in remote mode", async () => {
    const user = userEvent.setup();
    vi.stubEnv("VITE_QWEN_PROXY_URL", "https://example.com/api/qwen-chat");
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ text: "千问代理回答：优先看 YLD-A012。" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    render(<App />);

    await user.click(screen.getByRole("button", { name: "切换联网模式" }));
    await user.click(screen.getByRole("button", { name: /茶厂视角/ }));
    await user.click(screen.getByRole("button", { name: "问答" }));
    await user.click(await screen.findByRole("button", { name: /从 NDVI 和无人机判断成熟度/ }));

    expect(await screen.findByText(/千问代理回答/)).toBeInTheDocument();
    const body = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(body.provider).toBe("qwen");
    expect(body.perspective).toBe("factory");
    expect(body.context.plots[0]).toMatchObject({ id: "YLD-A012", priority: "P1" });
    expect(body.messages[0].role).toBe("system");
  });
});
