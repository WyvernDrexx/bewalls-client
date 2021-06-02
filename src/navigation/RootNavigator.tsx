import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { useTheme } from '../hooks';
import { Home, Search, Categories, Selection, Settings } from '../screens';
import { RootStackParamList } from './types';

function RootNavigator() {
  const Stack = createStackNavigator<RootStackParamList>();
  const [, theme] = useTheme();
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS,
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.secondary,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Selection" component={Selection} />
        <Stack.Screen
          options={{ headerShown: true, headerTitleAlign: 'center' }}
          name="Settings"
          component={Settings}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { RootNavigator };
