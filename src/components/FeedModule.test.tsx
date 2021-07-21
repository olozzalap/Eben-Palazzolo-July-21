import React from 'react';
import { render, screen } from '@testing-library/react';
import FeedModule from './FeedModule';

test('renders FeedModule', () => {
    const firstPrice = 31113;
    const secondTotal = 1050;
    render(<FeedModule
        maxTotal={20000}
        rows={[
            {
                price: firstPrice,
                size: 150,
                total: 150,
            },
            {
                price: 31099,
                size: 900,
                total: secondTotal,
            },
        ]}
        type={'bids'}
    />);
    const feedRowCount = screen.getAllByTestId('FeedRow');
    expect(feedRowCount.length).toEqual(2);

    const firstPriceText = screen.getByText(firstPrice.toLocaleString());
    expect(firstPriceText).toBeInTheDocument();

    const secondTotalText = screen.getByText(secondTotal.toLocaleString());
    expect(secondTotalText).toBeInTheDocument();
});
