const slateRgbBase = '35, 48, 70';
const greenRgbBase = '7, 138, 114';
const redRgbBase = '208, 34, 25';
const bgAlphaBase = '.24';
const bgAlphaBaseHigh = '.48';

export const colors = {
    black: 'rgb(9, 27, 40)',
    white: 'rgb(165, 194, 229)',
    slate: `rgb(${slateRgbBase})`,
    slateBg: `rgba(${slateRgbBase}, ${bgAlphaBaseHigh})`,
    gray: 'rgb(92, 99, 112)',
    green: `rgb(${greenRgbBase})`,
    greenBg: `rgba(${greenRgbBase}, ${bgAlphaBase})`,
    red: `rgb(${redRgbBase})`,
    redBg: `rgba(${redRgbBase}, ${bgAlphaBase})`,
    purple: 'rgb(97, 60, 210)',
};

export const isMobile = typeof window !== 'undefined' && window?.innerWidth <= 768;

export const baseLevelOptions = {
    sm: 'sm',
    med: 'med',
    lg: 'lg',
    xl: 'xl',
    xxl: 'xxl',
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
        [baseLevelOptions.xl]: 5.00,
        [baseLevelOptions.xxl]: 10.00,
    },
    [feedTypes.ETH]: {
        [baseLevelOptions.sm]: 0.05,
        [baseLevelOptions.med]: 0.10,
        [baseLevelOptions.lg]: 0.20,
        [baseLevelOptions.xl]: 0.50,
        [baseLevelOptions.xxl]: 1.00,
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

export const feedThrottleMsOptions = [1000, 500, 2000, 5000, 10000, 20000, 30000];
export const maxRowsOptions = [8, 12, 16, 20, 24, 28, 32, 36, 40, 50];

