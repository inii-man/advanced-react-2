// Mengimpor hook useState dari React
import { useState } from 'react'
// Mengimpor styling utama aplikasi
import './App.css'

// Mengimpor komponen pembelajaran untuk Redux
import { ReduxApp } from './01-redux/ReduxApp'

// Komponen utama aplikasi
function App() {
  // State untuk menyimpan contoh mana yang sedang aktif / dilihat
  const [activeTab, setActiveTab] = useState('redux')

  // Mengembalikan tampilan aplikasi
  return (
    <div className="App">
      <h1>Playground: Advanced React 2</h1>
      <p>Pilih salah satu modul untuk melihat contohnya.</p>
      
      {/* Container untuk tombol-tombol navigasi (tab) */}
      <div className="tabs" style={{ marginTop: '10px' }}>
        {/* Tombol untuk membuka tab Modul 1: Redux */}
        <button 
          onClick={() => setActiveTab('redux')}
          style={{ backgroundColor: activeTab === 'redux' ? '#cce5ff' : '' }}
        >
          Modul 1: State Management using Redux
        </button>
        {/* Nanti bisa ditambahkan tombol untuk Testing dan SSR di sini */}
      </div>

      {/* Area konten tempat komponen yang aktif ditampilkan */}
      <div className="tab-content" style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
        
        {/* Menampilkan Modul 1: Redux */}
        {activeTab === 'redux' && (
          <div style={{ textAlign: 'left' }}>
            <ReduxApp />
          </div>
        )}
        
      </div>
    </div>
  )
}

// Mengekspor komponen App untuk dirender di file main.jsx
export default App
