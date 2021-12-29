import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { hp, wp } from '../../utilities'

const VersionUpdate = () => {
  return (
    <View style={[styles.root, styles.flex]}>
      <Text style={[styles.text]}>New version available. Update Now?</Text>
      <View style={styles.flex}>
        <TouchableOpacity>
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
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#2A7ED2',
    paddingLeft: wp(2),
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
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
