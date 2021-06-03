import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { StatusBar, StyleSheet, View } from 'react-native';

import { Home, Search, Categories, Selection, Settings } from '../../screens';

import { RootStackParamList } from '../types';
import { useTheme } from '../../hooks';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

function RootNavigator() {
  const Stack = createStackNavigator<RootStackParamList>();
  const [{ bg }, { colors, isDark }] = useTheme();

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
    headerStyle: {
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS,
      backgroundColor: colors.primary,
    },
    headerTintColor: colors.secondary,
  };

  const statusBarStyle = isDark ? 'light-content' : 'dark-content';

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.primary} barStyle={statusBarStyle} />
      <View style={[styles.placeholderView, bg]} />
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

const styles = StyleSheet.create({
  placeholderView: {
    position: 'absolute',
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
    zIndex: -10,
  },
});

export { RootNavigator };
