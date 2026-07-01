import React from 'react';
import styled from 'styled-components';

// Pembuatan komponen styled button (Berdasarkan PDF Hal. 32-33)
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
  
  /* Penerapan JavaScript Template Literals untuk Dynamic Style via Props */
  background: ${props => (props.primary ? 'palevioletred' : 'white')};
  color: ${props => (props.primary ? 'white' : 'palevioletred')};

  &:hover {
    opacity: 0.8;
  }
`;

export function StyledButton() {
  return (
    <div style={{ marginBottom: '20px', padding: '10px', border: '1px dashed #ccc' }}>
      <h4>Contoh Styled Button dengan Props</h4>
      <Button>Normal Button</Button>
      <Button primary>Primary Button</Button>
    </div>
  );
}
