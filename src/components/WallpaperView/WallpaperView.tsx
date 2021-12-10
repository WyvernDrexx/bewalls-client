import ImageColors from 'react-native-image-colors'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Image, StatusBar, StatusBarStyle, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { Tag, useAddToFavouriteMutation, Wallpaper } from '../../generated/graphql'
import { useAlerts, useTheme, useUser } from '../../hooks'
import { hp, wp } from '../../utilities'
import { LoadingView } from '../Loader/LoadingView'
import { BottomDraggable } from './BottomDraggable'
import DownArrowSvg from './down-arrow.svg'
import { getContrastColor } from '../../utilities/colors'

type WallpaperViewProps = {
  animatedStyle?: StyleProp<ViewStyle>
  onCloseClick?: () => void
  wallpaper: Wallpaper | null
  showWallpaper?: boolean
  onFavouriteClick?: (id: string) => void
  afterFavouriteMutation?: (wallpaper: Wallpaper) => void
}

export default function WallpaperView(props: WallpaperViewProps) {
  const [wallpaper, setWallpaper] = useState(props.wallpaper)
  const { theme } = useTheme()
  const navigation = useNavigation<StackNavigationProp<any>>()
  const [imageLoaded, setImageLoaded] = useState(false)
  const screenHeight = hp(100)
  const { dispatchShowAlert } = useAlerts()
  const offsetY = useSharedValue(screenHeight)
  const user = useUser()
  const [statusBarColors, setStatusBarColors] = useState<{ backgroundColor: string; barStyle: StatusBarStyle }>({
    backgroundColor: theme.colors.primary,
    barStyle: theme.isDark ? 'light-content' : 'dark-content'
  })

  const resetStatusBarColor = () => {
    setStatusBarColors({
      backgroundColor: theme.colors.primary,
      barStyle: theme.isDark ? 'light-content' : 'dark-content'
    })
  }

  const hideView = (cb?: () => void) => {
    resetStatusBarColor()
    offsetY.value = Animated.withTiming(screenHeight, {}, (isFinished) => {
      if (isFinished) {
        if (typeof cb === 'function') {
          runOnJS(cb)()
        }
      }
    })
  }

  const showView = (cb?: () => void) => {
    offsetY.value = Animated.withTiming(0, {}, cb)
  }

  useEffect(() => {
    if (wallpaper) showView()
    else hideView()
  }, [wallpaper])

  const handleCloseClick = () => {
    resetStatusBarColor()
    hideView(() => {
      if (props.onCloseClick) props.onCloseClick()
    })
  }

  const handleImageLoadEnd = () => {
    setImageLoaded(true)
  }
  const handleTagClick = (tag: Tag) => {
    resetStatusBarColor()
    navigation.push('Selection', {
      title: tag.name,
      group: 'tag',
      groupId: tag.id
    })
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: offsetY.value
        }
      ]
    }
  })

  const [addToFavourite] = useAddToFavouriteMutation({
    onCompleted: (data) => {
      if (!data || data.addToFavourite !== null) {
        setWallpaper(data.addToFavourite as Wallpaper)
        if (data.addToFavourite?.isUsersFavourite) {
          dispatchShowAlert({
            success: 'Added to your favourites!'
          })
        } else {
          dispatchShowAlert({
            success: 'Removed from your favourites!'
          })
        }
        if (props.afterFavouriteMutation) {
          props.afterFavouriteMutation(data.addToFavourite as Wallpaper)
        }
      }
    }
  })

  const handleFavourite = async (id: string) => {
    if (!user.isVerified) {
      return dispatchShowAlert({
        error: 'Please sign in to access favourites.'
      })
    }
    if (user.isVerified && !props.onFavouriteClick) {
      return addToFavourite({
        variables: {
          id
        }
      })
    }
    if (user.isVerified && props.onFavouriteClick) {
      props.onFavouriteClick(id)
      return
    }
  }

  useEffect(() => {
    if (!wallpaper) return
    ImageColors.getColors(wallpaper.imageMedium, {
      fallback: '#ffffff',
      cache: true,
      key: wallpaper.imageMedium
    })
      .then((results) => {
        console.groupEnd()
        const barStyle = getContrastColor(results.average, true) === '#000000' ? 'dark-content' : 'light-content'
        setStatusBarColors({
          backgroundColor: results.average,
          barStyle
        })
      })
      .catch(console.log)
  }, [wallpaper])

  useEffect(() => {
    setImageLoaded(false)
    setWallpaper(props.wallpaper)
  }, [props.wallpaper])

  if (!wallpaper) return null

  return (
    <>
      <StatusBar barStyle={statusBarColors.barStyle} backgroundColor={statusBarColors.backgroundColor} />
      <Animated.View style={[animatedStyle, styles.root]}>
        <Image
          onLoad={handleImageLoadEnd}
          progressiveRenderingEnabled
          style={styles.image}
          source={{ uri: wallpaper.imageMedium }}
        />
        <LoadingView light loading={imageLoaded} style={styles.loader} height='96' />
        <TouchableOpacity onPress={handleCloseClick} style={styles.arrow}>
          <DownArrowSvg style={styles.arrowIcon} fill='white' />
        </TouchableOpacity>
        <BottomDraggable
          hideView={hideView}
          onTagClick={handleTagClick}
          onFavourite={handleFavourite}
          wallpaper={wallpaper}
        />
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    height: hp(100),
    width: wp(100),
    position: 'absolute',
    backgroundColor: 'white',
    top: 0
  },
  image: {
    position: 'absolute',
    height: hp(100),
    width: wp(100),
    resizeMode: 'cover',
    backgroundColor: 'black'
  },
  arrow: {
    position: 'absolute',
    top: hp(4),
    left: wp(2)
  },
  arrowIcon: {
    height: hp(4),
    width: hp(4),
    opacity: 0.8
  },
  loader: {
    position: 'absolute'
  }
})
