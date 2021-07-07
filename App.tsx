import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import { RootNavigator } from './src/navigation';
import { store } from './src/store';
import { apolloClient } from './src/apollo';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
