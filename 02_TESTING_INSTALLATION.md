# Panduan Instalasi dan Setup React Testing di Vite

Panduan ini berisi langkah-langkah praktis untuk menyiapkan *environment testing* pada aplikasi React yang di-generate menggunakan Vite. 

Meskipun PDF materi berfokus pada **Jest** (yang merupakan default di `create-react-app`), untuk project berbasis **Vite**, standar industri yang digunakan saat ini adalah **Vitest**. Vitest adalah alternatif Jest yang jauh lebih cepat untuk Vite, dan memiliki API yang **100% kompatibel dengan Jest** (`describe`, `test`, `expect`, `vi.fn()` sebagai pengganti `jest.fn()`).

## 1. Instalasi Dependencies

Buka terminal dan pastikan kamu berada di dalam direktori aplikasi (contoh: `playground`), lalu jalankan perintah berikut:

```bash
cd playground

# Install Vitest dan ekosistem Testing Library
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Penjelasan *package*:
* `vitest`: Pengganti Jest sebagai *test runner* di lingkungan Vite.
* `jsdom`: Menyimulasikan DOM browser di terminal Node.js.
* `@testing-library/react`: *Library* inti untuk me-render komponen secara terisolasi.
* `@testing-library/jest-dom`: Tambahan *custom matchers* (misal: `toBeInTheDocument()`).
* `@testing-library/user-event`: Alat untuk menyimulasikan kejadian interaksi *user* asli (klik, ketik).

---

## 2. Konfigurasi Vite untuk Testing

Ubah file `vite.config.js` di dalam root direktori `playground` menjadi seperti ini:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Tambahkan blok test di bawah ini
  test: {
    globals: true, // Mengaktifkan global API seperti di Jest (describe, test, expect)
    environment: 'jsdom', // Menggunakan jsdom untuk simulasi DOM
    setupFiles: './src/setupTests.js', // Menjalankan file setup sebelum test dimulai
  },
})
```

---

## 3. Membuat File Setup Test

Buat file baru bernama `setupTests.js` di dalam folder `src/`. File ini akan dieksekusi secara otomatis setiap kali *test* dijalankan untuk menyiapkan *environment* DOM.

```js
// File: src/setupTests.js

// Memasukkan custom matchers dari jest-dom secara global
// Sehingga kita bisa menggunakan expect(...).toBeInTheDocument() dll.
import '@testing-library/jest-dom';
```

---

## 4. Menambahkan Script ke `package.json`

Buka file `package.json` dan tambahkan perintah `"test"` di dalam bagian `"scripts"`:

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest" 
  },
```

---

## 5. Cara Menjalankan Test

Setelah selesai dikonfigurasi, kamu bisa membuat file *test* dengan akhiran `.test.jsx` atau `.spec.jsx`. Misalnya `SimpleTestForm.test.jsx`.

Untuk mengeksekusi tes, cukup jalankan perintah di terminal:

```bash
npm run test
```

Vitest memiliki *watch mode* secara bawaan, sehingga setiap kali kamu menyimpan file kode atau file pengujian, pengujian akan secara otomatis dijalankan kembali dengan super cepat!
