import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "../src/components/Footer";


describe("footer", () => {
    it('renders a footer', () => {
        render(<Footer />);
        screen.debug();
        expect(screen.getByRole("contentinfo").textContent).toMatch("Bye react");
    })
    
})