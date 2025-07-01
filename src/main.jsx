import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toastdev, ToastdevProvider } from '@azadev/react-toastdev'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastdevProvider toastTheme='dark-pumping'>
      <Toastdev />
      <App />
    </ToastdevProvider>
  </StrictMode>,
)
