/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import { jsx, css, Global } from '@emotion/react'
import styled from '@emotion/styled';
import { baseLevelOptions, colors, feedTypes, levelSizes } from '../helpers/constants';
import BottomBar from './BottomBar';
import FeedContainer from './FeedContainer';
import TopBar from './TopBar';

let renderCount = 1;

const OrderBookContainer = () => {
    console.warn(`
        OrderBookContainer Render #: ${renderCount}
        `)
    renderCount = renderCount + 1;

    const [feedType, setFeedType] = useState<string>(feedTypes.BTC);
    const [levelOption, setLevelOption] = useState<string>(baseLevelOptions.sm);

    const levelSizeFloat = levelSizes[feedType][levelOption];

    console.warn(`
        levelOption is: ${levelOption}
        `)

    return (
        <>
            <TopBar
                feedType={feedType}
                setLevelOption={setLevelOption}
                levelOption={levelOption}
            />

            <FeedContainer
                feedType={feedType}
                levelSizeFloat={levelSizeFloat}
            />

            <BottomBar
                killFeed={killFeed}
                setFeedType={setFeedType}
            />
        </>
    );
};

export default OrderBookContainer;
