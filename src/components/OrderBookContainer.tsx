/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import { jsx, css, Global } from '@emotion/react'
import styled from '@emotion/styled';
import { baseLevelOptions, colors, feedThrottleMsOptions, feedTypes, isMobile, levelSizes, maxRowsOptions, spreadType } from '../helpers/constants';
import BottomBar from './BottomBar';
import FeedContainer from './FeedContainer';
import TopBar from './TopBar';


const OrderBookContainer = () => {
    const [feedType, setFeedType] = useState<string>(feedTypes.BTC);
    const [levelOption, setLevelOption] = useState<string>(baseLevelOptions.med);
    const [socketErrorThrown, setSocketErrorThrown] = useState<string>('');
    const [inErrorState, setInErrorState] = useState<boolean>(false);
    const [spread, setSpread] = useState<spreadType>({ absolute: 0, relative: 0 });
    const [feedThrottleMs, setFeedThrottleMs] = useState<number>(feedThrottleMsOptions[2]);
    const [maxRows, setMaxRows] = useState<number>(maxRowsOptions[isMobile ? 1 : 6]);

    const levelSizeFloat = levelSizes[feedType][levelOption];

    console.warn(`
        feedType is: ${feedType}
        levelOption is: ${levelOption}
        `)

    return (
        <>
            <TopBar
                feedThrottleMs={feedThrottleMs}
                feedType={feedType}
                levelOption={levelOption}
                maxRows={maxRows}
                setFeedThrottleMs={setFeedThrottleMs}
                setLevelOption={setLevelOption}
                setMaxRows={setMaxRows}
                socketErrorThrown={socketErrorThrown}
                spread={spread}
            />

            <FeedContainer
                feedThrottleMs={feedThrottleMs}
                feedType={feedType}
                inErrorState={inErrorState}
                levelSizeFloat={levelSizeFloat}
                maxRows={maxRows}
                setSocketErrorThrown={setSocketErrorThrown}
                setSpread={setSpread}
                socketErrorThrown={socketErrorThrown}
            />

            <BottomBar
                feedType={feedType}
                setFeedType={setFeedType}
                toggleInErrorState={() => setInErrorState(!inErrorState) }
            />
        </>
    );
};

export default OrderBookContainer;
