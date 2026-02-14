import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Product Filter", () => {
  it("filters products based on input text", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/digite para filtrar/i);

    await userEvent.type(input, "cob");

    await waitFor(() => {
      expect(screen.getByText("Cash In - COB")).toBeInTheDocument();
      expect(screen.getByText("Cash In - COBV")).toBeInTheDocument();
      expect(screen.queryByText("Cash Out - PAYMENT")).not.toBeInTheDocument();
    });
  });
});
