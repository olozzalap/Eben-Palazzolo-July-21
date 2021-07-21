import React from 'react';
import { render, screen } from '@testing-library/react';
import Spread from './Spread';

test('renders Spread with 18 / .03', () => {
    render(<Spread
        absolute={18}
        relative={0.03}
    />);
    const spreadText = screen.getByText('18.00 (0.030%)');
    expect(spreadText).toBeInTheDocument();
});

test('renders Spread with 4.6 / .11', () => {
    render(<Spread
        absolute={4.6}
        relative={0.11}
    />);
    const spreadText = screen.getByText('4.60 (0.110%)');
    expect(spreadText).toBeInTheDocument();
});

test('renders Spread with 10.9 / .001', () => {
    render(<Spread
        absolute={10.9}
        relative={0.001}
    />);
    const spreadText = screen.getByText('10.90 (0.001%)');
    expect(spreadText).toBeInTheDocument();
});
