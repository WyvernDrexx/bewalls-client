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
import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';

import { RootStackParamList } from '../types';
import useUser from '../../hooks/useUser';
import { useGetUserInfoQuery } from '../../generated/graphql';
import { userSignIn } from '../../store/user';
import { useAppDispatch } from '../../store';

function RootNavigator() {
  const Stack = createStackNavigator<RootStackParamList>();
  const {
    themedStyles: { bg },
    theme: { colors, isDark },
  } = useTheme();
  const dispatch = useAppDispatch();
  const user = useUser();
  const { data } = useGetUserInfoQuery({ variables: { token: user.token } });

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

  const { theme } = useTheme();

  useEffect(() => {
    changeNavigationBarColor(theme.colors.dark, !theme.isDark, true);
  }, [theme.mode]);

  useEffect(() => {
    if (data) {
      dispatch(
        userSignIn({
          info: data.getUserInfo.info || null,
          isVerified: data.getUserInfo.isVerified,
          token: data.getUserInfo.token,
        }),
      );
    }
  }, [data]);

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <StatusBar backgroundColor={colors.primary} barStyle={statusBarStyle} />
      <View style={[styles.placeholderView, bg]} />
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
