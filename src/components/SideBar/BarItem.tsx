import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme, useUser } from '../../hooks';
import { RootStackParamList } from '../../navigation/types';
import { hp, wp } from '../../utilities';

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
      <props.icon fill={theme.colors.secondary} height={wp(6)} width={wp(6)} />
      <Text style={[styles.text, themedStyles.text]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(2.5),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    marginLeft: wp(5),
  },
});

export default BarItem;
