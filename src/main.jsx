import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SearchBox from './SearchBox.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <SearchBox /> */}
    <App />
  </StrictMode>,
)
