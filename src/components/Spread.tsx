/** @jsxImportSource @emotion/react */
import React from 'react';
import { jsx, css } from '@emotion/react'
import { colors, spreadType } from '../helpers/constants';

const Spread = ({
    absolute,
    relative,
}: spreadType) => (
    <div css={css`
        color: ${colors.gray};
    `}>
        Spread:
        {'  '}
        <span className="mono">
            {absolute.toFixed(2)}
            {' '}
            ({relative.toFixed(3)}%)
        </span>
    </div>
);

export default Spread;
