import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import UploadPage from './pages/UploadPage'
import TextPage from './pages/TextPage'
import HistoryPage from './pages/HistoryPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/text" element={<TextPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  )
}

export default App
