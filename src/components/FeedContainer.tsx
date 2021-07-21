/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { jsx, css, Global } from '@emotion/react'
import styled from '@emotion/styled';
import { colors, feedTypes, isMobile, ordersObjectType, spreadType } from '../helpers/constants';
import { parseInitialOrders, parseOrdersDelta } from '../helpers/ordersHelper';
import ErrorModule from './ErrorModule';
import FeedModule from './FeedModule';
import Spread from './Spread';

type FeedContainerProps = {
    feedThrottleMs: number,
    feedType: string,
    inErrorState: boolean,
    levelSizeFloat: number,
    maxRows: number,
    setSocketErrorThrown: Function,
    setSpread: Function,
    socketErrorThrown: string,
};
type deltasToParseType = {
    bids: Array<Array<number>>,
    asks: Array<Array<number>>,
};
const socketUrl = 'wss://www.cryptofacilities.com/ws/v1';

const FeedContainer = ({
    feedThrottleMs,
    feedType,
    inErrorState = false,
    levelSizeFloat,
    maxRows,
    setSocketErrorThrown,
    setSpread,
    socketErrorThrown,
}: FeedContainerProps) => {
    const [orders, setOrders] = useState<ordersObjectType>({
        bids: [],
        bidsOriginal: [],
        asks: [],
        asksOriginal: [],
        maxTotal: 0,
        spread: {
            absolute: 0,
            relative: 0,
        },
    });
    const [feedInit, setFeedInit] = useState(false);
    // Used to determine is we're in the throttling interval (feedThrottleMs)
    const lastOrderParseTime = useRef(Date.now());
    // Holds bid/ask deltas until they're parsed every feedThrottleMs
    const deltasToParse = useRef<deltasToParseType>({
        bids: [],
        asks: [],
    });
    const {
        sendJsonMessage,
        lastJsonMessage,
        lastMessage,
        readyState,
    } = useWebSocket(socketUrl);

    const resetThrottling = () => {
        lastOrderParseTime.current = Date.now();
        deltasToParse.current = {
            bids: [],
            asks: [],
        }
    };
    const startFeed = () => {
        setFeedInit(false);
        resetThrottling();
        if (feedType === feedTypes.BTC) {
            console.warn(`
                        startBtcFeed!
                        `)
            sendJsonMessage({"event":"unsubscribe","feed":"book_ui_1","product_ids":["PI_ETHUSD"]});
            sendJsonMessage({"event":"unsubscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]});
            sendJsonMessage({"event":"subscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]});
        } else if (feedType === feedTypes.ETH) {
            console.warn(`
                        startEthFeed!
                        `)
            sendJsonMessage({"event":"unsubscribe","feed":"book_ui_1","product_ids":["PI_ETHUSD"]});
            sendJsonMessage({"event":"unsubscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]});
            sendJsonMessage({"event":"subscribe","feed":"book_ui_1","product_ids":["PI_ETHUSD"]});
        };
    };
    // Main lastMessage parsing loop. It cathes errors, init's the feed and updates orders via parseOrdersDelta throttled to every feedThrottleMs
    useEffect(() => {
        try {
            const lastMessageData = lastMessage?.data ? JSON.parse(lastMessage.data) : null;

            // First catch errors, initial 'Not subscribed to feed' doesn't count
            if (lastMessageData?.event === 'alert' && lastMessageData?.message !== 'Not subscribed to feed') {
                throw lastMessageData;
            } else if (
                lastMessageData &&
                (
                    lastMessageData?.bids?.length || lastMessageData?.asks?.length
                )
            ) {
                // Parse initial values to kick off feed
                // Only the initial subscribe data will have numLevels, subsequent deltas will only have values that changed
                if (!feedInit && lastMessageData?.numLevels) {
                    setOrders(
                        parseInitialOrders({
                            bidsArr: lastMessageData.bids,
                            asksArr: lastMessageData.asks,
                            levelSizeFloat,
                            maxRows,
                        })
                    );
                    setFeedInit(true);
                } else if (feedInit && !lastMessageData?.numLevels) {
                    deltasToParse.current.bids = [...deltasToParse.current.bids, ...lastMessageData.bids];
                    deltasToParse.current.asks = [...deltasToParse.current.asks, ...lastMessageData.asks];
                    // throttle to ensure we re-calculate no more often that feedThrottleMs
                    if (Date.now() - feedThrottleMs > lastOrderParseTime.current) {
                        setOrders(
                            parseOrdersDelta({
                                orders,
                                deltas: deltasToParse.current,
                                levelSizeFloat,
                                maxRows,
                            })
                        );
                        resetThrottling();
                    }
                }
            }
        } catch (e) {
            console.error(`
                ERROR CATCH
                    `)
            console.error(JSON.stringify(e));
            setSocketErrorThrown(e?.message || 'api failure');
        }
    }, [feedInit, lastMessage]);

    // Handle levelSize or maxRows change with an immediate recalc
    useEffect(() => {
        if (feedInit) {
            console.warn(`
                updateOrders from new level or maxRow
                levelSizeFloat is: ${levelSizeFloat}
                maxRows is: ${maxRows}
            `)
            setOrders(
                parseInitialOrders({
                    bidsArr: orders.bidsOriginal,
                    asksArr: orders.asksOriginal,
                    levelSizeFloat,
                    maxRows,
                })
            );
        }
    }, [levelSizeFloat, maxRows]);

    // If feedType change we need to completely unsub/re-sub and recalculate
    useEffect(() => {
        console.warn(`
            startFeed!
            new feedType is: ${feedType}
            `)
        startFeed();
    }, [feedType]);
    // Anytime setOrders get's an updated spread value call the update callback
    useEffect(() => {
        setSpread(orders.spread);
    }, [orders.spread.absolute, orders.spread.relative])
    // ErrorState useEffect to send garbage event to trigger socketErrorThrown, on second click of "Kill All" this will restart the feed
    useEffect(() => {
        if (inErrorState && !socketErrorThrown) {
            sendJsonMessage({"event":"iausdh98ah78asd$#$#4hiuaiuhsdiuabsiudba#4#$#48usbd9GA&(SG978GABS98dgiu8asbgd87bAS*do7n   HNZk iHZ kv -hz2oqkz2NAs89dh(A*Shd89AHSdy(ASYmdAMYSduASdwe9d87ah4 -koh -4ko -ho4k","feed":"book_ui_1","product_ids":["PI_XBTUSD"]});
            sendJsonMessage({"event":"789ahd43487h343aw9d348*Y#$(H@E*(Hu7asd87A&*SSd87934#gh*DE&GBF Z   KLOM OZLM    OZ Lmo -ZKom hs8d9f89SHD89f(*#HR(*#H(*#HEqG#er89tN)eha98wdhg8a9hwd","feed":"book_ui_1","product_ids":["PI_ETHUSD"]});
            sendJsonMessage({"event":"unsubscribe","feed":"book_ui_1","product_ids":["PI_ETHUSD"]});
            sendJsonMessage({"event":"unsubscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]});
        } else if (!inErrorState && socketErrorThrown) {
            startFeed();
        }
    }, [inErrorState, socketErrorThrown, sendJsonMessage])

    return (
        inErrorState ? (
            <ErrorModule socketErrorThrown={socketErrorThrown} />
        ) : (
        <div
            css={css`
                display: flex;
                padding-bottom: 68px;
                > div {
                    width: 50%;
                }
                ${isMobile ? `
                    flex-wrap: wrap-reverse;
                    > div {
                        width: 100%;
                    }
                ` : ''}
            `}
        >
            <FeedModule
                maxTotal={orders.maxTotal}
                rows={orders.bids}
                type="bids"
            />
            <div className="mobile">
                <Spread
                    absolute={orders.spread.absolute}
                    relative={orders.spread.relative}
                />
            </div>
            <FeedModule
                maxTotal={orders.maxTotal}
                rows={orders.asks}
                type="asks"
            />
        </div>
    ));
};

export default FeedContainer;
