import React from 'react';
import { TouchableOpacity } from 'react-native';
import { hp } from '../../utilities';

import SearchSvg from './search.svg';

type PropTypes = {
  onClick?: () => void;
};

const MiniSearchButton: React.FC<PropTypes> = props => {
  return (
    <TouchableOpacity onPress={props.onClick}>
      <SearchSvg fill={'black'} height={hp(3)} width={hp(3)} />
    </TouchableOpacity>
  );
};

export default MiniSearchButton;
