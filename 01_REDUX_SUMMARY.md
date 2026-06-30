# Ringkasan Modul 1: State Management using Redux

Dokumen ini adalah ringkasan dari materi *React Advanced II - Modul 01: State Management using Redux*.

## 1. Pengenalan Redux
Redux adalah *library* yang didesain untuk memanajemen seluruh *state* dari sebuah aplikasi dengan mudah. Redux meminjam banyak konsep dari pola **Flux** dan umumnya digunakan bersama dengan aplikasi React.

### Kapan Redux Harus Digunakan?
* Saat perlu memanajemen keseluruhan *state* dari aplikasi (skala menengah - besar).
* Saat pemrosesan asinkron (seperti pemanggilan API) semakin kompleks dan membutuhkan *state management* yang terstruktur.
* Saat *state* aplikasi menjadi terlalu rumit.
* Saat berkolaborasi dengan banyak *developer* sehingga dibutuhkan standar *state management* yang konsisten.
* Saat membutuhkan *tools* seperti *logger* dan *devtools* untuk memonitor perubahan *state*.

### Core Principles (Prinsip Utama)
1. **Single Source of Truth**: Seluruh *state* aplikasi disimpan di dalam satu *store* utama.
2. **Immutability**: *State* bersifat *read-only*. Untuk merubahnya, kita tidak boleh memodifikasi objek aslinya, melainkan harus membuat objek *state* baru.
3. **Pure Functions**: Perubahan *state* ditangani oleh fungsi murni bernama *reducers* yang tidak memiliki efek samping (*side effects*).

---

## 2. Struktur Redux & Konsep Inti

* **Action**: Sebuah objek JavaScript yang merepresentasikan perubahan *state*. Biasanya memiliki properti `type` (wajib) dan `payload` (opsional).
* **Action Creator**: Sebuah fungsi yang me-*return* objek Action. Berguna untuk meningkatkan *reusability* (penggunaan ulang) dan fleksibilitas.
* **Store**: Tempat di mana seluruh *state* aplikasi disimpan.
* **Reducer**: Fungsi murni bertipe `(state, action) => newState` yang menerima *Action* dan membuat *State* baru berdasarkan aksi tersebut tanpa mengubah *state* sebelumnya secara langsung.
* **Dispatch**: Fungsi untuk mengirimkan *Action* ke dalam Redux *Store* (sehingga bisa diproses oleh *reducer*).
* **Selector**: Fungsi yang digunakan untuk mengambil bagian spesifik dari *state* di dalam Redux *Store*.

Redux juga mendukung:
* **Middleware**: Menghadang *action* setelah di-*dispatch* namun sebelum sampai ke *reducer*. Biasanya digunakan untuk logika asinkron (*redux-thunk*) atau *logging* (*redux-logger*).
* **Enhancer**: Membungkus *store* untuk memodifikasi bagaimana *action* diproses, contohnya adalah ekstensi *Redux DevTools*.

---

## 3. Redux Toolkit Utilization
**Redux Toolkit (RTK)** adalah *library* pendamping resmi yang sangat direkomendasikan karena menghilangkan sebagian besar *boilerplate* kode Redux dan sudah memaketkan fungsi-fungsi berguna seperti *Immer.js*, *redux-thunk*, dan *reselect*.

API Penting pada RTK:
* `configureStore`: Pengganti `createStore`. Otomatis menggabungkan *reducers* dan mengaplikasikan *middleware* dasar.
* `createAction`: Mempermudah pembuatan *action creator*.
* `createReducer`: Membantu membuat *reducer*. Berkat *Immer.js*, kita bisa menulis kode seolah-olah me-*mutate* *state* secara langsung.
* `createSlice`: API *all-in-one* yang menggabungkan pembuatan *action creators* dan *reducers* dalam satu objek (*slice*). Sangat mengurangi kode repetitif.
* `createSelector`: Untuk membuat *memoized selector*. Hanya akan mengkalkulasi ulang data jika input datanya berubah, sehingga lebih hemat performa.

---

## 4. Menghubungkan Redux dengan React
Untuk mengintegrasikan Redux dengan komponen-komponen React, kita menggunakan *library* **`react-redux`**.

API Penting pada `react-redux`:
* **`Provider`**: Komponen pembungkus (*wrapper*) pada akar aplikasi (*root*) agar semua komponen anak dapat mengakses Redux *Store*.
* **`useDispatch`**: *Hook* untuk mendapatkan fungsi *dispatch* dari Redux agar kita dapat memicu *action* (misal: saat tombol diklik).
* **`useSelector`**: *Hook* untuk membaca dan berlangganan ke bagian spesifik dari *state* Redux. Fungsi ini murni dan tidak memodifikasi *state*.

---

## 5. Menangani Asynchronous Operations di Redux
Untuk menangani proses asinkron (seperti memanggil API), kita harus menggunakan *middleware* bernama **`redux-thunk`** (sudah termasuk secara default di Redux Toolkit).

### API: `createAsyncThunk`
Berfungsi untuk membuat aksi asinkron. Fungsi ini menerima *action type* (string) dan sebuah *async callback*. Saat dijalankan, `createAsyncThunk` secara otomatis menghasilkan **tiga (3) lifecycle actions**:
1. `{actionType}.pending`: Saat *Promise* sedang berjalan.
2. `{actionType}.fulfilled`: Saat *Promise* selesai/sukses. Datanya akan tersimpan di `action.payload`.
3. `{actionType}.rejected`: Saat *Promise* gagal. Detail kesalahannya tersimpan di `action.error`.

Ketiga aksi otomatis tersebut ditangkap di dalam `extraReducers` pada `createSlice` menggunakan sintaks `builder.addCase()`.

### Continuous & Concurrent Asynchronous Processing
* **Berurutan (Continuous)**: Karena pemanggilan fungsi *thunk* akan mengembalikan *Promise*, kita bisa menggunakan sintaks `.then()` untuk menyambung (chaining) aksi asinkron lain secara berurutan.
* **Bersamaan (Concurrent)**: Kita bisa menggunakan `Promise.all([dispatch(actionA()), dispatch(actionB())])` untuk memproses banyak aksi asinkron secara berbarengan.
