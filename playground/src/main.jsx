// Mengimpor StrictMode dari React untuk menampilkan peringatan pada mode development
import { StrictMode } from 'react'
// Mengimpor createRoot dari react-dom/client untuk merender aplikasi ke DOM
import { createRoot } from 'react-dom/client'
// Mengimpor file CSS global
import './index.css'
// Mengimpor komponen utama (App) dari file App.jsx
import App from './App.jsx'

// Mencari elemen HTML dengan id 'root' dan merender komponen App di dalamnya
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
