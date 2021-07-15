/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { jsx, css, Global } from '@emotion/react'
import styled from '@emotion/styled';
import { colors, feedTypes } from '../helpers/constants';
import { parseInitialOrders } from '../helpers/ordersHelper';

const socketUrl = 'wss://www.cryptofacilities.com/ws/v1';
let messageHistory: Array<Object> = [];

const FeedContainer = ({
    setFeedType = (x: string) => {},
    tickerSizeFloat = 0.5,
}) => {
    const [orders, setOrders] = useState({
        bids: [],
        asks: [],
        price: 31818
    });
    const [feedInit, setFeedInit] = useState(false);
    const {
        sendJsonMessage,
        lastMessage,
        readyState,
    } = useWebSocket(socketUrl);

    useEffect(() => {
        console.warn(lastMessage)
        console.warn(readyState)
        startBtcFeed();
    }, []);

    useEffect(() => {
        if (lastMessage?.data) {
            const lastMessageData = JSON.parse(lastMessage.data);
            // console.warn(lastMessageData);
            messageHistory.push(lastMessageData);

            if (!feedInit && lastMessageData?.numLevels) {
                console.warn(`
                    Parse initial values
                `)
                setOrders(parseInitialOrders(lastMessageData, tickerSizeFloat));
                setFeedInit(true);
            } else {
                // parse deltas
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

    const startBtcFeed = () => {
        messageHistory = [];
        sendJsonMessage({"event":"unsubscribe","feed":"book_ui_1","product_ids":["PI_ETHUSD"]});
        sendJsonMessage({"event":"subscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]});
        setFeedType(feedTypes.BTC);
        setFeedInit(false);
    };
    const startEthFeed = () => {
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

    console.warn(`
        connectionStatus is: ${connectionStatus}
        setFeedType is: ${setFeedType}
    `)


    return (
        <div>
            FEEDS
        </div>
    );
};

export default FeedContainer;