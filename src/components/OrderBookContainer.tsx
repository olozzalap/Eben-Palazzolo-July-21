/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import { jsx, css, Global } from '@emotion/react'
import styled from '@emotion/styled';
import { baseTickerOptions, colors, feedTypes, tickerSizes } from '../helpers/constants';
import FeedContainer from './FeedContainer';
import TopBar from './TopBar';

let renderCount = 1;

const OrderBookContainer = () => {
    console.warn(`
        Render #: ${renderCount}
        `)
    renderCount = renderCount + 1;

    const [feedType, setFeedType] = useState(feedTypes.BTC);
    const [tickerOption, setTickerOption] = useState(baseTickerOptions.sm);

    const tickerSizeFloat = tickerSizes[feedType][tickerOption];
    console.warn(`
        tickerSizeFloat is: ${tickerSizeFloat}
        `)

    return (
        <>
            <TopBar
                feedType={feedType}
                tickerOption={tickerOption}
            />

            <FeedContainer
                setFeedType={setFeedType}
                tickerSizeFloat={tickerSizeFloat}
            />
        </>
    );
};

export default OrderBookContainer;
