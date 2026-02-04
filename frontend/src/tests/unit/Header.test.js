import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header Component Unit Tests', () => {

  test('should render logo text', () => {
    render(<Header cartCount={0} onCartClick={() => {}} showCart={false} />);
    expect(screen.getByText(/SkinGlow/i)).toBeInTheDocument();
  });

  test('should display correct cart count', () => {
    render(<Header cartCount={5} onCartClick={() => {}} showCart={false} />);
    expect(screen.getByText(/Cart \(5\)/i)).toBeInTheDocument();
  });

  test('should call onCartClick when cart button clicked', () => {
    const mockClick = jest.fn();
    render(<Header cartCount={0} onCartClick={mockClick} showCart={false} />);
    
    const cartButton = screen.getByText(/Cart \(0\)/i);
    fireEvent.click(cartButton);
    
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  test('should render all navigation links', () => {
    render(<Header cartCount={0} onCartClick={() => {}} showCart={false} />);
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Products$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
  });

  test('should handle zero cart count', () => {
    render(<Header cartCount={0} onCartClick={() => {}} showCart={false} />);
    expect(screen.getByText(/Cart \(0\)/i)).toBeInTheDocument();
  });
});
