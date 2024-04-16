// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// const httpLink = createHttpLink({
//   uri: 'https://api-gateway-dev-63ce04ea4115.herokuapp.com/',
// });

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

// export default client;

import { split, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const graphQL_WS_LINK =
  import.meta.env.VITE_GRAPHQL_WS_LINK || 'sit-subscriber-service-700169728060';

const http_Link =
  import.meta.env.VITE_HTTP_LINK || 'api-gateway-dev-63ce04ea4115';

const httpLink = new HttpLink({
  uri: `https://${http_Link}.herokuapp.com/`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `wss://${graphQL_WS_LINK}.herokuapp.com/graphql`,
  })
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;