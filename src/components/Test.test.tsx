// src/components/Hello.test.tsx
import { render, screen } from '@testing-library/react';
import Hello from './Test';



describe('Hello Component', () => {
  it('renders the correct text', () => {
    render(<Hello />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
});
