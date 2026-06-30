import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// Mensimulasikan API call yang asynchronous
const mockAddPostAPI = async (title) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!title) return reject(new Error("Judul tidak boleh kosong"));
      // Mengembalikan data post baru
      resolve({ id: Date.now(), title, username: 'user1' });
    }, 1000);
  });
};

// createAsyncThunk menerima action type dan callback async
// Secara otomatis meng-generate 3 state lifecycle: pending, fulfilled, rejected
export const addPost = createAsyncThunk('posts/addPost', async (title) => {
  const result = await mockAddPostAPI(title);
  return result; // Data ini akan masuk ke action.payload saat fulfilled
});

const initialState = {
  posts: [
    { id: 1, title: 'Belajar Redux Toolkit', username: 'user1' }
  ],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

// createSlice menggabungkan reducers dan actions menjadi satu objek slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Reducer sinkron (synchronous)
    // Di balik layar menggunakan Immer.js, jadi kita bisa memodifikasi
    // state (mutate) secara langsung namun tetap menjaga immutability.
    updatePost(state, action) {
      const { id, newTitle } = action.payload;
      const existingPost = state.posts.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = newTitle;
      }
    }
  },
  // extraReducers digunakan untuk menangani action dari luar slice,
  // contohnya lifecycle actions dari createAsyncThunk (pending/fulfilled/rejected)
  extraReducers: (builder) => {
    builder
      // Saat Promise dari addPost berstatus pending
      .addCase(addPost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Saat Promise dari addPost berhasil diselesaikan (resolve)
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Menambahkan data baru ke dalam array posts dari payload
        state.posts.push(action.payload);
      })
      // Saat Promise ditolak (reject) karena error
      .addCase(addPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// Mengekstrak dan mengekspor action creator yang otomatis dibuat oleh createSlice
export const { updatePost } = postsSlice.actions;

// Selector sederhana untuk mengambil bagian state tertentu
export const selectAllPosts = (state) => state.posts.posts;
export const selectPostStatus = (state) => state.posts.status;
export const selectPostError = (state) => state.posts.error;

// createSelector: Membuat fungsi selector yang di-memoized
// Hasilnya akan dicache dan hanya dihitung ulang jika nilai inputnya (posts) berubah.
// Berguna untuk perhitungan state yang lebih berat agar performa optimal.
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, username) => username],
  (posts, username) => posts.filter(post => post.username === username)
);

// Mengekspor reducer utama dari slice ini untuk dipakai di configureStore
export default postsSlice.reducer;
