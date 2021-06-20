import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://192.168.225.23:4000/graphql',
});

export { apolloClient };
