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
  levelSizeFloat: number,
}
const socketUrl = 'wss://www.cryptofacilities.com/ws/v1';
let messageHistory: Array<Object> = [];

const FeedContainer = ({
    feedType,
    levelSizeFloat,
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
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];
    useEffect(() => {
        console.warn(`
            connectionStatus is: ${connectionStatus}
        `)
    }, [readyState]);

    useEffect(() => {
        const lastMessageData = lastMessage?.data ? JSON.parse(lastMessage.data) : null;
        if (
            lastMessageData &&
            (
                lastMessageData?.bids?.length || lastMessageData?.asks?.length
            )
        ) {
            messageHistory.push(lastMessageData);
            console.warn(`
                lastJsonMessage is:
            `)
            console.warn(JSON.stringify(lastJsonMessage))
            console.warn(lastJsonMessage)

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

    console.warn(`
        orders are: `)
    console.warn(orders)


    return (
        <div
            css={css`
                display: flex;
                @media (max-width: 768px) {
                    flex-direction: row-reverse;
                }
            `}
        >
            <FeedModule
                orders={orders.bids}
            />
            <FeedModule
                orders={orders.asks}
            />
        </div>
    );
};

export default FeedContainer;
