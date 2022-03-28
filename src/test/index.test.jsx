import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import { renderWithTheme } from "./testUtils";

describe("Home", () => {
  test("Products não nulo", () => {
    renderWithTheme(<Home />);

    const checkIfHaveProducts = screen.findByText("products")
    expect(checkIfHaveProducts).not.toBeNull()
  });

  test("Checa se há ícones", () => {
    renderWithTheme(<Home />);

    const checkLength = screen.findByText("svg")
    expect(checkLength)
  });
});
