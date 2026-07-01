import React from 'react';
import { StyledButton } from './StyledButton';
import { SCSSExample } from './SCSSExample';

export function StylingApp() {
  return (
    <div>
      <h2>Modul 4: React Styling & Styled Components</h2>
      <p>
        Bagian ini mendemonstrasikan implementasi <strong>CSS-in-JS</strong> menggunakan 
        <code>styled-components</code>. Pendekatan ini memungkinkan *styling* berbasis komponen
        dengan fitur-fitur tangguh seperti SCSS nesting dan dinamis berdasarkan *props*.
      </p>

      {/* Render komponen-komponen pembelajaran */}
      <StyledButton />
      <SCSSExample />
      
    </div>
  );
}
