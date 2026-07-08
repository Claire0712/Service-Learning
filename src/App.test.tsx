import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the Chinese dashboard title by default", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "AI + 茶文旅服务智能体" })).toBeInTheDocument();
    expect(screen.getByText("本地演示")).toBeInTheDocument();
  });

  it("switches visible interface text to English", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "切换到英文" }));

    expect(screen.getByRole("heading", { name: "AI + Tea Culture and Tourism Agent" })).toBeInTheDocument();
    expect(screen.getByText("Local demo")).toBeInTheDocument();
  });

  it("adds a local assistant answer containing a plot ID when a quick prompt is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /今天最应该采哪个地块/ }));

    expect(await screen.findByText(/建议优先采摘 YLD-A012/)).toBeInTheDocument();
    expect(screen.getByText(/YLD-A012\/P1/)).toBeInTheDocument();
  });
});
