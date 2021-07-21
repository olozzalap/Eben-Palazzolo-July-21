import React from 'react';
import { render, screen } from '@testing-library/react';
import { feedTypes } from '../helpers/constants';
import BottomBar from './BottomBar';

test('renders BottomBar', () => {
    render(<BottomBar
        feedType={feedTypes.BTC}
        toggleInErrorState={() => {}}
        setFeedType={() => {}}
    />);
    const toggleFeedText = screen.getByText('Toggle Feed');
    expect(toggleFeedText).toBeInTheDocument();
    const killFeedText = screen.getByText('Kill Feed');
    expect(killFeedText).toBeInTheDocument();
});
