import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../src/App";

describe("App", () => {
  it("renders headline", () => {
    render(<App title="React" />);
    screen.debug();
    expect(screen.getByRole("heading").textContent).toMatch(/Hello React/);
  });
});
