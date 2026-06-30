import React from 'react';
import { SimpleTestForm } from './SimpleTestForm';

export function TestingApp() {
  return (
    <div>
      <h2>Modul 2: React Testing</h2>
      <p>
        Ini adalah demonstrasi dari materi React Testing menggunakan React Testing Library dan Vitest 
        (yang memiliki API 100% kompatibel dengan Jest dan dirancang khusus untuk ekosistem Vite).
      </p>
      
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fafafa' }}>
        <h3>Contoh Komponen Form</h3>
        <p>Coba jalankan <code>npm run test</code> di terminal untuk mengeksekusi test terhadap form di bawah ini:</p>
        
        <hr style={{ margin: '15px 0' }} />
        
        <SimpleTestForm />
      </div>
    </div>
  );
}
