import React from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';

import CheckSvg from './check.svg';

export type OptionType = {
  title: string;
  id: string | number;
};

type OptionProps = {
  option: OptionType;
  onClick?: (id: string | number) => void;
  isSelected?: boolean;
  style?: StyleProp<ViewStyle>;
};

function Option(props: OptionProps) {
  const {
    themedStyles,
    theme: { colors },
  } = useTheme();

  const handleClick = () => {
    if (props.onClick) props.onClick(props.option.id);
  };

  return (
    <TouchableWithoutFeedback
      onPress={handleClick}
      style={[styles.root, themedStyles.bgDark, props.style]}>
      <Text style={[styles.optionText, themedStyles.text]}>
        {props.option.title}
      </Text>
      {props.isSelected ? (
        <CheckSvg
          style={styles.checkIcon}
          height={hp(3)}
          width={hp(3)}
          fill={colors.secondary}
        />
      ) : null}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: hp(2),
    width: wp(100),
    height: hp(8),
  },
  optionText: {
    fontSize: hp(2.5),
  },
  checkIcon: {
    marginLeft: wp(3),
  },
});

export default Option;
