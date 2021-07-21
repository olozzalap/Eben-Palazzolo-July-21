/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import { jsx, css, Global } from '@emotion/react'
import styled from '@emotion/styled';
import { baseLevelOptions, colors, feedTypes, levelSizes, spreadType } from '../helpers/constants';
import BottomBar from './BottomBar';
import FeedContainer from './FeedContainer';
import TopBar from './TopBar';


const OrderBookContainer = () => {
    const [feedType, setFeedType] = useState<string>(feedTypes.BTC);
    const [levelOption, setLevelOption] = useState<string>(baseLevelOptions.sm);
    const [socketErrorThrown, setSocketErrorThrown] = useState<string>('');
    const [inErrorState, setInErrorState] = useState<boolean>(false);
    const [spread, setSpread] = useState<spreadType>({ absolute: 0, relative: 0 });

    const levelSizeFloat = levelSizes[feedType][levelOption];

    console.warn(`
        feedType is: ${feedType}
        levelOption is: ${levelOption}
        `)

    return (
        <>
            <TopBar
                feedType={feedType}
                levelOption={levelOption}
                setLevelOption={setLevelOption}
                socketErrorThrown={socketErrorThrown}
                spread={spread}
            />

            <FeedContainer
                feedType={feedType}
                inErrorState={inErrorState}
                levelSizeFloat={levelSizeFloat}
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
