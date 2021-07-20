/** @jsxImportSource @emotion/react */
import React from 'react';
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled';
import { colors, orderLevelType } from '../helpers/constants';

const StyledButton = styled.button`
`;

interface FeedModuleProps {
    rows: Array<orderLevelType>,
}

const FeedModule = ({
    rows,
}: FeedModuleProps) => (
    <div css={css`
        display: flex;
        justify-content: space-between;
    `}>
        Total
        Size
        Price
    </div>
);

export default FeedModule;
