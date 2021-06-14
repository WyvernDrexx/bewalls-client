import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://192.168.0.120:4000/graphql',
});

export { apolloClient };
