import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import tokenStorage from './utilities/tokenStorage';

// const uri = 'https://api.bewalls.com/graphql';
const uri = 'http://192.168.0.120:4000/graphql';

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await tokenStorage.getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(createUploadLink({ uri }) as unknown as ApolloLink),
  cache: new InMemoryCache(),
});

export { apolloClient };
