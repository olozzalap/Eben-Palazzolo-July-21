/** @jsxImportSource @emotion/react */
import React from 'react';
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled';
import { colors } from '../helpers/constants';

const StyledButton = styled.button`
    border-radius: 3px;
    padding: 8px 0;
    width: 120px;
`;

interface BottomBarProps {
  toggleInErrorState: Function,
  setFeedType: Function,
}

const BottomBar = ({
    toggleInErrorState,
    setFeedType,
}: BottomBarProps) => (
    <div css={css`
        display: flex;
        justify-content: center;
    `}>
        <StyledButton>
            Toggle Feed
        </StyledButton>
        <StyledButton
            onClick={() => toggleInErrorState()}
        >
            Kill Feed
        </StyledButton>
    </div>
);

export default BottomBar;
