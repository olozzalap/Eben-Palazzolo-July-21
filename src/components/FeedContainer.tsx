/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { jsx, css, Global } from '@emotion/react'
import styled from '@emotion/styled';
import { colors, feedTypes, ordersObjectType, spreadType } from '../helpers/constants';
import { parseInitialOrders, parseOrdersDelta } from '../helpers/ordersHelper';
import FeedModule from './FeedModule';
import Spread from './Spread';

interface FeedContainerProps {
  feedType: string,
  inErrorState: boolean,
  levelSizeFloat: number,
  setSocketErrorThrown: Function,
  setSpread: Function,
  socketErrorThrown: string,
};
const socketUrl = 'wss://www.cryptofacilities.com/ws/v1';
let messageHistory: Array<Object> = [];

const FeedContainer = ({
    feedType,
    inErrorState = false,
    levelSizeFloat,
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
    const {
        sendJsonMessage,
        lastJsonMessage,
        lastMessage,
        readyState,
    } = useWebSocket(socketUrl);


    // debug
    // const connectionStatus = {
    //     [ReadyState.CONNECTING]: 'Connecting',
    //     [ReadyState.OPEN]: 'Open',
    //     [ReadyState.CLOSING]: 'Closing',
    //     [ReadyState.CLOSED]: 'Closed',
    //     [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    // }[readyState];
    // useEffect(() => {
    //     console.warn(`
    //         connectionStatus is: ${connectionStatus}
    //     `)
    // }, [readyState]);

    useEffect(() => {
        try {
            const lastMessageData = lastMessage?.data ? JSON.parse(lastMessage.data) : null;
            // console.warn(`
            //     lastMessageData is: `)
            // console.warn(lastMessageData)
            
            // First catch errors, initial 'Not subscribed to feed' doesn't count
            if (lastMessageData?.event === 'alert' && lastMessageData?.message !== 'Not subscribed to feed') {
                throw lastMessageData;
            } else if (
                lastMessageData &&
                (
                    lastMessageData?.bids?.length || lastMessageData?.asks?.length
                )
            ) {
                messageHistory.push(lastMessageData);
                // console.warn(`
                //     lastJsonMessage is:
                // `)
                // console.warn(JSON.stringify(lastJsonMessage))
                // console.warn(lastJsonMessage)

                if (!feedInit && lastMessageData?.numLevels) {
                    console.warn(`
                        Parse initial values
                    `)
                    setOrders(
                        parseInitialOrders( lastMessageData.bids, lastMessageData.asks, levelSizeFloat )
                    );
                    setFeedInit(true);
                } else if (feedInit && !lastMessageData?.numLevels) {
                    // Only the initial data will have numLevels, subsequent deltas will only have values that changed
                    setOrders(
                        parseOrdersDelta( orders, lastMessageData, levelSizeFloat )
                    );
                }
            }


            // debug
            if (messageHistory.length && messageHistory.length % 40 === 0) {
                // console.warn(`
                //     We got 40 entries, unsubscribing now
                // `)
                // console.warn(messageHistory)
                // console.warn(orders)
                sendJsonMessage({"event":"unsubscribe","feed":"book_ui_1","product_ids":[feedType === feedTypes.BTC ? "PI_XBTUSD" : "PI_ETHUSD"]});
            }
        } catch (e) {
            console.warn(`
                } catch (e) {
                    `)
            console.error(JSON.stringify(e));
            setSocketErrorThrown(e?.message || 'api failure');
        }
    }, [feedInit, lastMessage, messageHistory]);

    // Handle levelSize change
    useEffect(() => {
        console.warn(`
            levelSizeFloat has changed, recalculate!
        `)
        if (feedInit) {
            console.warn(`
                updateOrders from new level: ${levelSizeFloat} 
            `)
            setOrders(
                parseInitialOrders( orders.bidsOriginal, orders.asksOriginal, levelSizeFloat )
            );
        }
    }, [levelSizeFloat]);

    useEffect(() => {
        messageHistory = [];
        setFeedInit(false);
        if (feedType === feedTypes.BTC) {
            console.warn(`
                        startBtcFeed!
                        `)
            sendJsonMessage({"event":"unsubscribe","feed":"book_ui_1","product_ids":["PI_ETHUSD"]});
            sendJsonMessage({"event":"subscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]});
        } else if (feedType === feedTypes.ETH) {
            console.warn(`
                        startEthFeed!
                        `)
            sendJsonMessage({"event":"unsubscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]});
            sendJsonMessage({"event":"subscribe","feed":"book_ui_1","product_ids":["PI_ETHUSD"]});
        };
    }, [feedType]);

    useEffect(() => {
        setSpread(orders.spread);
    }, [orders.spread.absolute, orders.spread.relative])

    useEffect(() => {
        if (inErrorState && !socketErrorThrown) {
            console.warn(`
                if (inErrorState && !socketErrorThrown) {
                `)
            sendJsonMessage({"event":"iausdh98ah78asd$#$#4hiuaiuhsdiuabsiudba#4#$#48usbd9GA&(SG978GABS98dgiu8asbgd87bAS*do7n   HNZk iHZ kv -hz2oqkz2NAs89dh(A*Shd89AHSdy(ASYmdAMYSduASdwe9d87ah4 -koh -4ko -ho4k","feed":"book_ui_1","product_ids":["PI_XBTUSD"]});
            sendJsonMessage({"event":"789ahd43487h343aw9d348*Y#$(H@E*(Hu7asd87A&*SSd87934#gh*DE&GBF Z   KLOM OZLM    OZ Lmo -ZKom hs8d9f89SHD89f(*#HR(*#H(*#HEqG#er89tN)eha98wdhg8a9hwd","feed":"book_ui_1","product_ids":["PI_ETHUSD"]});
        }
    }, [inErrorState, socketErrorThrown, sendJsonMessage])

    // console.warn(`
    //     orders are: `)
    // console.warn(orders)



    return (
        inErrorState ? (
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
                <p>
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
                </p>
            </div>
        ) : (
        <div
            css={css`
                display: flex;
                > div {
                    width: 50%;
                }
                @media (max-width: 768px) {
                    flex-wrap: wrap-reverse;
                    > div {
                        width: 100%;
                    }
                }
            `}
        >
            <FeedModule
                maxTotal={orders.maxTotal}
                rows={orders.bids}
                type="bids"
            />
            <div
                className="mobile"
                css={css`
                    display: flex;
                    justify-content: center;
                `}
            >
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
