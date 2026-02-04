import { render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import axios from 'axios';

jest.mock('axios');

describe('App Component Integration Tests', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders SkinGlow header and hero section', async () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('SkinGlow', { selector: '.logo' })).toBeInTheDocument();
      expect(screen.getByText(/Glow Naturally/i)).toBeInTheDocument();
    });
  });

  test('displays loading state initially', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<App />);
    expect(screen.getByText(/Loading products/i)).toBeInTheDocument();
  });

  test('fetches and displays products from API', async () => {
    const mockProducts = [
      { id: 1, name: 'Vitamin C Serum', price: 1500, letter: 'V', description: 'Brightening serum' },
      { id: 2, name: 'Hyaluronic Acid', price: 1200, letter: 'H', description: 'Hydrating serum' }
    ];
    
    axios.get.mockResolvedValue({ data: mockProducts });
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Vitamin C Serum')).toBeInTheDocument();
      expect(screen.getByText('Hyaluronic Acid')).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to load products/i)).toBeInTheDocument();
    });
  });

  test('renders contact form', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<App />);
    expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your Email/i)).toBeInTheDocument();
  });

  test('initially has empty cart', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<App />);
    expect(screen.getByText(/Cart \(0\)/i)).toBeInTheDocument();
  });
});
