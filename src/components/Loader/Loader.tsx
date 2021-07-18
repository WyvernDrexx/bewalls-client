import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks';

type LoaderProps = {
  light?: boolean;
};

const Loader: React.FC<LoaderProps> = function (props) {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <ActivityIndicator
      color={props.light ? colors.primary : colors.secondary}
    />
  );
};

export { Loader };
