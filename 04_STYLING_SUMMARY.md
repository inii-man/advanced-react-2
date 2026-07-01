# Ringkasan Modul 4: React Styling & Styled Components

Dokumen ini adalah ringkasan dari materi PDF *Learning by creating React UI*.

## 1. Pendahuluan Metodologi React Styling

Ada berbagai macam pendekatan untuk memberikan *style* pada aplikasi React:

1. **CSS Modules**:
   * Menghasilkan nama kelas dan id yang unik (diacak) sehingga mencegah terjadinya *overlap* atau konflik selektor.
   * *Style* dibatasi (scoped) secara lokal hanya untuk modul atau komponen terkait.
   * Contoh sintaks: `import styles from "./app.module.css";` lalu digunakan dengan `className={styles.title}`.

2. **UI Frameworks (misal: Ant Design, Material UI)**:
   * Menyediakan komponen siap pakai yang sudah matang dan fungsional.
   * Kelemahan: Kurang direkomendasikan untuk pemula yang ingin belajar fundamental CSS karena sulit dikustomisasi dan memiliki aturan desain yang kaku.

3. **CSS Frameworks (misal: Tailwind CSS, W3.CSS)**:
   * Menggunakan metodologi *utility-first* di mana pengembang menggunakan class bawaan untuk memberikan *style* tanpa perlu banyak menulis CSS kustom.
   * Cocok untuk mem-build UI secara cepat.

4. **CSS-In-JS Library (misal: Styled Components, Emotion)**:
   * Menggabungkan CSS langsung ke dalam JavaScript/JSX menggunakan **Tagged Template Literals**.
   * Memungkinkan pengaturan *style* secara dinamis melalui pengiriman atribut (`props`).
   * Menghasilkan nama kelas unik secara otomatis untuk mencegah bentrok nama.
   * Menjadikan komponen lebih mudah digunakan kembali (*reusable*).

---

## 2. JavaScript Template Literals
Konsep krusial di balik *Styled Components* adalah **Template Literals** JavaScript bawaan:
* String yang menggunakan karakter *backtick* (\`).
* Memungkinkan penyisipan (embedding) ekspresi JS langsung ke dalam *string* menggunakan `${...}`.
* Bekerja untuk tipe data *string*, *number*, *boolean*, objek, dan fungsi kompleks seperti *Ternary Operator*.

### Tagged Templates
Adalah fungsi yang dipanggil menggunakan sintaks template literal tanpa tanda kurung `()`. Inilah yang digunakan oleh *Styled Components* (contoh: `styled.div\``).

```javascript
function myTag(strings, ...expressions) {
  // manipulasi teks
}
const output = myTag`Halo ${nama}`; 
```

---

## 3. Fundamental Styled Components

### A. Tag Example (Membuat Elemen)
Kita bisa membuat elemen React biasa (seperti `<button>`) yang sudah dibekali *style* khusus:

```javascript
const Button = styled.button`
  background: palevioletred;
  border-radius: 3px;
  color: white;
`;
// Menggunakannya seperti komponen biasa: <Button>Klik</Button>
```

### B. Props Example (Style Dinamis)
Keunggulan utama *Styled Components* adalah memanipulasi CSS menggunakan `props` komponen React.

```javascript
const Button = styled.button`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
`;
// Penggunaan: 
// <Button>Biasa</Button>
// <Button primary>Tombol Utama</Button>
```

### C. SCSS / Nesting
*Styled Components* mendukung fitur gaya penulisan SCSS:
* Menghindari repetisi selektor menggunakan teknik *nesting*.
* Mendukung tanda `&` untuk merujuk pada elemen itu sendiri (misalnya `&:hover` atau `&.active`).
* Mendukung penyeleksian anak langsung (`> div`) maupun elemen di sebelahnya (`+ div`).
