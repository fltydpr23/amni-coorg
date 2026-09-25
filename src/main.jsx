import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log(
  "%c Digital experience by Lune Studio ",
  "background: #0c0b09; color: #e8dece; font-family: 'Courier New', Courier, monospace; padding: 6px 12px; font-size: 10px; letter-spacing: 0.1em; border: 1px solid rgba(245, 240, 232, 0.2);"
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
