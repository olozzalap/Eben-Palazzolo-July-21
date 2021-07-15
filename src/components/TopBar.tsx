/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { jsx, css, Global } from '@emotion/react'
import styled from '@emotion/styled';
import { baseTickerOptions, colors, feedTypes, tickerSizes } from '../helpers/constants';


const TopBar = ({
    feedType = feedTypes.BTC,
    tickerOption = baseTickerOptions.sm,
}) => {

    const feedTickerOptions = tickerSizes[feedType];
    const selectedOption = feedTickerOptions[tickerOption];

    return (
        <div css={css`
            display: flex;
            justify-content: between;
            align-items: center;
        `}>
            <h1 css={css`
                font-size: 20px;
                margin: 0;
            `}>
                Z.C.O.B. ZCOB Crypto Order Book
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
            <select
                css={css`
                    background-color: ${colors.gray};
                    border-radius: 3px;
                    padding-left: 30px;
                    &:before {
                        content: 'Group'
                    }
                `}
                value={selectedOption}
            >
                {
                    Object.values(baseTickerOptions).map((baseTickerOption) => (
                        <option value={feedTickerOptions[baseTickerOption]}>{feedTickerOptions[baseTickerOption]}</option>
                    ))
                }
            </select>
        </div>
    );
};

export default TopBar;
