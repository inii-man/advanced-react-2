# Panduan Instalasi dan Setup Redux

Panduan ini berisi langkah-langkah praktis untuk menginisialisasi **Redux Toolkit** dan **React Redux** pada project React (Vite). File-file ini mengacu pada kode yang sudah terimplementasi di direktori `playground/src/01-redux/`.

## 1. Instalasi Library

Masuk ke dalam folder project Vite kamu (contohnya `playground`), lalu jalankan perintah instalasi berikut:

```bash
# Masuk ke folder aplikasi react
cd playground

# Install Redux Toolkit dan React Redux
npm install @reduxjs/toolkit react-redux
```

* `@reduxjs/toolkit` berisi seluruh *core* logic dari Redux masa kini.
* `react-redux` berfungsi sebagai jembatan agar React bisa membaca dan berinteraksi dengan state Redux.

---

## 2. Membuat Redux Slice
Tahap pertama adalah mendefinisikan *state*, fungsi sinkron (reducer biasa), dan fungsi asinkron (thunk) pada satu file. Buat file bernama `postsSlice.js`:

```jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Definisikan aksi asinkron (contoh: Memanggil API)
export const addPost = createAsyncThunk('posts/addPost', async (title) => {
  // Simulasi pemanggilan API
  return { id: Date.now(), title }; 
});

// 2. Buat Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle', 
  },
  reducers: {
    // Aksi sinkron (Sync Action)
    updatePost(state, action) {
       // state bisa langsung di-"mutate" berkat Immer.js
       const existingPost = state.posts.find(p => p.id === action.payload.id);
       if(existingPost) existingPost.title = action.payload.newTitle;
    }
  },
  // Menangani state asinkron dari createAsyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => { state.status = 'loading' })
      .addCase(addPost.fulfilled, (state, action) => { 
        state.status = 'succeeded';
        state.posts.push(action.payload); // Tambah data dari API ke state
      })
  }
});

// 3. Export Action dan Reducer
export const { updatePost } = postsSlice.actions;
export default postsSlice.reducer;
```

---

## 3. Membuat Config Store
Langkah selanjutnya adalah menyatukan reducer yang telah dibuat pada `postsSlice.js` ke dalam Store utama Redux. Buat file `store.js`:

```jsx
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice'; // Impor dari file slice

export const store = configureStore({
  reducer: {
    // Tentukan "nama key" state dan sambungkan dengan reducernya
    posts: postsReducer
  }
});
```

---

## 4. Membungkus Aplikasi dengan Provider
Agar komponen-komponen React tahu letak dari "Store" Redux, aplikasi React harus dibungkus oleh komponen `<Provider>` milik `react-redux`. Kamu bisa menaruh ini di level *entry point* (misal: `main.jsx` atau `App.jsx`).

```jsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store'; // Impor store yang tadi dibuat

import MyComponent from './MyComponent';

export default function App() {
  return (
    <Provider store={store}>
       {/* Semua komponen di dalam sini sudah bisa mengakses Redux */}
       <MyComponent />
    </Provider>
  )
}
```

---

## 5. Menggunakan Redux di dalam Komponen
Terakhir, gunakan `useSelector` untuk membaca data, dan `useDispatch` untuk mengubah data.

```jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, updatePost } from './postsSlice'; // Impor aksi

export default function MyComponent() {
  const dispatch = useDispatch();
  // Mengambil state dari Redux (state.posts adalah key yang didaftarkan di store.js)
  const posts = useSelector(state => state.posts.posts); 
  const status = useSelector(state => state.posts.status);

  const [input, setInput] = useState('');

  return (
    <div>
      {status === 'loading' && <p>Menyimpan data...</p>}
      
      <ul>
        {posts.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
      
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      
      {/* Mengirim Action asinkron */}
      <button onClick={() => dispatch(addPost(input))}>
        Tambah Post
      </button>

      {/* Mengirim Action sinkron */}
      <button onClick={() => dispatch(updatePost({ id: 1, newTitle: 'Judul Baru' }))}>
        Update Post ID 1
      </button>
    </div>
  )
}
```

Selamat! Kamu sudah mengkonfigurasi Redux Toolkit di React App menggunakan Vite.
