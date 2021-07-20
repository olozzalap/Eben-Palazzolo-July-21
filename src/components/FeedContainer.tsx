/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { jsx, css, Global } from '@emotion/react'
import styled from '@emotion/styled';
import { colors, feedTypes, ordersObjectType } from '../helpers/constants';
import { parseInitialOrders, parseOrdersDelta } from '../helpers/ordersHelper';
import FeedModule from './FeedModule';

interface FeedContainerProps {
  feedType: string,
  inErrorState: boolean,
  levelSizeFloat: number,
  setSocketErrorThrown: Function,
  socketErrorThrown: boolean,
};
const socketUrl = 'wss://www.cryptofacilities.com/ws/v1';
let messageHistory: Array<Object> = [];

const FeedContainer = ({
    feedType,
    inErrorState = false,
    levelSizeFloat,
    setSocketErrorThrown,
    socketErrorThrown,
}: FeedContainerProps) => {
    const [orders, setOrders] = useState<ordersObjectType>({
        bids: [],
        bidsOriginal: [],
        asks: [],
        asksOriginal: [],
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
        const lastMessageData = lastMessage?.data ? JSON.parse(lastMessage.data) : null;
        if (
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
        if (messageHistory.length && messageHistory.length % 10 === 0) {
            console.warn(`
                We got 10 entries, unsubscribing now
            `)
            console.warn(messageHistory)
            sendJsonMessage({"event":"unsubscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]});
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
    }, [feedType])

    // console.warn(`
    //     orders are: `)
    // console.warn(orders)

    if (inErrorState && !socketErrorThrown) {
        sendJsonMessage({"event":"iausdh98ah78asd$#$#4hiuaiuhsdiuabsiudba#4#$#48usbd9GA&(SG978GABS98dgiu8asbgd87bAS*do7n   HNZk iHZ kv -hz2oqkz2NAs89dh(A*Shd89AHSdy(ASYmdAMYSduASdwe9d87ah4 -koh -4ko -ho4k","feed":"book_ui_1","product_ids":["PI_XBTUSD"]});
        sendJsonMessage({"event":"789ahd43487h343aw9d348*Y#$(H@E*(Hu7asd87A&*SSd87934#gh*DE&GBF Z   KLOM OZLM    OZ Lmo -ZKom hs8d9f89SHD89f(*#HR(*#H(*#HEqG#er89tN)eha98wdhg8a9hwd","feed":"book_ui_1","product_ids":["PI_ETHUSD"]});
        setSocketErrorThrown(true);
    }
    


    return (
        inErrorState ? (
            <div>
                <h1>Connection issue...</h1>
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
                @media (max-width: 768px) {
                    flex-direction: row-reverse;
                }
            `}
        >
            <FeedModule
                rows={orders.bids}
            />
            <FeedModule
                rows={orders.asks}
            />
        </div>
    ));
};

export default FeedContainer;
