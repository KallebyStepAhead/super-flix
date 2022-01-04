import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.API_URI,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

export default client;
