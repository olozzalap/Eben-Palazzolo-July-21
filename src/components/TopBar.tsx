/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { jsx, css, Global } from '@emotion/react'
import styled from '@emotion/styled';
import { baseLevelOptions, colors, feedThrottleMsOptions, feedTypes, isMobile, levelSizes, maxRowsOptions, spreadType } from '../helpers/constants';
import Spread from './Spread';

type TopBarProps = {
    feedThrottleMs: number,
    feedType: string,
    levelOption: string,
    maxRows: number,
    setFeedThrottleMs: Function,
    setLevelOption: Function,
    setMaxRows: Function,
    socketErrorThrown: string,
    spread: spreadType,
};

const TopBar = ({
    feedThrottleMs,
    feedType,
    levelOption,
    maxRows,
    setFeedThrottleMs,
    setLevelOption,
    setMaxRows,
    socketErrorThrown,
    spread,
}: TopBarProps) => {

    const handleLevelOptionChange = (e: any) => {
        setLevelOption(e?.target?.value)
    };

    const handleFeedThrottleMsChange = (e: any) => {
        setFeedThrottleMs(e?.target?.value)
    };

    const handleMaxRowsChange = (e: any) => {
        setMaxRows(e?.target?.value)
    };

    const feedLevelOptions = levelSizes[feedType];

    return (
        <div css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 6px 6px;

            ${isMobile ? `
                flex-wrap: wrap;
            ` : ''}
        `}>
            <h1 css={css`
                font-size: 20px;
                margin: 0;
            `}>
                🌽 COB: Crypto Order Book | {feedType === feedTypes.BTC ? '₿ BTC' : 'Ξ ETH'}
            </h1>
            {socketErrorThrown ? null : (
                <div className="desktop">
                    <Spread
                        absolute={spread.absolute}
                        relative={spread.relative}
                    />
                </div>
            )}
            <div css={css`
                display: flex;
                justify-content: space-around;
                align-items: center;
                ${isMobile ? `
                    width: 100%;
                ` : ''}
                select {
                    background-color: ${colors.slate};
                    border-radius: 3px;
                    color: ${colors.white};
                    cursor: pointer;
                    margin-left: 3px;
                    padding: 4px;
                }
            `}>
                <div>
                    <span>Group:</span>
                    <select
                        onChange={handleLevelOptionChange}
                        value={levelOption}
                    >
                        {
                            Object.values(baseLevelOptions).map((baseLevelOption) => (
                                <option
                                    key={baseLevelOption}
                                    value={baseLevelOption}
                                >
                                    {feedLevelOptions[baseLevelOption].toFixed(2)}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div css={css`
                    margin: 0 12px;
                `}>
                    <span>Speed:</span>
                    <select
                        onChange={handleFeedThrottleMsChange}
                        value={feedThrottleMs}
                    >
                        {
                            Object.values(feedThrottleMsOptions).map((feedThrottleMsOption) => (
                                <option
                                    key={feedThrottleMsOption}
                                    value={feedThrottleMsOption}
                                >
                                    {(feedThrottleMsOption / 1000).toFixed(1)}s
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <span># Rows:</span>
                    <select
                        onChange={handleMaxRowsChange}
                        value={maxRows}
                    >
                        {
                            Object.values(maxRowsOptions).map((maxRowOption) => (
                                <option
                                    key={maxRowOption}
                                    value={maxRowOption}
                                >
                                    {maxRowOption}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
