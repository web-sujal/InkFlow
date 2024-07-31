// theme.ts
import { createTheme, DEFAULT_THEME, mergeMantineTheme } from "@mantine/core";

const themeOverride = createTheme({
  colors: {
    paleRed: [
      "#ffeaf3",
      "#fdd4e1",
      "#f4a7bf",
      "#ec779c",
      "#e64f7e",
      "#e3356b",
      "#e22762",
      "#c91a52",
      "#b41149",
      "#9f003e",
    ],
    bgPaper: [
      "#FBF7F4",
      "#eee7e1",
      "#decbbd",
      "#d0af96",
      "#c39674",
      "#bb865f",
      "#b87e53",
      "#a26c44",
      "#915f3a",
      "#7f512e",
    ],
  },
  primaryColor: "paleRed",
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
