const greenRgbBase = '7, 138, 114';
const redRgbBase = '208, 34, 25';
const bgAlphaBase = '.24';

export const colors = {
    black: 'rgb(9, 27, 40)',
    white: 'rgb(165, 194, 229)',
    slate: 'rgb(35, 48, 70)',
    gray: 'rgb(92, 99, 112)',
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
        [baseLevelOptions.sm]: 0.50,
        [baseLevelOptions.med]: 1.00,
        [baseLevelOptions.lg]: 2.50,
    },
    [feedTypes.ETH]: {
        [baseLevelOptions.sm]: 0.05,
        [baseLevelOptions.med]: 0.10,
        [baseLevelOptions.lg]: 0.25,
    }
};

export type spreadType = {
    absolute: number,
    relative: number,
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
    maxTotal: number,
    spread: spreadType
};

export const maxRows = 30;

