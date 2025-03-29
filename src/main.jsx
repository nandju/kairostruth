import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import './index.css'
import App from './App.jsx'

// Configuration du thème Ant Design avec vos couleurs personnalisées
const themeConfig = {
  token: {
    colorPrimary: '#990000',
    colorLink: '#990000',
    colorLinkHover: '#cc0000',
    fontFamily: 'Poppins, sans-serif',
  },
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={themeConfig}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
