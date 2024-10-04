import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AudiobookDashboard from './AudiobookDashboard.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AudiobookDashboard />
  </StrictMode>,
)
