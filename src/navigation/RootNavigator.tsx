import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { Home, Search } from '../screens';
import { RootStackParamList } from './types';

function RootNavigator() {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          options={{ headerShown: true, headerTitle: '' }}
          name="Search"
          component={Search}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { RootNavigator };
