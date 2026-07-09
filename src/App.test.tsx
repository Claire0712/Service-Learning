import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("shows perspective choices before entering the app", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "AI + 茶文旅服务智能体" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /游客视角/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /茶厂视角/ })).toBeInTheDocument();
  });

  it("switches visible interface text to English", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "切换到英文" }));

    expect(screen.getByRole("heading", { name: "AI + Tea Culture and Tourism Agent" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Visitor/ })).toBeInTheDocument();
  });

  it("shows visitor travel links, video resources, and tea-picking experience plan", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /游客视角/ }));

    expect(await screen.findByRole("heading", { name: "游客视角" })).toBeInTheDocument();
    expect(screen.getByText(/12306/)).toBeInTheDocument();
    expect(screen.getByText(/携程/)).toBeInTheDocument();
    expect(screen.getAllByText(/视频|Video/).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "采摘体验规划" })).toBeInTheDocument();
  });

  it("shows factory remote-sensing maturity evidence and a picking path", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /茶厂视角/ }));

    expect(await screen.findByRole("heading", { name: "茶厂视角" })).toBeInTheDocument();
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
    await user.click(await screen.findByRole("button", { name: /今天最应该采哪个地块/ }));

    expect(await screen.findByText(/建议优先采摘 YLD-A012/)).toBeInTheDocument();
    expect(screen.getByText(/YLD-A012\/P1/)).toBeInTheDocument();
  });
});
