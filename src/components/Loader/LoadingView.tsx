import React, { useMemo } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useTheme } from '../../hooks'
import { hp, wp } from '../../utilities'
import { Loader } from './Loader'

type LoadingViewProps = {
  style?: StyleProp<ViewStyle>
  height?: string | number
  width?: string | number
  loading?: boolean
  light?: boolean
  useThemeColor?: boolean
}

const LoadingView: React.FC<LoadingViewProps> = function (props) {
  const height = props.height || 10
  const width = props.width || 100
  const { theme } = useTheme()

  const isLight = useMemo(() => {
    if (props.useThemeColor) {
      return !theme.isDark
    }

    return props.light
  }, [props.light, props.useThemeColor, theme])

  if (props.loading) return null

  return (
    <View style={[styles.root, { height: hp(height), width: wp(width) }, props.style]}>
      <View style={[styles.container]}>
        <Loader useTheme={props.useThemeColor} light={isLight} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {}
})

export { LoadingView }
