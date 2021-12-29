import React, { useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { hp, wp } from '../../utilities'

const VersionUpdate = () => {
  const offsetY = useSharedValue(0)

  const handleViewClose = useCallback(() => {
    offsetY.value = Animated.withTiming(200)
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: offsetY.value
        }
      ]
    }
  })

  return (
    <Animated.View style={[animatedStyle,styles.root, styles.flex]}>
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
