# Panduan Instalasi dan Setup Styled Components

Panduan ini berisi langkah-langkah praktis untuk menginisialisasi **styled-components** pada project React (Vite). File-file praktik ada di dalam `playground/src/04-styling/`.

## 1. Instalasi Library

Masuk ke dalam folder project Vite kamu (contohnya `playground`), lalu jalankan perintah instalasi berikut:

```bash
cd playground
npm install styled-components
```

*(Catatan: Jika kamu menggunakan IDE VSCode, sangat direkomendasikan menginstal ekstensi **vscode-styled-components** agar mendapatkan fitur *syntax highlighting* di dalam string backtick CSS).*

---

## 2. Penggunaan Dasar

Buat komponen React biasa, kemudian buat komponen yang di-*style* menggunakan `styled`.

```jsx
// File: src/04-styling/StyledButton.jsx
import React from 'react';
import styled from 'styled-components';

// 1. Buat Styled Component di luar fungsi komponen utama
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  
  /* Menggunakan logika Props untuk Style Dinamis */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  /* Mendukung pseudo-classes */
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export function StyledButtonComponent() {
  return (
    <div>
      {/* 2. Gunakan seperti komponen React biasa */}
      <Button>Normal Button</Button>
      <Button primary>Primary Button</Button>
    </div>
  );
}
```

---

## 3. Teknik Nesting Ala SCSS

Styled-components sangat kuat karena mendukung penulisan hierarki selektor persis seperti SCSS:

```jsx
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: orange;
  color: white;

  /* Menarget tag anak langsung <div> */
  div {
    padding: 10px;
  }

  /* Menarget elemen saudaranya (+) */
  + div {
    background-color: gray;
  }

  /* Menarget diri sendiri (&) jika punya kelas tertentu */
  &.purple {
    background-color: purple;
  }
`;
```
