// Mengimpor hook useState dari React
import { useState } from 'react'
// Mengimpor styling utama aplikasi
import './App.css'

// Mengimpor komponen pembelajaran
import { ReduxApp } from './01-redux/ReduxApp'
import { TestingApp } from './02-testing/TestingApp'
import { SSRApp } from './03-ssr/SSRApp'
import { StylingApp } from './04-styling/StylingApp'

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
        {/* Tombol untuk membuka tab Modul 2: Testing */}
        <button 
          onClick={() => setActiveTab('testing')}
          style={{ backgroundColor: activeTab === 'testing' ? '#cce5ff' : '' }}
        >
          Modul 2: React Testing
        </button>
        {/* Tombol untuk membuka tab Modul 3: SSR */}
        <button 
          onClick={() => setActiveTab('ssr')}
          style={{ backgroundColor: activeTab === 'ssr' ? '#cce5ff' : '' }}
        >
          Modul 3: Server Side Rendering
        </button>
        {/* Tombol untuk membuka tab Modul 4: Styling */}
        <button 
          onClick={() => setActiveTab('styling')}
          style={{ backgroundColor: activeTab === 'styling' ? '#cce5ff' : '' }}
        >
          Modul 4: Styled Components
        </button>
      </div>

      {/* Area konten tempat komponen yang aktif ditampilkan */}
      <div className="tab-content" style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
        
        {/* Menampilkan Modul 1: Redux */}
        {activeTab === 'redux' && (
          <div style={{ textAlign: 'left' }}>
            <ReduxApp />
          </div>
        )}

        {/* Menampilkan Modul 2: Testing */}
        {activeTab === 'testing' && (
          <div style={{ textAlign: 'left' }}>
            <TestingApp />
          </div>
        )}
        
        {/* Menampilkan Modul 3: SSR */}
        {activeTab === 'ssr' && (
          <div style={{ textAlign: 'left' }}>
            <SSRApp />
          </div>
        )}

        {/* Menampilkan Modul 4: Styling */}
        {activeTab === 'styling' && (
          <div style={{ textAlign: 'left' }}>
            <StylingApp />
          </div>
        )}

      </div>
    </div>
  )
}

// Mengekspor komponen App untuk dirender di file main.jsx
export default App
