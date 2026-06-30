/**
 * INI HANYA CONTOH KODE UNTUK PEMBELAJARAN (TIDAK UNTUK DIJALANKAN LANGSUNG).
 * File ini mendemonstrasikan implementasi dari PDF Hal. 25, 26, & 27.
 */

// 1. Menggunakan ReactDOMServer (Hal. 25 & 26)
import { renderToString, renderToNodeStream } from 'react-dom/server';
import React from 'react';

// Simulasi sebuah komponen React
const MyReactApp = () => (
  <div>
    <h1>Halo dari Server!</h1>
    <p>Halaman ini dirender menggunakan SSR.</p>
  </div>
);

// 2. Menggunakan framework server seperti Express
import express from 'express';
const app = express();

app.get('*', (req, res) => {
  // Mengubah komponen React menjadi HTML String murni (Hal. 26)
  const appHtml = renderToString(<MyReactApp />);

  // Menyisipkan HTML tersebut ke dalam struktur halaman web dasar
  const fullHtml = `
    <!DOCTYPE html>
    <html lang="id">
      <head>
        <title>SSR App</title>
      </head>
      <body>
        <!-- Di sinilah letak HTML yang sudah dirender server -->
        <div id="root">${appHtml}</div>
        
        <!-- Script untuk melakukan Hydration di sisi Client (Hal. 27) -->
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;

  // Mengirimkan halaman yang sudah jadi (pre-built) ke browser klien (Hal. 8)
  res.send(fullHtml);
});

// -------------------------------------------------------------
// SISI CLIENT (File /bundle.js yang akan dijalankan di Browser)
// -------------------------------------------------------------
/*
import { hydrateRoot } from 'react-dom/client';
import MyReactApp from './MyReactApp';

// Melakukan Rehydration (Hal. 20 & 27)
// Menempelkan event handler dan "menghidupkan" HTML mati dari server
hydrateRoot(
  document.getElementById('root'), 
  <MyReactApp />
);
*/
