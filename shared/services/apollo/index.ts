import { ApolloClient, InMemoryCache } from '@apollo/client';

type ErrorResponse = {
  message: string
}

export type NetworkGenericErrorResponse = {
  result: {
    errors: ErrorResponse[]
  }
}

const client = new ApolloClient({
  uri: process.env.API_URI,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.API_TOKEN}`,
  },
  ssrMode: true,
});

export default client;
