# Ringkasan Modul 2: React Testing

Dokumen ini adalah ringkasan dari materi *React Advanced II - Modul 02: React Testing*.

## 1. Konsep Dasar Pengujian (Testing)
Pengujian kode diperlukan untuk memastikan bahwa kode berfungsi seperti yang diharapkan, menemukan di mana *bug* terjadi, dan memastikan refaktorisasi tidak merusak fitur yang sudah ada.

* **White Box Testing**: Pengujian dengan mengetahui logika dan struktur internal komponen.
* **Black Box Testing**: Pengujian berdasarkan fungsionalitas dan interaksi dari luar tanpa mengetahui isi kodenya.

### Jenis Testing Berdasarkan Cakupan (Scope)
1. **Unit Testing**: Menguji potongan kode kecil secara terisolasi (fungsi tunggal atau komponen tunggal).
2. **Integration Testing**: Menguji beberapa komponen atau bagian aplikasi yang digabungkan untuk melihat interaksinya (misalnya interaksi komponen dengan Redux/Router).
3. **End-to-End (E2E) Testing**: Menguji skenario pengguna secara penuh dari awal hingga akhir, seringkali melibatkan *server* dan *database* nyata.

---

## 2. Mengenal Jest
**Jest** adalah *testing framework* populer buatan Facebook. Termasuk di dalamnya adalah *test runner*, *assertion library*, dan *mocking tools*. 

### Fitur Inti Jest
* **Struktur Test**: 
  * `setup`: Mempersiapkan environment (data mock).
  * `expectation`: Menjalankan fungsi/render.
  * `assertion`: Memastikan hasil aktual sesuai harapan (menggunakan `expect`).
* **Assertion Matchers**: Contohnya `.toBe()`, `.toEqual()`, `.toContain()`, `.toMatch()`, `.toThrow()`.
* **Async Assertion**: Mendukung *callback* (`done`), *Promises* (`.resolves`, `.rejects`), dan `async/await`.
* **Mock Functions**: 
  * `jest.fn()` untuk membuat fungsi *mock*.
  * `mockReturnValueOnce()` / `mockResolvedValue()` untuk mengatur *return value*.
  * Assertion mock: `toHaveBeenCalled`, `toHaveBeenCalledWith()`.
* **Lifecycle Functions**: `beforeAll`, `beforeEach`, `afterEach`, `afterAll` untuk mengatur persiapan dan pembersihan lingkungan *test*.
* **Grouping**: Menggunakan fungsi `describe()` untuk mengelompokkan `test()` yang berhubungan.
* **Snapshot Testing**: Menggunakan `.toMatchSnapshot()` atau `.toMatchInlineSnapshot()` untuk menyimpan struktur UI saat ini dan membandingkannya pada pengujian berikutnya untuk mencegah perubahan UI yang tidak disengaja.

---

## 3. React Testing Library (RTL)
Filosofi utama RTL adalah: *"Semakin mirip pengujianmu dengan cara perangkat lunak digunakan, semakin besar kepercayaan yang diberikan pengujian tersebut."*

RTL berfokus pada **User-Centered Testing**, yang berarti kita menguji DOM berdasarkan apa yang dilihat dan diinteraksikan oleh *user*, bukan menguji *state* atau metode internal React.

### Ekstensi: `jest-dom`
RTL menggunakan `@testing-library/jest-dom` untuk memperluas fungsi *assertion* Jest secara spesifik untuk DOM. Contoh:
* `.toBeInTheDocument()`
* `.toHaveValue()`
* `.toBeDisabled()`
* `.toBeVisible()`

### Jenis-Jenis Query RTL
1. **`getBy...`**: Mengembalikan elemen. Melemparkan *error* jika elemen tidak ditemukan atau ada lebih dari satu.
2. **`queryBy...`**: Mirip dengan `getBy`, namun me-*return* `null` jika tidak ditemukan (sangat berguna untuk menguji elemen yang **tidak seharusnya ada** di layar).
3. **`findBy...`**: Mengembalikan *Promise*. Secara asinkron menunggu elemen muncul di DOM (berguna untuk elemen yang muncul setelah API *call* atau *timer*).

*(Varian `getAllBy`, `queryAllBy`, dan `findAllBy` digunakan jika mengharapkan pengembalian array/banyak elemen).*

---

## 4. Query Priority (Prioritas Pencarian Elemen)
Untuk menjaga agar pengujian tetap berpusat pada pengguna dan aksesibilitas, RTL merekomendasikan prioritas berikut saat memilih fungsi query:

1. **`getByRole` (Prioritas Utama)**: Mencari berdasarkan *Accessibility Tree* (seperti yang dibaca oleh *Screen Reader*). Contoh: `getByRole('button', { name: 'Submit' })`.
2. **Pencarian Teks yang Dilihat Pengguna**:
   * `getByLabelText` (biasanya untuk *input*)
   * `getByPlaceholderText`
   * `getByText`
   * `getByDisplayValue`
3. **Pencarian Atribut Semantik**: `getByAltText` (untuk gambar), `getByTitle`.
4. **`getByTestId` (Prioritas Terendah)**: Mencari elemen dengan atribut khusus `data-testid="xxx"`. Digunakan hanya jika metode lain tidak memungkinkan karena *user* tidak dapat melihat atribut ini.

---

## 5. User Events
RTL menyediakan library pendamping **`@testing-library/user-event`** yang mensimulasikan kejadian pengguna yang sangat realistis (melampaui event standar `fireEvent`).

### Fungsi-fungsi penting:
* **`userEvent.click(element)`**: Mengklik elemen (termasuk mendukung modifier seperti `{ shiftKey: true }`).
* **`userEvent.type(element, "text")`**: Mengetik ke dalam kolom *input*. Bisa juga menambahkan kombinasi *keyboard* (misal: `"text{enter}"`).
* **`userEvent.clear(element)`**: Menghapus seluruh isi input.
