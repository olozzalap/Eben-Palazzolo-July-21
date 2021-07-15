import { ordersObjectType } from './constants';

const priceIndex = 0;
const sizeIndex = 1;

export const parseInitialOrders = (
    bidsArr: Array<Array<number>>,
    asksArr: Array<Array<number>>,
    tickerSizeFloat: number,
): ordersObjectType => {
    let newOrders: ordersObjectType = {
        bids: [],
        bidsOriginal: [],
        asks: [],
        asksOriginal: [],
    };

    let bidRunningTotal = bidsArr[0][sizeIndex];
    newOrders.bids.push({
        price: bidsArr[0][priceIndex],
        size: bidRunningTotal,
        total: bidRunningTotal,
    });

    // Skip first bid as it's already parsed above
    for (let i = 1; i < bidsArr.length; i++) {
        const currBid = bidsArr[i];
        const lastParsedBid = newOrders.bids[newOrders.bids.length - 1];
        bidRunningTotal += currBid[sizeIndex];

        /* if currBid is within tickerSizeFloat of the last parsed bid price then consolidate,
        otherwise add a new entry */
        if ((currBid[priceIndex] + tickerSizeFloat) > lastParsedBid.price) {
            newOrders.bids[newOrders.bids.length - 1].size += currBid[sizeIndex];
            newOrders.bids[newOrders.bids.length - 1].total = bidRunningTotal;
        } else {
            newOrders.bids.push({
                price: currBid[priceIndex],
                size: currBid[sizeIndex],
                total: bidRunningTotal,
            });
        }
    }

    let askRunningTotal = asksArr[0][sizeIndex];
    newOrders.asks.push({
        price: asksArr[0][priceIndex],
        size: askRunningTotal,
        total: askRunningTotal,
    });
    // Skip first ask as it's already parsed above
    for (let i = 1; i < bidsArr.length; i++) {
        const currAsk = asksArr[i];
        const lastParsedAsk = newOrders.asks[newOrders.asks.length - 1];
        askRunningTotal += currAsk[sizeIndex];

        /* if currAsk is within tickerSizeFloat of the last parsed ask price then consolidate,
        otherwise add a new entry */
        if ((currAsk[priceIndex] - tickerSizeFloat) < lastParsedAsk.price) {
            newOrders.asks[newOrders.asks.length - 1].size += currAsk[sizeIndex];
            newOrders.asks[newOrders.asks.length - 1].total = askRunningTotal;
        } else {
            newOrders.asks.push({
                price: currAsk[priceIndex],
                size: currAsk[sizeIndex],
                total: askRunningTotal,
            });
        }
    }

    return newOrders;
};

export const parseOrdersDelta = (
    orders: ordersObjectType,
    deltas: {bids: Array<Array<number>>, asks: Array<Array<number>>},
): ordersObjectType => {
    let newOrders: ordersObjectType = Object.assign({}, orders);
    console.warn(`
        parseOrdersDelta!
        deltas are: `)
    console.warn(JSON.stringify(deltas));


    return newOrders
};






