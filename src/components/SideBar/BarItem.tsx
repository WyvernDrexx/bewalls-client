import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useTheme } from '../../hooks';
import { RootStackParamList } from '../../navigation/types';

type BarItemProps = {
  isActive?: boolean;
  route: keyof RootStackParamList;
  title: string;
  onClick: (route: keyof RootStackParamList) => void;
};

const BarItem: React.FC<BarItemProps> = props => {
  const [, theme] = useTheme();

  const onClick = () => {
    props.onClick(props.route);
  };

  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.5}
      style={[
        styles.root,
        {
          backgroundColor: props.isActive
            ? theme.colors.light
            : theme.colors.primary,
        },
      ]}>
      <Text style={[styles.text]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: widthPercentageToDP(4),
    paddingVertical: heightPercentageToDP(2.5),
  },
  text: {
    fontSize: heightPercentageToDP(2.5),
    fontWeight: 'bold',
  },
});

export default BarItem;
