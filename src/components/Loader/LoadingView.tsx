import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';
import { Loader } from './Loader';

type LoadingViewProps = {
  style?: StyleProp<ViewStyle>;
  height?: string | number;
  width?: string | number;
  loading?: boolean;
  color?: string;
};

const LoadingView: React.FC<LoadingViewProps> = function (props) {
  const height = props.height || 10;
  const width = props.width || 100;
  const { theme } = useTheme();
  const color = props.color || theme.colors.primary;
  if (props.loading) return null;
  return (
    <View
      style={[
        styles.root,
        { height: hp(height), width: wp(width) },
        props.style,
      ]}>
      <Loader color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { LoadingView };
