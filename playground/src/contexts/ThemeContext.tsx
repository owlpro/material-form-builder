import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'
import { createContext, ReactNode, useContext, useState } from 'react'
import { THEME_OPTIONS, ThemeId } from '../themes'

interface ThemeContextType {
  themeId: ThemeId
  setThemeId: (id: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextType>({
  themeId: 'base',
  setThemeId: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>('base')
  const activeOption = THEME_OPTIONS.find(t => t.id === themeId)!

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId }}>
      <MuiThemeProvider theme={activeOption.theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useAppTheme() {
  return useContext(ThemeContext)
}
