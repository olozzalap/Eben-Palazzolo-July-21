/** @jsxImportSource @emotion/react */
import React from 'react';
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled';
import { colors } from '../helpers/constants';

const StyledButton = styled.button`
`;

interface BottomBarProps {
  killFeed: Function,
  setFeedType: Function,
}

const BottomBar = ({
    killFeed,
    setFeedType,
}: BottomBarProps) => (
    <div css={css`
        display: flex;
        justify-content: center;
    `}>
        <StyledButton>
            Toggle Feed
        </StyledButton>
        <StyledButton>
            Kill Feed
        </StyledButton>
    </div>
);

export default BottomBar;
