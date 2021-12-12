import React, { useEffect, useState } from 'react'
import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { SvgProps } from 'react-native-svg'
import Icon from 'react-native-vector-icons/Ionicons'
import MUIIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import { useAlerts, useLocal, useTheme, useUser } from '../../hooks'
import { RootStackParamList } from '../../navigation/types'
import { hp, wp } from '../../utilities'
import BackSvg from './back.svg'
import BarItem from './BarItem'
import FavSvg from './heart.svg'
import ProfileSvg from './profile.svg'
import { UserState } from '../../store/user'
import { showAlert } from '../../store/alerts'

type BarItemClickProps = {
  user: UserState
  next: () => void
}

type SideBarProps = {
  isShown?: boolean
  animatedStyle?: StyleProp<ViewStyle>
  onClose?: () => void
  onItemClick: (route: keyof RootStackParamList) => void
  currentRoute: keyof RootStackParamList
}

export type BarItemType = {
  route: keyof RootStackParamList
  title: string
  hideWhenLoggedIn?: boolean
  showWhenLoggedIn?: boolean
  icon: React.FC<SvgProps>
  onClick?: (props: BarItemClickProps) => void
}

const SideBar: React.FC<SideBarProps> = function (props) {
  const width = wp(100)
  const isShown = useSharedValue(props.isShown)
  const theme = useTheme()
  const user = useUser()
  const { profileImageUri } = useLocal()
  const [toCall, setToCall] = useState<'close' | 'barItem' | null>(null)
  const {
    themedStyles,
    theme: { colors }
  } = useTheme()
  const [activeRoute, setActiveRoute] = useState<keyof RootStackParamList>()
  const { dispatchShowAlert } = useAlerts()
  const SIDEBAR_ITEMS: (theme: ReturnType<typeof useTheme>) => BarItemType[] = ({ theme }) => [
    {
      route: 'Home',
      title: 'Home',
      icon: () => <Icon color={theme.colors.secondary} name='home-sharp' size={wp(6)} />
    },
    {
      route: 'Profile',
      title: 'Profile',
      icon: () => <Icon color={theme.colors.secondary} name='person' size={wp(6)} />,
      showWhenLoggedIn: true
    },
    {
      route: 'Categories',
      title: 'Categories',
      icon: () => <MUIIcons color={theme.colors.secondary} name='category' size={wp(6)} />
    },
    {
      route: 'Favourites',
      title: 'Favourites',
      icon: FavSvg,
      showWhenLoggedIn: true
    },
    {
      route: 'Favourites',
      title: 'Favourites',
      icon: FavSvg,
      hideWhenLoggedIn: true,
      onClick({ next, user }) {
        if (!user.isVerified) {
          dispatchShowAlert({ error: 'Please login to continue.' })
        } else next()
      }
    },
    {
      route: 'SignIn',
      title: 'Sign In/Sign Up',
      hideWhenLoggedIn: true,
      icon: () => <AntDesignIcons color={theme.colors.secondary} name='login' size={wp(6)} />
    },
    {
      route: 'Settings',
      title: 'Settings',
      icon: () => <Icon color={theme.colors.secondary} name='settings' size={wp(6)} />
    },
    {
      route: 'ContactUs',
      title: 'Contact Us',
      icon: () => <Icon color={theme.colors.secondary} name='ios-mail' size={wp(6)} />
    }
  ]

  useEffect(() => {
    isShown.value = props.isShown
  }, [props.isShown, isShown])

  const handleClose = () => {
    setToCall('close')
    isShown.value = false
  }

  const handleBarItemClick = (route: keyof RootStackParamList, item: BarItemType) => {
    setToCall('barItem')
    if (item.onClick) {
      item.onClick && item.onClick({ user, next: () => setActiveRoute(route) })
      handleClose()
    } else {
      setActiveRoute(route)
    }
    isShown.value = false
  }

  const handleAnimationComplete = (isFinished: boolean) => {
    // Handles the callback when the slide animation gets completed after close button is clicked

    if (isFinished && toCall) {
      if (props.onClose && toCall === 'close') {
        props.onClose()
      }
      if (toCall === 'barItem' && activeRoute) {
        props.onItemClick(activeRoute)
      }
      setToCall(null)
    }
  }

  const sideBarStyle = useAnimatedStyle(() => {
    const offsetX = interpolate(
      isShown.value === true ? 1 : 0, //Fastest way to convert boolean into int
      [0, 1],
      [-width, 0]
    )

    return {
      transform: [
        {
          translateX: Animated.withTiming(offsetX, {}, runOnJS(handleAnimationComplete))
        }
      ]
    }
  })

  return (
    <Animated.View style={[sideBarStyle, styles.root, themedStyles.bg]}>
      <View style={[styles.sideBarItemsView]}>
        <TouchableOpacity style={[styles.backButton, { borderColor: colors.secondary }]} onPress={handleClose}>
          <BackSvg height={hp(2)} width={hp(2)} fill={colors.secondary} />
        </TouchableOpacity>
        <View style={[styles.profile]}>
          {profileImageUri ? (
            <Image style={styles.profileImage} source={{ uri: profileImageUri }} />
          ) : (
            <ProfileSvg height={hp(8)} width={hp(8)} fill={colors.secondary} />
          )}
          <Text style={[styles.profileText, themedStyles.text]}>{user.info ? user.info.fullName : 'You'}</Text>
        </View>
        <View style={[styles.barItems, { borderColor: colors.light }]}>
          {SIDEBAR_ITEMS(theme).map((item, index) => {
            return (
              <BarItem
                item={item}
                icon={item.icon}
                isActive={props.currentRoute === item.route}
                key={index}
                onClick={handleBarItemClick}
                route={item.route}
                title={item.title}
                hideWhenLoggedIn={item.hideWhenLoggedIn}
                showWhenLoggedIn={item.showWhenLoggedIn}
              />
            )
          })}
        </View>
      </View>
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View style={[styles.transparentView]} />
      </TouchableWithoutFeedback>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: wp(75),
    height: hp(100),
    position: 'absolute',
    top: 0,
    zIndex: 100,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  backButton: {
    padding: wp(4),
    borderWidth: wp(0.5),
    borderRadius: wp(50),
    position: 'absolute',
    right: wp(5),
    top: hp(3)
  },
  sideBarItemsView: {
    width: wp(75)
  },
  transparentView: {
    opacity: 0,
    width: wp(25),
    height: hp(100),
    backgroundColor: 'black'
  },
  profile: {
    padding: wp(2),
    marginTop: hp(10)
  },
  profileText: {
    fontSize: wp(7),
    fontWeight: 'bold',
    marginTop: hp(3),
    color: 'white',
    paddingBottom: hp(1)
  },
  barItems: {
    borderTopWidth: 1
  },
  profileImage: {
    borderRadius: wp(50),
    height: hp(8),
    width: hp(8),
    backgroundColor: 'black'
  }
})

export default SideBar
