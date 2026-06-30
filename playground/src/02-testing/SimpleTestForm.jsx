import React, { useRef } from 'react';

// Form sederhana untuk tujuan pengujian (seperti di PDF Hal. 60)
export function SimpleTestForm() {
  const formRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.reset(); // Mereset isi form setelah submit
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} data-testid="test-form">
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="username" style={{ marginRight: '10px' }}>Username</label>
        <input 
          id="username" 
          type="text" 
          name="username" 
          placeholder="Ketik username..."
          data-testid="username-input"
          style={{ padding: '5px' }}
        />
      </div>
      <button type="submit" data-testid="submit-button" style={{ padding: '8px' }}>
        Submit
      </button>
    </form>
  );
}
