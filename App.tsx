import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { PersistGate } from 'redux-persist/es/integration/react';
import { RootNavigator } from './src/navigation';
import { persistor, store } from './src/store';
import { apolloClient } from './src/apollo';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
