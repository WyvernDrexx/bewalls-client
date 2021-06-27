import React from 'react';
import { ActivityIndicator } from 'react-native';

type LoaderProps = {
  color?: string;
};

const Loader: React.FC<LoaderProps> = function (props) {
  return <ActivityIndicator color={props.color || 'black'} />;
};

export { Loader };
