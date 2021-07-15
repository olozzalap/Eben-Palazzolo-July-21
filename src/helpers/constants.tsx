const greenRgbBase = '24, 248, 24';
const redRgbBase = '248, 24, 24';
const bgAlphaBase = '.5';

export const colors = {
    black: 'rgb(24, 32, 40)',
    white: 'rgb(248, 244, 242)',
    gray: 'rgb(128, 128, 128)',
    green: `rgb(${greenRgbBase})`,
    greenBg: `rgba(${greenRgbBase}, ${bgAlphaBase})`,
    red: `rgb(${redRgbBase})`,
    redBg: `rgba(${redRgbBase}, ${bgAlphaBase})`,
    purple: 'rgb(160, 40, 180)',
};

export const baseTickerOptions = {
    sm: 'sm',
    med: 'med',
    lg: 'lg',
};

export const feedTypes = {
    BTC: 'btc',
    ETH: 'eth',
};

type tickerSizeObject = {
    [key: string]: {
        [key: string]: number
    }
}
export const tickerSizes: tickerSizeObject = {
    [feedTypes.BTC]: {
        [baseTickerOptions.sm]: 0.5,
        [baseTickerOptions.med]: 1.0,
        [baseTickerOptions.lg]: 2.5,
    },
    [feedTypes.ETH]: {
        [baseTickerOptions.sm]: 0.05,
        [baseTickerOptions.med]: 0.1,
        [baseTickerOptions.lg]: 0.25,
    }
};