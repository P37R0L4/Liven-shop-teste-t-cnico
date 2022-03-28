import React from "react";
import { render } from "@testing-library/react";
import { theme, ThemeProvider } from "@chakra-ui/react";

export const renderWithTheme = ui => {
  const Wrapper = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper });
};