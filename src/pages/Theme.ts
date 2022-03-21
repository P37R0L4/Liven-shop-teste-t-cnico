//theme.ts
import { extendTheme } from "@chakra-ui/react";
import config from "next/config";

export const theme = extendTheme({
  config,
  styles: {
    global: () => ({
      body: {
        bg: "white",
      },
    }),
  },
});
