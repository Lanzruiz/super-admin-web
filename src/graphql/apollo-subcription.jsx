import React, { useEffect } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  gql,
  useSubscription,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

// const graphQL_WS_LINK = process.env.GRAPHQL_WS_LINK || 'dev-subscriber-service-cb525d752b82'

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: 'wss://dev-subscriber-service-cb525d752b82.herokuapp.com/graphql',
        })
      )
    : null;

// const wsLink = new WebSocketLink({
//   uri: 'ws://dev-subscriber-service-cb525d752b82.herokuapp.com/graphql',
//   options: {
//     reconnect: true,
//   },
// });

const MESSAGE_RECEIVED_SUBSCRIPTION = gql`
  subscription MessageReceivedSubscription {
    messageReceived
  }
`;

export const MessageReceiver = () => {
  // Subscription hook
  const { data, loading, error } = useSubscription(
    MESSAGE_RECEIVED_SUBSCRIPTION
  );

  // Error handling
  useEffect(() => {
    if (error) {
      console.error('Subscription error:', error);
    }
  }, [error]);

  // Handle incoming messages
  useEffect(() => {
    if (data && data.messageReceived) {
      console.log('Received message:', data.messageReceived);
      // You can do more here, like updating state or UI
    }
  }, [data]);

  if (loading) return <p>{console.log('Message Receiver Ready...')}</p>;
  if (error) {
    // Check if error.message exists before accessing it
    const errorMessage = error.message ? error.message : 'An error occurred';
    return <p>Error: {errorMessage}</p>;
  }

  return null;
};

const subscriber = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

export default subscriber;
