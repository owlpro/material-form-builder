import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { Box, BoxProps, createTheme, ThemeProvider, useTheme } from "@mui/material";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function Rtl(props: BoxProps) {
  const parentTheme = useTheme();
  const theme = createTheme({
    ...parentTheme,
    direction: "rtl",
    typography: {
      fontFamily: '"IranYekanX", "Roboto", sans-serif',
    },
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box dir="rtl" {...props}>
          {props.children}
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}
