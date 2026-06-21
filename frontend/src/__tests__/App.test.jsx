import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Simple rendering test for App component
describe('App Component', () => {
  it('renders without crashing', () => {
    // In a real environment, you might need to wrap with appropriate Providers if they aren't inside App
    // But since App contains Router and we test at least the initial load
    render(<App />);
    
    // Test if a core element exists, e.g., the Login link or TaskPro brand
    expect(screen.getByText(/TaskPro/i)).toBeInTheDocument();
  });
});
