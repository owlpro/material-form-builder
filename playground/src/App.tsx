import { Routes, Route } from 'react-router-dom'
import { LangProvider, useLang } from './contexts/LangContext'
import Rtl from './components/Rtl'
import Layout from './components/Layout'
import Home from './pages/Home'
import TextInputPage from './pages/inputs/TextInputPage'

function AppContent() {
  const { isRtl } = useLang()

  const tree = (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inputs/text" element={<TextInputPage />} />
      </Routes>
    </Layout>
  )

  return isRtl ? <Rtl sx={{ minHeight: '100vh' }}>{tree}</Rtl> : tree
}

export default function App() {
  return (
    <LangProvider>
      <AppContent />
    </LangProvider>
  )
}
