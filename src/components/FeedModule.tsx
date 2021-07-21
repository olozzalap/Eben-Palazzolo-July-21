/** @jsxImportSource @emotion/react */
import React from 'react';
import { jsx, css } from '@emotion/react'
import { colors, orderLevelType } from '../helpers/constants';


interface FeedModuleProps {
    maxTotal: number,
    rows: Array<orderLevelType>,
    type: string,// 'bids' or 'asks'
}

const FeedModule = ({
    maxTotal,
    rows,
    type,
}: FeedModuleProps) => (
    <div
        className="FeedModule"
        css={css`
            .FeedHeader, .FeedRow {
                display: flex;
                justify-content: space-around;
                width: 100%;
            }

            .FeedHeader {
                color: ${colors.gray};
            }

            .FeedRow {
                position: relative;

                .depth {
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    background-color: ${type === 'bids' ? `${colors.greenBg}` : `${colors.redBg}`};
                }

                > span {
                    display: flex;
                    justify-content: center;
                    width: 33.333%;
                }
            }

            .FeedRowPrice {
                color: ${type === 'bids' ? `${colors.green}` : `${colors.red}`};
            }

            /* Desktop */
            @media (min-width: 769px) {
                ${type === 'bids' ? `
                    .FeedHeader, .FeedRow { flex-direction: row-reverse; }

                    .FeedRow .depth {
                        left: auto;
                        right: 0;
                    }
                ` : ''}
            }
            /* Mobile */
            @media (max-width: 768px) {
                ${type === 'asks' ? `
                    .Feed {
                        display: flex;
                        flex-wrap: wrap-reverse;
                    }
                ` : ''}
            }
        `}
    >
        <div className="FeedHeader">
            <span>PRICE</span>
            <span>SIZE</span>
            <span>TOTAL</span>
        </div>
        <div className="Feed mono">
            {rows.map(row => (
                <div className="FeedRow">
                    <aside
                        className="depth"
                        css={css`
                            width: ${(row.total / maxTotal) * 100}%;
                        `}
                    />
                    <span className="FeedRowPrice">
                        {row.price.toLocaleString()}
                    </span>
                    <span>{row.size.toLocaleString()}</span>
                    <span>{row.total.toLocaleString()}</span>
                </div>
            ))}
        </div>
    </div>
);

export default FeedModule;
