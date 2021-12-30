import React, { useCallback, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { CURRENT_APP_VERSION_INFO } from '../../constants'
import { useLocal } from '../../hooks'
import { useAppDispatch } from '../../store'
import { RevisionsHistory, updateAppRevisonDate } from '../../store/local'
import { hp, wp } from '../../utilities'

const VersionUpdate = () => {
  const offsetY = useSharedValue(200)
  const { appRevisionsHistory } = useLocal()
  const dispatch = useAppDispatch()

  const handleViewShow = useCallback(() => {
    offsetY.value = Animated.withTiming(0)
  }, [])
  const handleViewClose = useCallback(() => {
    offsetY.value = Animated.withTiming(200)
    dispatch(updateAppRevisonDate(Date.now()))
  }, [])

  const isNotificationShownInLastThreeDays = (data: number | null) => {
    if (!data) return false
    const lastShown = new Date(data)
    const today = new Date()
    if (today.getDate() - lastShown.getDate() >= 3) {
      return false
    }
    return true
  }

  const showNotification = (revisions: RevisionsHistory) => {
    if (!revisions.versions) return false
    if (
      revisions.versions.current.versionName !== CURRENT_APP_VERSION_INFO.versionName &&
      !isNotificationShownInLastThreeDays(revisions.meta.lastShown)
    ) {
      return true
    }
    return false
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

  useEffect(() => {
    if (appRevisionsHistory.versions && showNotification(appRevisionsHistory)) {
      handleViewShow()
    }
  }, [appRevisionsHistory])

  return (
    <Animated.View style={[animatedStyle, styles.root, styles.flex]}>
      <Text style={[styles.text]}>New version available. Update Now?</Text>
      <View style={[styles.flex]}>
        <TouchableOpacity onPress={handleViewClose}>
          <View style={[styles.button, styles.noButton]}>
            <Text style={[styles.text]}>NO</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[styles.button, styles.yesButton]}>
            <Text style={[styles.text]}>YES</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#2A7ED2',
    paddingLeft: wp(2),
    position: 'absolute',
    bottom: 0,
    width: wp(100)
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(2)
  },
  noButton: {
    marginRight: wp(3),
    paddingHorizontal: wp(1)
  },
  yesButton: {
    // backgroundColor: 'black'
  },
  text: {
    color: 'white'
  }
})

export default VersionUpdate
