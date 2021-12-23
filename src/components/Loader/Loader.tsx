import React, { useMemo } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme } from '../../hooks'
import theme from '../../store/theme'
import { getContrastColor } from '../../utilities/colors'

type LoaderProps = {
  light?: boolean
  useTheme?: boolean
}

const Loader: React.FC<LoaderProps> = function (props) {
  const { theme } = useTheme()

  const color = useMemo(() => {
    if (props.useTheme) {
      return getContrastColor(theme.colors.primary, true)
    }
    return props.light ? '#FFFFFF' : '#000000'
  }, [props.useTheme, props.light, theme.mode])

  return <ActivityIndicator color={color} />
}

export { Loader }
