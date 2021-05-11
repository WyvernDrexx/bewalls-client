import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import Home from '../screens';
import { RootStackParamList } from './types';

function RootNavigator() {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { RootNavigator };
