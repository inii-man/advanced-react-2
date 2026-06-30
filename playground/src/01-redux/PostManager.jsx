import React, { useState } from 'react';
// useDispatch dan useSelector dari react-redux untuk mengakses store dalam komponen
import { useDispatch, useSelector } from 'react-redux';
import { 
  addPost, 
  updatePost, 
  selectAllPosts, 
  selectPostStatus,
  selectPostError 
} from './postsSlice';

export function PostManager() {
  // Mendapatkan fungsi dispatch untuk memicu state update (kirim Action ke Redux)
  const dispatch = useDispatch();
  
  // Mengambil state menggunakan hooks useSelector dan fungsi selector
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectPostStatus);
  const error = useSelector(selectPostError);
  
  const [newTitle, setNewTitle] = useState('');

  const handleAddPost = () => {
    // Concurrent Asynchronous Processing menggunakan Promise (opsional)
    // Walau di sini hanya satu addPost, fungsi thunk akan mereturn Promise,
    // yang bisa di ".then()" atau diletakkan dalam Promise.all([]) bila butuh banyak eksekusi.
    dispatch(addPost(newTitle)).then(() => {
        // Membersihkan form setelah proses selesai (baik gagal atau sukses)
        setNewTitle(''); 
    });
  };

  const handleUpdateFirstPost = () => {
    if (posts.length > 0) {
      // Mendispatch synchronous action
      // Action otomatis sampai ke reducer melewati middleware tanpa masalah async
      dispatch(updatePost({ id: posts[0].id, newTitle: 'Judul Ter-update! (Sync)' }));
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fafafa' }}>
      <h3>Daftar Post (Diambil dengan useSelector)</h3>
      
      {/* Indikator status loading saat asynchronous action sedang pending */}
      {status === 'loading' && <p style={{ color: 'blue' }}>Sedang menyimpan ke server...</p>}
      
      {/* Menampilkan pesan error jika asynchronous action rejected */}
      {status === 'failed' && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong> (oleh: {post.username})
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '20px' }}>
        <h4>Aksi menggunakan useDispatch</h4>
        
        <input 
          type="text" 
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)} 
          placeholder="Judul post baru"
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
        <button 
          onClick={handleAddPost} 
          disabled={status === 'loading'}
          style={{ padding: '8px' }}
        >
          Tambah Post (Async Thunk)
        </button>
      </div>

      <div style={{ marginTop: '10px' }}>
        <button onClick={handleUpdateFirstPost} style={{ padding: '8px' }}>
          Update Post Pertama (Sync Action)
        </button>
      </div>
    </div>
  );
}
