import React from 'react';
import { Provider } from 'react-redux';
import { RootNavigator } from './src/navigation';
import { store } from './src/store';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://192.168.0.120:4000/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
