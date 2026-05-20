import { AppBar, Box, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from "@mui/material";
import { useLang } from "../contexts/LangContext";

const DRAWER_WIDTH = 248;

export default function Header() {
  const { lang, setLang } = useLang();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
        bgcolor: "#fff",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Toolbar variant="dense" sx={{ justifyContent: "space-between", minHeight: 48 }}>
        <Typography variant="body2" color="text.disabled" sx={{ fontFamily: "monospace" }}>
          playground
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography variant="caption" color="text.disabled">
            Language / زبان
          </Typography>
          <ToggleButtonGroup
            value={lang}
            exclusive
            size="small"
            onChange={(_, val) => val && setLang(val)}
            sx={{ "& .MuiToggleButton-root": { px: 1.5, py: 0.3, fontSize: "0.72rem" } }}
          >
            <ToggleButton value="en">EN</ToggleButton>
            <ToggleButton value="fa">FA</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
