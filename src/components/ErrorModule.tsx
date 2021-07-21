/** @jsxImportSource @emotion/react */
import React from 'react';
import { jsx, css } from '@emotion/react'
import { colors, spreadType } from '../helpers/constants';

type ErrorModuleProps = {
    socketErrorThrown: string,
};

const ErrorModule = ({
    socketErrorThrown,
}: ErrorModuleProps) => (
    <div>
        <h1>Connection issue...</h1>
        <h3>Message is: <span className="mono">{socketErrorThrown}</span></h3>
        <p>
            This Order Book is powered by&nbsp;
            <a href="https://www.cryptofacilities.com/" rel="external nofollow noopener noreferrer" target="_blank">
                https://www.cryptofacilities.com/&nbsp;
            </a>
            and it appears their api is having issues at this moment 🤕📉💸😭 We will be back us ASAP
        </p>
        <div>
            See the following links for more info:
            <ul>
                <li><a href="https://twitter.com/CryptoFLtd" rel="external nofollow noopener noreferrer" target="_blank">
                    Crypto Facilities Twitter
                </a></li>
                <li><a href="https://support.cryptofacilities.com/hc/en-us/categories/115000132213-API" rel="external nofollow noopener noreferrer" target="_blank">
                    Crypto Facilities API Support Page
                </a></li>
                <li><a href="https://www.cryptofacilities.com/" rel="external nofollow noopener noreferrer" target="_blank">
                    cryptofacilities.com
                </a></li>
            </ul>
        </div>
    </div>

);

export default ErrorModule;
