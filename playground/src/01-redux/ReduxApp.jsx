import React from 'react';
// Provider digunakan untuk menghubungkan keseluruhan (atau sebagian) React App ke Redux Store
import { Provider } from 'react-redux';
import { store } from './store';
import { PostManager } from './PostManager';

// Komponen utama untuk pembahasan Redux
export function ReduxApp() {
  return (
    // Semua komponen anak di dalam Provider sekarang bisa mengakses
    // store Redux menggunakan hooks useSelector dan useDispatch
    <Provider store={store}>
      <div>
        <h2>Modul 1: State Management using Redux</h2>
        <p>
          Contoh implementasi ini merangkum seluruh materi dari modul Redux:
        </p>
        <ul>
          <li><strong>Redux Toolkit:</strong> Menggunakan <code>configureStore</code>, <code>createSlice</code>, dan <code>createAsyncThunk</code>.</li>
          <li><strong>React Redux:</strong> Menggunakan <code>Provider</code>, <code>useSelector</code>, dan <code>useDispatch</code>.</li>
          <li><strong>Immutability & Async:</strong> Manajemen *state* sinkron dengan Immer.js dan *asynchronous processing* dengan Thunk.</li>
        </ul>
        
        <hr style={{ margin: '20px 0' }} />
        
        <PostManager />
      </div>
    </Provider>
  );
}
