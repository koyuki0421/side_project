import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  {/* 讓伺服器跑2次，目的是：用來在開發階段檢查應用程式中可能的問題 */}
    <App />
  </React.StrictMode>,
)
