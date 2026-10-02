import { createTheme, Theme } from '@mui/material/styles'

export type ThemeId = 'base' | 'ink' | 'sky' | 'bloom'

// ─── Shared base ──────────────────────────────────────────────────────────────
// Input label fixes applied to every theme.

const LABEL_TRANSITION = [
  'color 200ms cubic-bezier(0.0, 0, 0.2, 1)',
  'transform 200ms cubic-bezier(0.0, 0, 0.2, 1)',
  'max-width 200ms cubic-bezier(0.0, 0, 0.2, 1)',
  'top 200ms cubic-bezier(0.0, 0, 0.2, 1)',
].join(', ')

const sharedBase = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          // Animate `top` so float-up stays smooth when top changes 50% → 0
          transition: LABEL_TRANSITION,
          // True vertical centering — independent of font metrics
          '&:not(.MuiInputLabel-shrink)': {
            top: '50%',
            transform: 'translate(14px, -50%) scale(1)',
          },
          // Multiline: label must stay top-aligned, not centered
          '.MuiFormControl-root:has(.MuiInputBase-multiline) &:not(.MuiInputLabel-shrink)': {
            top: 0,
            transform: 'translate(14px, 16px) scale(1)',
          },
        },
      },
    },
  },
})

// ─── Base — MUI default ───────────────────────────────────────────────────────

export const baseTheme = createTheme(sharedBase)

// ─── Ink (shadcn/ui) ──────────────────────────────────────────────────────────
// Neutral zinc palette, dark primary, 8px radius, Inter font

export const shadcnTheme = createTheme(sharedBase, {
  palette: {
    primary: {
      main: '#18181b',
      light: '#3f3f46',
      dark: '#09090b',
      contrastText: '#fafafa',
    },
    secondary: {
      main: '#f4f4f5',
      contrastText: '#18181b',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    divider: '#e4e4e7',
    text: {
      primary: '#09090b',
      secondary: '#71717a',
    },
    error:   { main: '#ef4444' },
    success: { main: '#22c55e' },
    warning: { main: '#f59e0b' },
    info:    { main: '#3b82f6' },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    button: { textTransform: 'none', fontWeight: 500, letterSpacing: 0 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          boxShadow: 'none',
          height: 36,
          '&:hover': { boxShadow: 'none' },
          '&:focus-visible': { outline: '2px solid #18181b', outlineOffset: 2 },
        },
        sizeSmall: { height: 32, fontSize: '0.8125rem' },
        sizeLarge: { height: 44 },
        outlined: {
          borderColor: '#e4e4e7',
          color: '#09090b',
          '&:hover': { borderColor: '#a1a1aa', backgroundColor: '#f4f4f5' },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: { borderColor: '#e4e4e7' },
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#a1a1aa' },
          // keep borderWidth: 1 to prevent MUI's default 1px→2px jump on focus
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#18181b', borderWidth: 1 },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' },
        outlined: { borderColor: '#e4e4e7', boxShadow: 'none' },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 6 } },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderColor: '#e4e4e7',
          '&.Mui-selected': { backgroundColor: '#18181b', color: '#fafafa', '&:hover': { backgroundColor: '#3f3f46' } },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: { padding: '8px 12px' },
      },
    },
  },
})

// ─── Sky (Ant Design) ─────────────────────────────────────────────────────────
// Blue primary #1677ff, system font, 6px radius, Ant-style shadows

export const antTheme = createTheme(sharedBase, {
  palette: {
    primary: {
      main: '#1677ff',
      light: '#4096ff',
      dark: '#0958d9',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00b96b',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    divider: '#d9d9d9',
    text: {
      primary: 'rgba(0,0,0,0.88)',
      secondary: 'rgba(0,0,0,0.45)',
    },
    error:   { main: '#ff4d4f' },
    success: { main: '#52c41a' },
    warning: { main: '#faad14' },
    info:    { main: '#1677ff' },
  },
  shape: { borderRadius: 6 },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    button: { textTransform: 'none', fontWeight: 400 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          boxShadow: '0 2px 0 rgba(5,145,255,0.1)',
          '&:hover': { boxShadow: '0 2px 0 rgba(5,145,255,0.15)' },
        },
        outlined: {
          borderColor: '#d9d9d9',
          color: 'rgba(0,0,0,0.88)',
          boxShadow: '0 2px 0 rgba(0,0,0,0.02)',
          '&:hover': { borderColor: '#4096ff', color: '#4096ff', background: 'transparent' },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: { borderColor: '#d9d9d9' },
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4096ff' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        outlined: { borderColor: '#d9d9d9' },
      },
    },
    MuiToggleButton: {
      styleOverrides: { root: { textTransform: 'none' } },
    },
  },
})

// ─── Bloom (Material Design 3 / Material You) ─────────────────────────────────
// Purple primary #6750A4, 12px radius, pill-shaped buttons, Google Sans

export const materialTheme = createTheme(sharedBase, {
  palette: {
    primary: {
      main: '#6750A4',
      light: '#9a82db',
      dark: '#4f378b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#625B71',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fffbfe',
      paper: '#fffbfe',
    },
    divider: '#cac4d0',
    text: {
      primary: '#1c1b1f',
      secondary: '#49454f',
    },
    error:   { main: '#b3261e' },
    success: { main: '#386a20' },
    warning: { main: '#7d5700' },
    info:    { main: '#6750A4' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Google Sans", "Roboto", sans-serif',
    button: { textTransform: 'none', fontWeight: 500, letterSpacing: 0.1 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          boxShadow: 'none',
          paddingLeft: 24,
          paddingRight: 24,
          '&:hover': { boxShadow: 'none' },
        },
        outlined: {
          borderColor: '#79747e',
          '&:hover': { borderColor: '#6750A4' },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: { borderColor: '#79747e' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        outlined: { borderColor: '#cac4d0' },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 8 } },
    },
    MuiToggleButton: {
      styleOverrides: { root: { textTransform: 'none' } },
    },
    MuiToggleButtonGroup: {
      styleOverrides: { root: { borderRadius: 50 } },
    },
  },
})

// ─── Metadata ─────────────────────────────────────────────────────────────────

export interface ThemeOption {
  id: ThemeId
  label: string
  theme: Theme
}

export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'base',  label: 'Base',  theme: baseTheme     },
  { id: 'ink',   label: 'Ink',   theme: shadcnTheme   },
  { id: 'sky',   label: 'Sky',   theme: antTheme      },
  { id: 'bloom', label: 'Bloom', theme: materialTheme },
]
