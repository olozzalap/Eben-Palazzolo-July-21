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
        font-weight: 700;
        padding: 6px 0;
        text-align: center;
    `}>
        Spread:
        {' '}
        <span className="mono" data-testid="spreadText">
            {`${absolute.toFixed(2)} (${relative.toFixed(3)}%)`}
        </span>
    </div>
);

export default Spread;
