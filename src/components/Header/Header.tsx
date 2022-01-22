import React, { useCallback } from 'react'
import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { useLocal, useTheme, useUser } from '../../hooks'
import { useAppDispatch } from '../../store'
import { changeTheme } from '../../store/theme'
import { hp, wp } from '../../utilities'
import MiniSearchButton from '../SearchBar/MiniSearchButton'
import MoonImage from './moon.svg'
import ProfileImage from './profile.svg'

type HeaderProps = {
  animatedStyle?: StyleProp<ViewStyle>
  onProfileClick?: () => void
  onSearchBarClick?: () => void
}

const Header: React.FC<HeaderProps> = function (props) {
  const user = useUser()
  const dispatch = useAppDispatch()
  const { profileImageUri } = useLocal()
  const { themedStyles, theme } = useTheme()

  const handleThemeChange = useCallback(() => {
    dispatch(changeTheme(theme.isDark ? 'light' : 'dark'))
  }, [theme.isDark])

  const handleProfileClick = () => {
    if (props.onProfileClick) {
      props.onProfileClick()
    }
  }

  return (
    <Animated.View style={[props.animatedStyle, styles.root, themedStyles.bgAndText]}>
      <TouchableOpacity onPress={handleProfileClick} activeOpacity={0.6}>
        <View style={styles.userInfo}>
          {profileImageUri ? (
            <Image style={styles.profileImage} source={{ uri: profileImageUri }} />
          ) : (
            <ProfileImage fill={theme.colors.secondary} width={wp(10)} height={wp(10)} />
          )}
          <View style={styles.welcomeView}>
            <Text style={[styles.welcomeText, themedStyles.text]}>Welcome,</Text>
            <Text style={[styles.nameText, themedStyles.text]}>{user.info ? user.info.fullName : 'You'}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.actionsView}>
        <TouchableOpacity activeOpacity={0.5} onPress={handleThemeChange}>
          {theme.mode === 'light' ? (
            <MoonImage fill='black' width={wp(5)} height={wp(5)} />
          ) : (
            <MoonImage fill='#FFD347' width={wp(5)} height={wp(5)} />
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: wp(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(2),
    paddingBottom: hp(1)
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: wp(4.5)
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: wp(4)
  },
  welcomeView: {
    paddingLeft: wp(2)
  },
  profileImage: {
    borderRadius: wp(50),
    height: wp(10),
    width: wp(10),
    backgroundColor: 'black'
  },
  actionsView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchButtonView: {
    paddingRight: wp(4)
  }
})

export default Header
