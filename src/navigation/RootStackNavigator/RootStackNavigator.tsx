import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import RNBootSplash from 'react-native-bootsplash'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import Alert from '../../components/Alert'
import VersionUpdate from '../../components/VersionUpdate'
import { useAppVersionsQuery, useGetUserInfoQuery, User } from '../../generated/graphql'
import { useLocal, useTheme, useUser } from '../../hooks'
import {
  BundlesScreen,
  Categories,
  ContactUs,
  Favourites,
  Home,
  Profile,
  Search,
  Selection,
  Settings,
  SignIn
} from '../../screens'
import Trending from '../../screens/Trending'
import { useAppDispatch } from '../../store'
import { updateAppRevision } from '../../store/local'
import { setToken, userUpdate } from '../../store/user'
import { hp, wp } from '../../utilities'
import tokenStorage from '../../utilities/tokenStorage'
import { navigationRef } from '../RootNavigation'
import { RootStackParamList } from '../types'

function RootNavigator() {
  const Stack = createStackNavigator<RootStackParamList>()
  const { themedStyles, theme } = useTheme()
  const user = useUser()
  const dispatch = useAppDispatch()
  const statusBarStyle = theme.isDark ? 'light-content' : 'dark-content'
  const { appRevisionsHistory } = useLocal()
  const { data, loading } = useAppVersionsQuery()
  const { data: userData, refetch } = useGetUserInfoQuery({
    onCompleted: (data) => {
      if (data.getUserInfo) {
        dispatch(userUpdate(data.getUserInfo as User))
      }
    },
    onError: (err) => console.log(err)
  })
  const screenOptions: StackNavigationOptions = {
    headerShown: false,
    headerStyle: {
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS,
      backgroundColor: theme.colors.primary
    },
    headerTintColor: theme.colors.secondary
  }

  const handleNavigationReady = async () => {
    RNBootSplash.hide()
    const storageToken = await tokenStorage.getToken()
    dispatch(setToken(storageToken))
  }

  useEffect(() => {
    changeNavigationBarColor(theme.colors.primary, !theme.isDark, true)
  }, [theme.mode])

  useEffect(() => {
    if (userData && userData.getUserInfo) {
      dispatch(userUpdate(userData.getUserInfo as User))
    }
  }, [userData])

  useEffect(() => {
    if (user.token) {
      if (refetch) refetch()
    }
  }, [user.token])

  useEffect(() => {
    if (!loading && data?.appVersion) {
      if (
        appRevisionsHistory.versions == null ||
        appRevisionsHistory.versions?.current?.versionName !== data?.appVersion.current.versionName
      ) {
        const today = new Date()
        today.setDate(today.getDate() - 3)
        dispatch(
          updateAppRevision({
            meta: {
              lastShown: today.getTime()
            },
            versions: data.appVersion
          })
        )
      }
    }
  }, [loading, data, appRevisionsHistory])

  return (
    <NavigationContainer ref={navigationRef} onReady={handleNavigationReady}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle={statusBarStyle} />
      <View style={[styles.placeholderView, themedStyles.bg]} />
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Search' component={Search} />
        <Stack.Screen name='Categories' component={Categories} />
        <Stack.Screen name='Selection' component={Selection} />
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='Bundles' component={BundlesScreen} />
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='ContactUs' component={ContactUs} />
        <Stack.Screen name='Favourites' component={Favourites} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='Trending' component={Trending} />
      </Stack.Navigator>
      <Alert />
      <VersionUpdate />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  placeholderView: {
    position: 'absolute',
    height: hp(100),
    width: wp(100),
    zIndex: -10
  }
})

export { RootNavigator }
