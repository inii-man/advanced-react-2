import React from 'react';
import styled from 'styled-components';

// Pembuatan komponen dengan fitur SCSS/Nesting (Berdasarkan PDF Hal. 35-37)
const SCSSStyledDiv = styled.div`
  padding: 20px;
  background-color: orange;
  color: white;
  margin-bottom: 10px;

  /* Nested selectors */
  div {
    padding: 10px;
    background-color: red;
  }

  /* Sibling selectors */
  + div {
    background-color: gray;
  }

  /* Amperstand (&) untuk self-referencing dengan class */
  &.purple {
    background-color: purple;
  }

  /* Child kombinator untuk warna biru dan hijau sesuai contoh di PDF */
  .blue-sibling {
    background-color: blue;
  }

  .green-grandchild {
    background-color: green;
  }
`;

export function SCSSExample() {
  return (
    <div style={{ marginBottom: '20px', padding: '10px', border: '1px dashed #ccc' }}>
      <h4>Contoh SCSS/Nesting pada Styled Components</h4>

      {/* 1. Parent Biasa */}
      <SCSSStyledDiv>
        first parent elem(orange)
        <div>child(red)</div>
        <div className="blue-sibling">sibling(blue)</div>
        <div className="blue-sibling">
          sibling(blue)
          <div className="green-grandchild">grand child(green)</div>
        </div>
      </SCSSStyledDiv>

      {/* 2. Sibling dari Parent */}
      <SCSSStyledDiv>
        parent elem sibling(gray)
        <div>child(red)</div>
        <div className="blue-sibling">sibling(blue)</div>
        <div className="blue-sibling">
          sibling(blue)
          <div className="green-grandchild">grand child(green)</div>
        </div>
      </SCSSStyledDiv>

      {/* 3. Parent dengan Class tambahan (purple) */}
      <SCSSStyledDiv className="purple">
        parent elem with className(purple)
        <div>child(red)</div>
        <div className="blue-sibling">sibling(blue)</div>
        <div className="blue-sibling">
          sibling(blue)
          <div className="green-grandchild">grand child(green)</div>
        </div>
      </SCSSStyledDiv>
    </div>
  );
}
