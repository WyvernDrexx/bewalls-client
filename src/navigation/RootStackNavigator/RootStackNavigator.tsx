import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { StatusBar, StyleSheet, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {
  Home,
  Search,
  Categories,
  Selection,
  Settings,
  BundlesScreen,
  SignIn,
} from '../../screens';

import changeNavigationBarColor from 'react-native-navigation-bar-color';

import { useTheme, useUser } from '../../hooks';
import { hp, wp } from '../../utilities';

import { RootStackParamList } from '../types';

import { useGetUserInfoQuery, User } from '../../generated/graphql';
import { setUserToken, userSignIn } from '../../store/user';
import { useAppDispatch } from '../../store';
import tokenStorage from '../../utilities/tokenStorage';

function RootNavigator() {
  const Stack = createStackNavigator<RootStackParamList>();
  const { themedStyles, theme } = useTheme();
  const dispatch = useAppDispatch();
  const statusBarStyle = theme.isDark ? 'light-content' : 'dark-content';
  const { token } = useUser();
  const { data } = useGetUserInfoQuery({ variables: { token } });

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
    headerStyle: {
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS,
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: theme.colors.secondary,
  };

  useEffect(() => {
    changeNavigationBarColor(theme.colors.dark, !theme.isDark, true);
  }, [theme.mode]);

  useEffect(() => {
    if (data) {
      dispatch(userSignIn(data.getUserInfo as User));
    }
  }, [data]);

  return (
    <NavigationContainer
      onReady={async () => {
        RNBootSplash.hide();
        const storageToken = await tokenStorage.getToken();
        dispatch(setUserToken(storageToken));
      }}>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle={statusBarStyle}
      />
      <View style={[styles.placeholderView, themedStyles.bg]} />
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Selection" component={Selection} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Bundles" component={BundlesScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  placeholderView: {
    position: 'absolute',
    height: hp(100),
    width: wp(100),
    zIndex: -10,
  },
});

export { RootNavigator };
