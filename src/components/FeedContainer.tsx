/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { jsx, css, Global } from '@emotion/react'
import styled from '@emotion/styled';
import { colors, feedTypes, ordersObjectType } from '../helpers/constants';
import { parseInitialOrders, parseOrdersDelta } from '../helpers/ordersHelper';

interface FeedContainerProps {
  setFeedType: Function,
  tickerSizeFloat: number,
}
const socketUrl = 'wss://www.cryptofacilities.com/ws/v1';
let messageHistory: Array<Object> = [];

const FeedContainer = ({
    setFeedType,
    tickerSizeFloat,
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
        lastMessage,
        readyState,
    } = useWebSocket(socketUrl);

    const startBtcFeed = () => {
        console.warn(`
                    startBtcFeed!
                    `)
        messageHistory = [];
        sendJsonMessage({"event":"unsubscribe","feed":"book_ui_1","product_ids":["PI_ETHUSD"]});
        sendJsonMessage({"event":"subscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]});
        setFeedType(feedTypes.BTC);
        setFeedInit(false);
    };
    const startEthFeed = () => {
        console.warn(`
                    startEthFeed!
                    `)
        messageHistory = [];
        sendJsonMessage({"event":"unsubscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]});
        sendJsonMessage({"event":"subscribe","feed":"book_ui_1","product_ids":["PI_ETHUSD"]});
        setFeedType(feedTypes.ETH);
        setFeedInit(false);
    };

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    useEffect(() => {
        console.warn(`
            startBtcFeed useEffect
            connectionStatus is: ${connectionStatus}
        `)
        try {
            if (readyState === ReadyState.CONNECTING) {
                startBtcFeed();
            }
        } catch(err) {
            console.warn(`
                startBtcFeed useEffect, err is: `)
            console.warn(err);
        }
    }, [readyState]);

    useEffect(() => {
        const lastMessageData = lastMessage?.data ? JSON.parse(lastMessage.data) : null;
        if (lastMessageData && (lastMessageData?.bids?.length || lastMessageData?.asks?.length)) {
            messageHistory.push(lastMessageData);

            if (!feedInit && lastMessageData?.numLevels) {
                console.warn(`
                    Parse initial values
                `)
                setOrders(
                    parseInitialOrders( lastMessageData.bids, lastMessageData.asks, tickerSizeFloat )
                );
                setFeedInit(true);
            } else if (!lastMessageData?.numLevels) {
                // Only the initial data will have numLevels, subsequent deltas will only have values that changed
                // parse deltas
                setOrders(
                    parseOrdersDelta( orders, lastMessageData )
                );
            }
        }

        if (messageHistory.length && messageHistory.length % 10 === 0) {
            console.warn(`
                We got 10 entries, unsubscribing now
            `)
            console.warn(messageHistory)
            sendJsonMessage({"event":"unsubscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]});
        }
    }, [feedInit, lastMessage, messageHistory]);

    // Handle tickerSize change
    useEffect(() => {
        console.warn(`
            tickerSizeFloat useEffect
        `)
        if (feedInit) {
            console.warn(`
                updateOrders from new ticker: ${tickerSizeFloat} 
            `)
            setOrders(
                parseInitialOrders( orders.bidsOriginal, orders.asksOriginal, tickerSizeFloat )
            );
        }
    }, [tickerSizeFloat]);

    console.warn(`
        connectionStatus is: ${connectionStatus}
        orders are: `)
    console.warn(orders)


    return (
        <div>
            FEEDS
        </div>
    );
};

export default FeedContainer;