/** @jsxImportSource @emotion/react */
import React from 'react';
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled';
import { colors, feedTypes } from '../helpers/constants';

const StyledButton = styled.button`
    border: none;
    border-radius: 3px;
    color: white;
    font-size: 20px;
    padding: 10px 0;
    width: 150px;
`;

interface BottomBarProps {
    feedType: string,
    toggleInErrorState: Function,
    setFeedType: Function,
}

const BottomBar = ({
    feedType,
    toggleInErrorState,
    setFeedType,
}: BottomBarProps) => (
    <div css={css`
        display: flex;
        justify-content: center;
    `}>
        <StyledButton
            css={css`
                background-color: purple;
            `}
            onClick={() => setFeedType(feedType === feedTypes.BTC ? feedTypes.ETH : feedTypes.BTC)}
        >
            Toggle Feed
        </StyledButton>
        <StyledButton
            css={css`
                background-color: red;
            `}
            onClick={() => toggleInErrorState()}
        >
            Kill Feed
        </StyledButton>
    </div>
);

export default BottomBar;
