import React from 'react';
import { render, screen } from '@testing-library/react';
import TopBar from './TopBar';

test('renders TopBar', () => {
    render(<TopBar
        feedThrottleMs={1000}
        feedType={'btc'}
        levelOption={'med'}
        maxRows={16}
        setFeedThrottleMs={() => {}}
        setLevelOption={() => {}}
        setMaxRows={() => {}}
        socketErrorThrown={''}
        spread={{
            absolute: 16,
            relative: .04,
        }}
    />);
    const titleText = screen.getByText('🌽 COB: Crypto Order Book');
    expect(titleText).toBeInTheDocument();

    const btcText = screen.getByText('₿ BTC');
    expect(btcText).toBeInTheDocument();

    const spreadText = screen.getByText('16.00 (0.040%)');
    expect(spreadText).toBeInTheDocument();

    const groupValueText = screen.getByText('2.50');
    expect(groupValueText).toBeInTheDocument();

    const speedValueText = screen.getByText('30.0s');
    expect(speedValueText).toBeInTheDocument();

    const maxRowsText = screen.getByText('50');
    expect(maxRowsText).toBeInTheDocument();
});

