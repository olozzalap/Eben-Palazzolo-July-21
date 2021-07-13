/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { jsx, css, Global } from '@emotion/react'
import styled from '@emotion/styled';
import { colors } from '../helpers/ui';

const StyledOrderBookPage = styled.div`
    background-color: ${colors.black};
    height: 100%;
`;

const OrderBookPage = () => {
    return (
        <StyledOrderBookPage>
            {/*/ Fetch GFonts Roboto and Roboto-Mono /*/}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Mono&display=swap" rel="stylesheet" />

            <Global
                styles={css`
                    html, body, div#root {
                        font-family: 'Roboto', sans-serif;
                        height: 100%;
                        margin: 0;
                        padding: 0;
                    }
                    .mono {
                        font-family: 'Roboto Mono', monospace;
                    }
                `}
            />

            <h1 css={css`
                color: ${colors.white};
                font-size: 20px;
                margin-top: 0;
            `}>
                Z.C.O.B. ZCOB Crypto Order Book
            </h1>
            <img data-testid="kitten-pic" src="https://placekitten.com/420/777" />
        </StyledOrderBookPage>
    );
}

export default OrderBookPage;
