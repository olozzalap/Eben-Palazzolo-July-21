/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { jsx, css, Global } from '@emotion/react'
import styled from '@emotion/styled';
import { baseLevelOptions, colors, feedTypes, levelSizes, spreadType } from '../helpers/constants';
import Spread from './Spread';

interface TopBarProps {
  feedType: string,
  levelOption: string,
  setLevelOption: Function,
  socketErrorThrown: string,
  spread: spreadType,
}

const TopBar = ({
    feedType,
    setLevelOption,
    levelOption,
    socketErrorThrown,
    spread,
}: TopBarProps) => {

    const handleLevelOptionChange = (e: any) => {
        setLevelOption(e?.target?.value)
    };

    const feedLevelOptions = levelSizes[feedType];

    return (
        <div css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
        `}>
            <h1 css={css`
                font-size: 20px;
                margin: 0;
            `}>
                🌽 COB: Crypto Order Book 🌽
            </h1>
            {socketErrorThrown ? null : (
                <div className="desktop">
                    <Spread
                        absolute={spread.absolute}
                        relative={spread.relative}
                    />
                </div>
            )}
            <div>
                <span>Group:</span>
                <select
                    css={css`
                        background-color: ${colors.slate};
                        border-radius: 3px;
                        color: ${colors.white};
                        cursor: pointer;
                        margin-left: 3px;
                        padding: 4px;
                    `}
                    onChange={handleLevelOptionChange}
                    value={levelOption}
                >
                    {
                        Object.values(baseLevelOptions).map((baseLevelOption) => (
                            <option value={baseLevelOption}>{feedLevelOptions[baseLevelOption].toFixed(2)}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
};

export default TopBar;
