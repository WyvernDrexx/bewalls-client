import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks';
import { hp } from '../../utilities';
import SearchSvg from './search.svg';

type PropTypes = {
  onClick?: () => void;
};

const MiniSearchButton: React.FC<PropTypes> = props => {

  const { theme } = useTheme()

  return (
    <TouchableOpacity onPress={props.onClick}>
      <SearchSvg fill={theme.colors.secondary} height={hp(3)} width={hp(3)} />
    </TouchableOpacity>
  );
};

export default MiniSearchButton;
