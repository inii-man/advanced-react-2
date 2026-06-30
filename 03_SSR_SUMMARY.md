# Ringkasan Modul 3: Server Side Rendering (SSR)

Dokumen ini adalah ringkasan dari materi *React Advanced II - Modul 03: Server Side Rendering*.

## 1. Pengenalan Rendering
* **Server Side Rendering (SSR)**: Merupakan cara tradisional di mana halaman HTML dibangun sepenuhnya di server, lalu dikirim ke *client* (browser) siap pakai.
* **Client Side Rendering (CSR)**: Halaman dibangun secara dinamis di *client* menggunakan JavaScript (seperti React, Vue, Angular). Data biasanya dikirim dalam format JSON/XML dari server.

### Kelebihan & Kekurangan CSR
* **Kelebihan**: Seluruh halaman dibuat dengan JavaScript, mendukung arsitektur berbasis komponen (*component-based*), dan *routing* halaman terjadi tanpa perlu me-*reload* keseluruhan halaman secara penuh (pengalaman pengguna lebih mulus).
* **Kekurangan**: Waktu pemuatan awal (*initial load*) bisa lambat jika ukuran file JavaScript terlalu besar. Kurang bersahabat untuk SEO (Search Engine Optimization) karena saat *crawler* (seperti Googlebot) datang, halaman mungkin masih kosong (hanya berisi JS yang belum dieksekusi).

### Kelebihan & Kekurangan SSR (Universal Rendering)
* **Kelebihan**: Sangat baik untuk SEO karena *crawler* langsung mendapatkan konten HTML penuh. *User* juga lebih cepat melihat tampilan layar karena HTML sudah di-*render* sebelumnya (FCP lebih cepat).
* **Kekurangan**: Memiliki TTFB (*Time to First Byte*) yang lebih tinggi/lambat dibanding CSR. Membutuhkan server khusus (seperti Node.js) yang meningkatkan biaya *maintenance*. Kurang efektif untuk di-*cache* oleh CDN dibandingkan halaman statis.

---

## 2. Metrik Pengukuran Performa (Performance Metrics)
Metrik ini membantu developer mengukur dan mengoptimasi pengalaman pengguna.

1. **TTFB (Time to First Byte)**: Waktu yang dibutuhkan sejak *request* dikirim hingga *byte* data pertama diterima oleh *browser*. Semakin lama pemrosesan di server, TTFB akan semakin buruk (biasanya terjadi pada SSR).
2. **FCP (First Contentful Paint)**: Waktu sejak pengguna membuka halaman hingga browser me-*render* konten DOM apa pun (teks, gambar, dll). Standar yang baik adalah di bawah 3 detik. (SSR sangat unggul di metrik ini).
3. **TTI (Time to Interactive)**: Waktu yang dibutuhkan hingga halaman web bisa diinteraksikan secara penuh (bisa di-klik, di-scroll, diketik). Ini mencakup waktu hingga *browser* selesai mengunduh JavaScript dan menempelkan fungsi-fungsi *event handler*.

---

## 3. Server Side Rendering Menggunakan React

Untuk mengimplementasikan SSR murni di React, kita menggunakan *library* `ReactDOMServer` di sisi server (Node.js) dan `ReactDOM.hydrate` di sisi *client* (browser).

### Proses di Sisi Server (Node.js)
1. **`renderToString`**: Mengubah komponen React menjadi *string* HTML statis. *String* ini kemudian dikirimkan ke *client* sebagai respons awal.
2. **`renderToNodeStream`**: Alternatif dari `renderToString`. Membuat aliran (*stream*) HTML yang bisa dibaca. *Browser* akan menerima dan me-*render* halaman secara bertahap seiring berjalannya aliran data.

### Proses di Sisi Client (Browser)
* **`ReactDOM.hydrate`**: *Browser* menerima HTML statis dari server dan menampilkan konten secara langsung. Kemudian, `hydrate` digunakan untuk "menghidupkan" (*reactivate*) komponen tersebut dengan menempelkan (*attach*) semua *event handlers* (seperti `onClick`) ke elemen HTML yang sudah ada. Proses ini mengubah HTML statis menjadi aplikasi React yang dinamis dan interaktif.

---

## 4. Hal-hal yang Perlu Diperhatikan Saat Hydration
1. **Konsistensi (Mismatch)**: Komponen yang di-*render* di server **harus sama persis** dengan yang di-*render* di sisi *client* saat proses *hydration*. Jika ada perbedaan (misalnya komponen yang menampilkan jam saat ini), React akan mengeluarkan peringatan (*warning*). Developer harus mencari tahu sumber ketidakcocokan tersebut.
2. **Hook `useEffect`**: `useEffect` (dan metode siklus hidup seperti `componentDidMount` di *class component*) **TIDAK** dijalankan di server saat SSR berlangsung. Oleh karena itu, logika pengambilan data (*data fetching*) atau pemuatan proses asinkron lainnya harus ditangani secara terpisah di server sebelum me-*render* komponen, atau ditunda hingga tahap *hydration* selesai di sisi *client*.
