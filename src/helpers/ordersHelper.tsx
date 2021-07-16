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
        bidsOriginal: bidsArr,
        asks: [],
        asksOriginal: asksArr,
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
    for (let i = 1; i < asksArr.length; i++) {
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
    tickerSizeFloat: number,
): ordersObjectType => {
    let newBids = orders.bidsOriginal;
    let newAsks = orders.asksOriginal;

    console.warn(`
        parseOrdersDelta!
        deltas are: `)
    console.warn(JSON.stringify(deltas));

    for (let i = 0; i < deltas.bids.length; i++) {
        const bidDeltaPrice = deltas.bids[i][priceIndex];
        const bidDeltaSize = deltas.bids[i][sizeIndex];

        const matchingNewBidIndex = newBids.findIndex((bid) => bid[priceIndex] === bidDeltaPrice);
        console.warn(`
            matchingNewBidIndex is: ${matchingNewBidIndex}
        `)

        if (matchingNewBidIndex === -1 && bidDeltaSize > 0) {// bidDelta price level doesn't exist in newBids, add it
            newBids.push([bidDeltaPrice, bidDeltaSize]);
        } else if (matchingNewBidIndex > -1) {// bidDelta price level does exist in newBids
            if (bidDeltaSize === 0) {// When delta size is 0 remove the price level
                newBids.splice(matchingNewBidIndex, 1);
            } else {// Otherwise update the size from the delta
                newBids[matchingNewBidIndex][sizeIndex] = bidDeltaSize;
            }
        }
    }

    for (let i = 0; i < deltas.asks.length; i++) {
        const askDeltaPrice = deltas.asks[i][priceIndex];
        const askDeltaSize = deltas.asks[i][sizeIndex];

        const matchingNewAskIndex = newAsks.findIndex((ask) => ask[priceIndex] === askDeltaPrice);
        console.warn(`
            matchingNewAskIndex is: ${matchingNewAskIndex}
        `)

        if (matchingNewAskIndex === -1 && askDeltaSize > 0) {// askDelta price level doesn't exist in newAsks, add it
            newAsks.push([askDeltaPrice, askDeltaSize]);
        } else if (matchingNewAskIndex > -1) {// askDelta price level does exist in newAsks
            if (askDeltaSize === 0) {// When delta size is 0 remove the price level
                newAsks.splice(matchingNewAskIndex, 1);
            } else {// Otherwise update the size from the delta
                newAsks[matchingNewAskIndex][sizeIndex] = askDeltaSize;
            }
        }
    }

    newBids.sort((a, b) => b - a);
    newAsks.sort((a, b) => a - b);

    console.warn(`
        sortedNewBids are: ${JSON.stringify(newBids)}
        sortedNewAsks are: ${JSON.stringify(newAsks)}
        `)

    return parseInitialOrders(newBids, newAsks, tickerSizeFloat);
};






