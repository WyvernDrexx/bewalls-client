import React from 'react'
import { TouchableOpacity } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { useTheme } from '../../hooks'
import { hp } from '../../utilities'

type PropTypes = {
  onClick?: () => void
  Icon: React.FC<SvgProps>
}

const SearchBarIconWrapper: React.FC<PropTypes> = (props) => {
  const { theme } = useTheme()

  return (
    <TouchableOpacity onPress={props.onClick}>
      <props.Icon fill={theme.colors.secondary} height={hp(3)} width={hp(3)} />
    </TouchableOpacity>
  )
}

export default SearchBarIconWrapper
