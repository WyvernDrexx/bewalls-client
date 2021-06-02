import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import { Home, Search, Categories, Selection, Settings } from '../screens';

import { RootStackParamList } from './types';
import { useTheme } from '../hooks';

function RootNavigator() {
  const Stack = createStackNavigator<RootStackParamList>();
  const [, { colors, mode: scheme }] = useTheme();

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
    headerStyle: {
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS,
      backgroundColor: colors.primary,
    },
    headerTintColor: colors.secondary,
  };

  const statusBarStyle = scheme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.primary} barStyle={statusBarStyle} />
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Selection" component={Selection} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { RootNavigator };
