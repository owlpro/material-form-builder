import { Routes, Route } from 'react-router-dom'
import { LangProvider, useLang } from './contexts/LangContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Rtl from './components/Rtl'
import Layout from './components/Layout'
import Home from './pages/Home'
import TextInputPage from './pages/inputs/TextInputPage'
import NumberInputPage from './pages/inputs/NumberInputPage'
import PasswordInputPage from './pages/inputs/PasswordInputPage'
import MaskInputPage from './pages/inputs/MaskInputPage'
import SelectInputPage from './pages/inputs/SelectInputPage'
import AutocompleteInputPage from './pages/inputs/AutocompleteInputPage'
import ToggleInputPage from './pages/inputs/ToggleInputPage'
import CheckboxInputPage from './pages/inputs/CheckboxInputPage'
import SwitchInputPage from './pages/inputs/SwitchInputPage'

function AppContent() {
  const { isRtl } = useLang()

  const tree = (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inputs/text" element={<TextInputPage />} />
        <Route path="/inputs/number" element={<NumberInputPage />} />
        <Route path="/inputs/password" element={<PasswordInputPage />} />
        <Route path="/inputs/mask" element={<MaskInputPage />} />
        <Route path="/inputs/select" element={<SelectInputPage />} />
        <Route path="/inputs/autocomplete" element={<AutocompleteInputPage />} />
        <Route path="/inputs/toggle" element={<ToggleInputPage />} />
        <Route path="/inputs/checkbox" element={<CheckboxInputPage />} />
        <Route path="/inputs/switch" element={<SwitchInputPage />} />
      </Routes>
    </Layout>
  )

  return isRtl ? <Rtl sx={{ minHeight: '100vh' }}>{tree}</Rtl> : tree
}

export default function App() {
  return (
    <LangProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LangProvider>
  )
}
