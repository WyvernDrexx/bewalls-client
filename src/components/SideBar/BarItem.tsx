import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { hp, wp } from '../../utilities';
import { useTheme, useUser } from '../../hooks';
import { RootStackParamList } from '../../navigation/types';
import { SvgProps } from 'react-native-svg';

type BarItemProps = {
  isActive?: boolean;
  route: keyof RootStackParamList;
  title: string;
  onClick: (route: keyof RootStackParamList) => void;
  hideWhenLoggedIn?: boolean;
  icon: React.FC<SvgProps>;
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
      <props.icon fill={theme.colors.secondary} height={hp(4)} width={hp(4)} />
      <Text style={[styles.text, themedStyles.text]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2.5),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginLeft: wp(5),
  },
});

export default BarItem;
