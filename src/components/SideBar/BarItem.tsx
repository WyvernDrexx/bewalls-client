import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { hp, wp } from '../../utilities';
import { useTheme, useUser } from '../../hooks';
import { RootStackParamList } from '../../navigation/types';

type BarItemProps = {
  isActive?: boolean;
  route: keyof RootStackParamList;
  title: string;
  onClick: (route: keyof RootStackParamList) => void;
  hideWhenLoggedIn?: boolean;
};

const BarItem: React.FC<BarItemProps> = props => {
  const { themedStyles, theme } = useTheme();
  const { isVerified } = useUser();
  const onClick = () => {
    props.onClick(props.route);
  };

  if (props.hideWhenLoggedIn && isVerified) return null;
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
      <Text style={[styles.text, themedStyles.text]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2.5),
  },
  text: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
  },
});

export default BarItem;
