import { BannerAd, BannerAdSize } from '@react-native-admob/admob'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ActivityIndicator, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { Tag, useRecommendedQuery, useWallpaperInfoQuery, Wallpaper } from '../../generated/graphql'
import { useAlerts, useTheme } from '../../hooks'
import WallpaperModule from '../../modules/WallpaperModule'
import { downloadManager, hp, permissions, wp } from '../../utilities'
import { Cards } from '../Cards'
import HeadingTitle from '../HeadingTitle'
import Options from '../Options'
import { OptionType } from '../Options/Option'
import CheckSvg from './check.svg'
import DownloadSvg from './download.svg'
import HeartSvg from './heart.svg'
import ShareSvg from './share.svg'

type Action = {
  icon: any
  backgroundColor: string
  onClick?: () => void
  ToggleComp?: any
  toggle?: boolean
  disabled?: boolean
}

type BottomDraggableProps = {
  wallpaper: Wallpaper
  onFavourite?: (wallpaperId: string) => void
  onTagClick?: (tag: Tag) => void
  hideView?: (cb?: () => void) => void
}

const WALLPAPER_SET_ON_OPTIONS: OptionType[] = [
  {
    id: 1,
    title: 'Set on Home Screen'
  },
  {
    id: 2,
    title: 'Set on Lock Screen'
  },
  {
    id: 3,
    title: 'Set on Both Home Screen & Lock Screen'
  }
]

const BottomDraggable = function (props: BottomDraggableProps) {
  const [settingWallpaper, setSettingWallpaper] = useState(false)
  const [downloadInProgress, setDownloadInProgress] = useState(false)
  const [showSetWallpaperOptions, setShowSetWallpaperOptions] = useState(false)
  const [applyProgress, setApplyProgress] = useState(0)
  const navigation = useNavigation()
  const startPosition = hp(80)
  const maxOffset = hp(12)
  const offsetY = useSharedValue(startPosition)
  const driftOffset = hp(70)
  const actionIconSize = hp(3)
  const { themedStyles, theme } = useTheme()
  const { dispatchShowAlert } = useAlerts()

  const { data: recommended } = useRecommendedQuery()
  const { data } = useWallpaperInfoQuery({
    variables: {
      wallpaperId: props.wallpaper.id
    }
  })

  const setWallpaper = async (destination: number) => {
    const granted = await permissions.isReadWriteStorageGranted()
    let uri = ''
    setSettingWallpaper(true)
    setShowSetWallpaperOptions(false)
    if (granted === false) {
      const allowed = await permissions.askStorage()
      if (!allowed) {
        if (!granted) {
          return dispatchShowAlert({
            error: 'Storage permission denied. Hence, could not apply.'
          })
        }
        return setSettingWallpaper(false)
      }
    }
    try {
      if (!data || !data.wallpaperFile) {
        return setSettingWallpaper(false)
      }
      const { wallpaperFile } = data
      const results = await downloadManager.saveFileToCache(wallpaperFile, setApplyProgress)
      if (results.cacheUri) {
        uri = results.cacheUri
      } else {
        setSettingWallpaper(false)
        return dispatchShowAlert({
          error: 'Unable to set wallpaper. Please try manually setting.'
        })
      }
      WallpaperModule.setWallpaper(uri, destination, wp(100), hp(100), (status) => {
        if (status === 'success') {
          dispatchShowAlert({ success: 'Wallpaper successfully applied!' })
        } else {
          dispatchShowAlert({
            error: 'Unable to set wallpaper. Please try manually setting.'
          })
        }
        setSettingWallpaper(false)
      })
    } catch (error) {
      setSettingWallpaper(false)
    }
  }

  const handleDownload = async () => {
    setDownloadInProgress(true)
    if (!data) return
    const { wallpaperFile } = data
    if (!wallpaperFile) return
    const granted = await permissions.askStorage()
    if (!granted) {
      setDownloadInProgress(false)
      return dispatchShowAlert({
        error: 'Storage permission denied. Hence, could not download.'
      })
    }
    const result = await downloadManager.saveFileToAlbum(wallpaperFile)
    if (result.error) {
      dispatchShowAlert({ error: result.error })
    } else {
      dispatchShowAlert({ success: result.message })
    }
    setDownloadInProgress(false)
  }

  const handleSetWallpaperClick = () => {
    setShowSetWallpaperOptions(true)
  }

  const eventHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startY: number }) => {
      ctx.startY = offsetY.value
    },
    onActive: (event, ctx) => {
      offsetY.value = ctx.startY + event.translationY
    },
    onEnd: (event) => {
      if (event.absoluteY < driftOffset) {
        offsetY.value = Animated.withTiming(maxOffset)
      } else {
        offsetY.value = Animated.withTiming(startPosition)
      }
    }
  })

  const uas = useAnimatedStyle(() => {
    let offset = offsetY.value
    if (offsetY.value > maxOffset) {
      offset = offsetY.value
    } else {
      offset = maxOffset
    }
    if (offsetY.value > startPosition) {
      offset = startPosition
    }
    return {
      transform: [
        {
          translateY: offset
        }
      ]
    }
  })

  const handleHeartClick = () => {
    if (props.onFavourite) props.onFavourite(props.wallpaper.id)
  }

  const handleTagClick = (tag: Tag) => {
    if (props.onTagClick) props.onTagClick(tag)
  }

  const handleCardClick = (select: Wallpaper) => {
    props.hideView &&
      props.hideView(() => {
        navigation.navigate('Selection', {
          title: select.category.name,
          group: 'category',
          groupId: select.category.id
        })
      })
  }

  const handleShareClick = async () => {
    await Share.share({
      message: 'Share BeWalls app with your closest ones! ',
      url: 'https://google.com/'
    })
  }
  const ACTION_BUTTONS: Action[] = [
    {
      icon: (
        <HeartSvg
          fill={props.wallpaper.isUsersFavourite ? '#fc2679' : theme.colors.dark}
          height={actionIconSize}
          width={actionIconSize}
        />
      ),
      backgroundColor: theme.colors.secondary,
      onClick: handleHeartClick
    },
    {
      icon: <ShareSvg fill={'white'} height={actionIconSize} width={actionIconSize} />,
      backgroundColor: '#17E300',
      onClick: handleShareClick
    },
    {
      icon: <CheckSvg fill={'white'} height={actionIconSize} width={actionIconSize} />,
      backgroundColor: '#FC2679',
      onClick: handleSetWallpaperClick,
      ToggleComp: <Text style={[styles.downloadProgress, themedStyles.textLight]}>{applyProgress}%</Text>,
      toggle: settingWallpaper,
      disabled: settingWallpaper
    },
    {
      icon: <DownloadSvg fill={'#4B75FF'} height={actionIconSize} width={actionIconSize} />,
      backgroundColor: theme.colors.light,
      onClick: handleDownload,
      ToggleComp: (
        <Text style={styles.downloadProgress}>
          <ActivityIndicator color='#4B75FF' />
        </Text>
      ),
      toggle: downloadInProgress,
      disabled: downloadInProgress
    }
  ]

  return (
    <>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[uas, styles.root, themedStyles.bg]}>
          <View style={styles.flexView}>
            <View style={[styles.topBar, themedStyles.bgSecondary]} />
          </View>
          <View>
            <View style={styles.headerView}>
              <View>
                <Text style={[styles.mainText, themedStyles.text]}>{props.wallpaper.name}</Text>
                <Text style={[styles.subText, themedStyles.text]}>{props.wallpaper.category?.name}</Text>
              </View>
            </View>
            <View style={styles.tagView}>
              {props.wallpaper.tags.map((item) => {
                return (
                  <TouchableOpacity onPress={() => handleTagClick(item!)} key={item?.id}>
                    <Text style={[styles.tagText, themedStyles.bgSecondary, themedStyles.textLight]}>{item?.name}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
          <View style={styles.actionsContainer}>
            {ACTION_BUTTONS.map((item, index) => {
              return (
                <TouchableOpacity
                  disabled={item.disabled}
                  onPress={item.onClick}
                  activeOpacity={0.8}
                  key={index}
                  style={[styles.actionView, { backgroundColor: item.backgroundColor }]}
                >
                  {item.toggle ? item.ToggleComp : item.icon}
                </TouchableOpacity>
              )
            })}
          </View>
          <View style={[styles.flex, themedStyles.bg]}>
            {/* <BannerAd size={BannerAdSize.BANNER} unitId='ca-app-pub-3940256099942544/6300978111' /> */}
          </View>
          <View style={styles.details}>
            <Text style={[styles.detailsText, themedStyles.bgLight, themedStyles.text]}>
              {props.wallpaper.downloads} Downloads
            </Text>
            <Text style={[styles.detailsText, themedStyles.bgLight, themedStyles.text]}>
              {props.wallpaper.views} Views
            </Text>
            <Text style={[styles.detailsText, themedStyles.bgLight, themedStyles.text]}>
              {props.wallpaper.height} x {props.wallpaper.width}
            </Text>
            <Text style={[styles.detailsText, themedStyles.bgLight, themedStyles.text]}>
              {props.wallpaper.sizeInKB} KB
            </Text>
          </View>
          <View style={styles.recommended}>
            <HeadingTitle title='Recommended' hideButton />
            <Cards
              onClick={handleCardClick}
              group='none'
              height='34'
              width='47'
              numberOfItems={2}
              items={recommended?.recommended as Wallpaper[]}
            />
          </View>
        </Animated.View>
      </PanGestureHandler>
      <Options
        showOptions={showSetWallpaperOptions}
        onUnderlayClick={() => setShowSetWallpaperOptions(false)}
        options={WALLPAPER_SET_ON_OPTIONS}
        onChange={setWallpaper}
        initalSelection={-1}
      />
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    width: wp(100),
    height: hp(100),
    paddingHorizontal: wp(2),
    borderTopLeftRadius: hp(4),
    borderTopRightRadius: hp(4),
    paddingTop: hp(4)
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2.5)
  },
  topBar: {
    padding: hp(0.5),
    width: wp(40),
    borderRadius: wp(2),
    marginTop: hp(-5)
  },
  flexView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerView: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainText: {
    fontSize: wp(5),
    fontWeight: 'bold'
  },
  subText: {
    fontSize: wp(4),
    marginTop: hp(1),
    color: 'gray'
  },
  tagText: {
    padding: hp(1),
    borderRadius: hp(1),
    marginRight: wp(2)
  },
  tagView: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: hp(1)
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp(4)
  },
  actionView: {
    width: wp(22),
    height: hp(10),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: wp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.5),
    flexWrap: 'wrap'
  },
  detailsText: {
    padding: hp(1),
    width: wp(45),
    borderRadius: wp(2),
    marginRight: hp(0.5),
    marginTop: hp(1)
  },
  recommended: {
    marginHorizontal: wp(-2)
  },
  downloadProgress: {
    color: '#4B75FF',
    fontWeight: 'bold',
    fontSize: wp(4)
  }
})

export { BottomDraggable }
