import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorModule from './ErrorModule';

test('renders ErrorModule with no socketErrorThrown', () => {
    render(<ErrorModule
        socketErrorThrown=""
    />);
    const socketErrorThrownText = screen.getByText('Message is:');
    expect(socketErrorThrownText).toBeInTheDocument();
});

test('renders ErrorModule with default socketErrorThrown', () => {
    render(<ErrorModule
        socketErrorThrown="api failure"
    />);
    const socketErrorThrownText = screen.getByText('api failure');
    expect(socketErrorThrownText).toBeInTheDocument();
});

test('renders ErrorModule with random socketErrorThrown', () => {
    const randomString = '7gadf7a8wgds87awdad';
    render(<ErrorModule
        socketErrorThrown={randomString}
    />);
    const socketErrorThrownText = screen.getByText(randomString);
    expect(socketErrorThrownText).toBeInTheDocument();
});
