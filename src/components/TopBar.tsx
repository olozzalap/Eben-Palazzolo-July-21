/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { jsx, css, Global } from '@emotion/react'
import styled from '@emotion/styled';
import { baseLevelOptions, colors, feedTypes, levelSizes } from '../helpers/constants';

interface TopBarProps {
  feedType: string,
  setLevelOption: Function,
  levelOption: string,
}

const TopBar = ({
    feedType,
    setLevelOption,
    levelOption,
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
                🌽 C.O.B. Crypto Order Book 🌽
            </h1>
            <div
                className="desktop"
                css={css`
                    color: ${colors.gray};
                `}
            >
                Spread: 
                <span className="mono">17.0 (0.05%)</span>
            </div>
            <div>
                <span>Group:</span>
                <select
                    css={css`
                        background-color: ${colors.gray};
                        border-radius: 3px;
                        color: ${colors.white};
                        cursor: pointer;
                        margin-left: 5px;
                        padding: 5px;
                    `}
                    onChange={handleLevelOptionChange}
                    value={levelOption}
                >
                    {
                        Object.values(baseLevelOptions).map((baseLevelOption) => (
                            <option value={baseLevelOption}>{feedLevelOptions[baseLevelOption]}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
};

export default TopBar;
