import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import App from "../src/App";

describe('App', () => {
    it('renders headline', () => {
        render(<App />)
    })
})
