type bidAskObjectType = {
    bids: Array<Array<number>>,// [ [price, size] ]
    asks: Array<Array<number>>,
    numLevels: number,
};
const priceIndex = 0;
const sizeIndex = 1;

export const parseInitialOrders = (
    bidAskObj: bidAskObjectType,
    tickerSizeFloat: number,
): any => {
    let newOrders = {
        bids: [],
        asks: [],
        price: 0,
    };

    let bidRunningTotal = bidAskObj.bids[0][sizeIndex];
    newOrders.bids.push({
        price: bidAskObj.bids[0][priceIndex],
        size: bidRunningTotal,
        total: bidRunningTotal,
    });

    let askRunningTotal = bidAskObj.asks[0][sizeIndex];
    newOrders.asks.push({
        price: bidAskObj.asks[0][priceIndex],
        size: askRunningTotal,
        total: askRunningTotal,
    });

    // Skip first bid/ask as it's already parsed above
    for (let i = 1; i < bidAskObj.numLevels; i++) {
        const currBid = bidAskObj.bids[i];
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

        const currAsk = bidAskObj.asks[i];
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



