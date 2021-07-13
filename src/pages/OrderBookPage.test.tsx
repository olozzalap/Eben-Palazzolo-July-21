import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderBookPage from './OrderBookPage';

test('renders Kitten Picture', () => {
    render(<OrderBookPage />);
    const kittenPic = screen.getByTestId(/kitten-pic/i);

    expect(kittenPic).toBeInTheDocument();
});
