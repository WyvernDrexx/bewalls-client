import React from 'react';
import { Provider } from 'react-redux';
import { RootNavigator } from './src/navigation';
import { store } from './src/store';

function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

export default App;
