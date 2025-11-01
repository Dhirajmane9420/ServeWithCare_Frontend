import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'leaflet/dist/leaflet.css' 


import 'swiper/css';
import 'swiper/css/pagination';

import { ThemeProvider } from './contexts/ThemeContext.jsx' // <-- IMPORT

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider> {/* <-- WRAP YOUR APP */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)