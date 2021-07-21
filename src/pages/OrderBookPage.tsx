/** @jsxImportSource @emotion/react */
import React from 'react';
import { jsx, css, Global } from '@emotion/react'
import { colors, isMobile } from '../helpers/constants';
import OrderBookContainer from '../components/OrderBookContainer';


const OrderBookPage = () => (
    <main>
        {/*/ Fetch GFonts Roboto and Roboto-Mono /*/}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

        <Global
            styles={css`
                html, body, div#root {
                    box-sizing: border-box;
                    color: ${colors.white};
                    font-family: 'Roboto', sans-serif;
                    font-size: 16px;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
                html {
                    background-color: ${colors.black};
                }
                .mono {
                    font-family: 'Roboto Mono', monospace;
                }
                .mobile {
                    display: none;
                }
                ${isMobile ? `
                    .mobile {
                        display: block;
                    }
                    .desktop {
                        display: none;
                    }
                ` : ''}
                }
            `}
        />

        <OrderBookContainer />

    </main>
);

export default OrderBookPage;
