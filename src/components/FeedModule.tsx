/** @jsxImportSource @emotion/react */
import React from 'react';
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled';
import { colors, ordersObjectType } from '../helpers/constants';

const StyledButton = styled.button`
`;

interface FeedModuleProps {
  orders: ordersObjectType,
}

const FeedModule = ({
    orders,
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
