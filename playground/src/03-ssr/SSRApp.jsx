import React, { useState, useEffect } from 'react';

export function SSRApp() {
  const [isClient, setIsClient] = useState(false);

  // Hal. 29: useEffect tidak berjalan di sisi Server (SSR)
  // Jadi jika kita merubah state di dalam useEffect, itu hanya akan terjadi di Client-Side (Browser)
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <h2>Modul 3: Server Side Rendering (SSR)</h2>
      <p>
        Ini adalah demonstrasi konseptual dari materi SSR. Karena aplikasi *playground* kita ini
        berjalan murni dengan metode CSR (Client-Side Rendering) menggunakan Vite *development server*, 
        kita tidak bisa langsung mensimulasikan SSR secara nyata di sini tanpa mematikan server dan menjalankan Node.js/Express server terpisah.
      </p>
      
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fafafa' }}>
        <h3>Simulasi Hydration & Peringatan (Hal. 28 & 29)</h3>
        <p>
          Salah satu masalah terbesar dalam SSR adalah <strong>Hydration Mismatch</strong>, yaitu perbedaan antara
          HTML yang di-render oleh Server dan Client.
        </p>

        <div style={{ padding: '10px', background: '#ffeeba', border: '1px solid #ffeeba', color: '#856404', marginTop: '10px' }}>
          <strong>Status Render Saat Ini:</strong> {isClient ? 'Di-render oleh Client (CSR)' : 'Di-render oleh Server (SSR)'}
        </div>

        <p style={{ marginTop: '15px' }}>
          Contoh nyata: Jika kita ingin merender waktu saat ini secara langsung seperti ini 
          <code>{new Date().toLocaleTimeString()}</code>, nilai di Server (misal 10:00:00) 
          kemungkinan besar akan berbeda dengan nilai di Client saat hydration (misal 10:00:02). 
          Hal ini akan membuat React mengeluarkan *Warning Mismatch*.
        </p>
        <p>
          Solusinya adalah menaruh hal yang rentan berbeda tersebut ke dalam <code>useEffect</code>, 
          karena <code>useEffect</code> <strong>hanya berjalan di sisi Client</strong>.
        </p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4>Contoh Kode Implementasi (Tersedia di Folder ini)</h4>
        <p>
          Kamu bisa mengecek file <code>SimpleServerExample.js</code> di dalam folder <code>src/03-ssr/</code> 
          untuk melihat contoh nyata implementasi <code>renderToString</code> dari API <code>ReactDOMServer</code> 
          yang dibahas di halaman 26 PDF.
        </p>
      </div>
    </div>
  );
}
