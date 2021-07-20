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

export const baseLevelOptions = {
    sm: 'sm',
    med: 'med',
    lg: 'lg',
};

export const feedTypes = {
    BTC: 'btc',
    ETH: 'eth',
};

type levelSizeObject = {
    [key: string]: {
        [key: string]: number
    }
}
export const levelSizes: levelSizeObject = {
    [feedTypes.BTC]: {
        [baseLevelOptions.sm]: 0.5,
        [baseLevelOptions.med]: 1.0,
        [baseLevelOptions.lg]: 2.5,
    },
    [feedTypes.ETH]: {
        [baseLevelOptions.sm]: 0.05,
        [baseLevelOptions.med]: 0.1,
        [baseLevelOptions.lg]: 0.25,
    }
};

export type orderLevelType = {
    price: number,
    size: number,
    total: number,
};

export type ordersObjectType = {
    bids: Array<orderLevelType>,
    bidsOriginal: Array<Array<number>>,
    asks: Array<orderLevelType>,
    asksOriginal: Array<Array<number>>,
};

