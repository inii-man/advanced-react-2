import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SimpleTestForm } from './SimpleTestForm';

// describe() digunakan untuk grouping test (Hal. 24 & 43)
describe('SimpleTestForm Component', () => {
  
  // 1. Snapshot Testing (Hal. 25 & 45)
  // Menyimpan struktur output komponen saat ini, 
  // akan error jika di kemudian hari UI berubah tanpa disengaja
  test('Snapshot test form', () => {
    const { container } = render(<SimpleTestForm />);
    expect(container.firstChild).toMatchSnapshot();
  });

  // 2. Query Priority & User Events (Hal. 61)
  test('clears the Username input when the Submit button is clicked (Using getByRole)', async () => {
    // Setup (Hal. 10)
    render(<SimpleTestForm />);
    const user = userEvent.setup(); // Setup user event terbaru
    
    // Menggunakan getByRole (Query Prioritas Tertinggi) (Hal. 58-59)
    const usernameInput = screen.getByRole('textbox', { name: /username/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Expectation: Mengetik sesuatu
    await user.type(usernameInput, 'test username');
    
    // Assertion (Hal. 20) menggunakan jest-dom (Hal. 55)
    expect(usernameInput).toHaveValue('test username');
    
    // Expectation: Menekan tombol submit
    await user.click(submitButton);

    // Assertion: Input kembali kosong karena form direset (Hal. 61)
    expect(usernameInput).toHaveValue('');
  });

  // 3. Menggunakan testid sebagai fallback (Hal. 65-66)
  test('Find elements using data-testid (Low Priority Query)', async () => {
    render(<SimpleTestForm />);
    const user = userEvent.setup();
    
    // Menggunakan getByTestId jika Role / Semantik tidak ada
    const usernameInput = screen.getByTestId('username-input');
    const submitButton = screen.getByTestId('submit-button');

    await user.type(usernameInput, 'test username');
    await user.click(submitButton);

    expect(usernameInput).toHaveValue('');
  });
});
