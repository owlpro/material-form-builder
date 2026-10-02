import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import { AppBar, Avatar, Box, Divider, Link, ToggleButton, ToggleButtonGroup, Toolbar, Tooltip, Typography } from "@mui/material";
import { useLang } from "../contexts/LangContext";
import { useAppTheme } from "../contexts/ThemeContext";
import { THEME_OPTIONS } from "../themes";

const DRAWER_WIDTH = 248;
const GITHUB_URL = "https://github.com/owlpro/material-form-builder";

export default function Header() {
    const { lang, setLang } = useLang();
    const { themeId, setThemeId } = useAppTheme();

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: `calc(100% - ${DRAWER_WIDTH}px)`,
                ml: `${DRAWER_WIDTH}px`,
                bgcolor: "background.paper",
                borderBottom: "1px solid",
                borderColor: "divider",
                color: "text.primary",
            }}
        >
            <Toolbar
                variant="dense"
                sx={{ minHeight: 48, position: "relative", justifyContent: "space-between" }}
            >
                {/* Left — GitHub */}
                <Link
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    underline="none"
                    sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", "&:hover": { color: "text.primary" } }}
                >
                    <Box component="svg" viewBox="0 0 24 24" sx={{ width: 18, height: 18, fill: "currentColor", flexShrink: 0 }}>
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                    </Box>
                    <Typography variant="caption" sx={{ fontFamily: "monospace", display: { xs: "none", sm: "block" } }}>
                        owlpro/material-form-builder
                    </Typography>
                </Link>

                {/* Center — theme switcher (absolute so it's always truly centered) */}
                <Box
                    sx={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >


                    <ToggleButtonGroup
                        value={themeId}
                        exclusive
                        size="small"
                        onChange={(_, val) => val && setThemeId(val)}
                        sx={{ "& .MuiToggleButton-root": { px: 1.5, py: 0.3, fontSize: "0.72rem" } }}
                    >
                        {THEME_OPTIONS.map(option => (
                            <ToggleButton key={option.id} value={option.id}>
                                {option.label}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>

                    <Tooltip title="Switch playground theme" arrow>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.disabled", cursor: "default" }}>
                            <PaletteOutlinedIcon sx={{ fontSize: 15 }} />
                            <Typography variant="caption" sx={{ fontWeight: 500, letterSpacing: 0.3, userSelect: "none" }}>
                                Theme
                            </Typography>
                        </Box>
                    </Tooltip>
                </Box>

                {/* Right — lang toggle + avatar */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Typography variant="caption" color="text.disabled" sx={{ display: { xs: "none", md: "block" } }}>
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

                    <Divider orientation="vertical" flexItem sx={{ my: 1 }} />

                    <Tooltip title="Mahdi Amiri — @owlpro">
                        <Avatar
                            component={Link}
                            href="https://github.com/owlpro"
                            target="_blank"
                            rel="noreferrer"
                            src="https://github.com/owlpro.png"
                            alt="owlpro"
                            sx={{ width: 28, height: 28, cursor: "pointer", textDecoration: "none" }}
                        />
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
