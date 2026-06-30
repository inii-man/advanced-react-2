# Panduan Implementasi Server Side Rendering (SSR) Dasar

Untuk mengubah aplikasi React CSR (Client-Side Rendering) biasa menjadi aplikasi yang menggunakan SSR, kita perlu mengubah arsitektur kode agar memisahkan bagian yang berjalan di sisi **Server** (Node.js/Express) dan sisi **Client** (Browser).

Karena kita menggunakan **Vite**, setup SSR *from scratch* (dari awal) membutuhkan langkah yang cukup rumit (menulis `server.js` dengan Express, memisahkan `entry-server.jsx` dan `entry-client.jsx`). Oleh karena itu, banyak developer saat ini lebih memilih *framework* meta seperti **Next.js** atau **Remix** untuk proyek SSR nyata.

Namun, untuk memahami konsep dasarnya berdasarkan PDF, berikut adalah contoh implementasinya secara konseptual. Kode ini juga telah disediakan bentuk tiruannya (mock) di dalam `playground/src/03-ssr/`.

## 1. Memisahkan Entry Point

Kita harus memisahkan tempat aplikasi di-*render* berdasarkan lingkungannya.

### A. Di Sisi Client (Browser)
Kita menggunakan `hydrateRoot` (di React 18, setara dengan `ReactDOM.hydrate`) alih-alih `createRoot`. `hydrateRoot` bertugas menempelkan *event listeners* ke HTML yang sudah disediakan oleh server.

```jsx
// entry-client.jsx
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';

// "Menghidupkan" HTML statis yang dikirim dari server
hydrateRoot(document.getElementById('root'), <App />);
```

### B. Di Sisi Server (Node.js)
Kita menggunakan fungsi `renderToString` dari `react-dom/server` untuk mengubah komponen React menjadi *string* HTML statis.

```jsx
// entry-server.jsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export function render() {
  // Mengubah aplikasi React penuh menjadi String HTML
  const html = renderToString(<App />);
  return html;
}
```

---

## 2. Membuat Web Server (Express.js)

Aplikasi membutuhkan *server* asli (seperti Express) untuk menangani permintaan masuk dari pengguna, me-*render* HTML React, merakitnya ke dalam kerangka *template* HTML dasar, dan mengirimkannya kembali ke pengguna.

```javascript
// server.js (Berjalan di lingkungan Node.js)
import express from 'express';
import fs from 'fs';
import path from 'path';
import { render } from './src/entry-server.jsx'; // Hasil build server

const app = express();

app.use('*', async (req, res) => {
  try {
    // 1. Membaca file template dasar (index.html)
    let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');

    // 2. Memanggil fungsi render SSR React (mengubah komponen ke HTML string)
    const appHtml = render(req.url);

    // 3. Menyisipkan HTML dari React ke dalam <body> tag index.html
    const finalHtml = template.replace('<!--ssr-outlet-->', appHtml);

    // 4. Mengirim HTML penuh ke client (Browser)
    res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
  } catch (e) {
    res.status(500).end(e.message);
  }
});

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
```

---

## 3. Peringatan Penting (Hydration Mismatches)

Salah satu masalah paling umum saat menggunakan SSR adalah ketidakcocokan (*mismatch*) antara apa yang di-*render* oleh Server dan apa yang di-*render* pertama kali oleh Client saat proses *hydration*.

Contoh kasus *mismatch*:
```jsx
function Clock() {
  // Server akan me-render jam berdasarkan waktu di Node.js (misal: 10:00:00)
  // Client akan mencoba me-hydrate jam berdasarkan waktu di Browser (misal: 10:00:02)
  // Ini akan memunculkan React Warning: "Text content did not match..."
  return <div>Jam saat ini: {new Date().toLocaleTimeString()}</div>;
}
```

**Solusinya:** Gunakan `useEffect` untuk menunda proses *render* dinamis hingga komponen ter-*mount* di sisi client, karena `useEffect` **TIDAK DIJALANKAN DI SISI SERVER**.

```jsx
function SafeClock() {
  const [time, setTime] = useState(null);

  // useEffect hanya jalan di Browser (CSR), aman dari SSR Mismatch
  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  // Di server, return string kosong
  // Di client (setelah hydration), return jam
  return <div>Jam saat ini: {time || 'Loading...'}</div>;
}
```
