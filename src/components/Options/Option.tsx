import React from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';
import CheckSvg from './check.svg';

export type OptionType = {
  title: string;
  id: number;
};

type OptionProps = {
  option: OptionType;
  onClick?: (id: number) => void;
  isSelected?: boolean;
  isFirstElement?: boolean;
  isLastElement?: boolean;
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
      style={[
        styles.root,
        themedStyles.bgSecondary,
        props.style,
        props.isFirstElement ? styles.firstElement : {},
        props.isLastElement ? styles.lastElement : {},
      ]}>
      <Text style={[styles.optionText, themedStyles.textLight]}>
        {props.option.title}
      </Text>
      {props.isSelected ? (
        <CheckSvg
          style={styles.checkIcon}
          height={wp(4)}
          width={wp(4)}
          fill={colors.primary}
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
    width: wp(90),
  },
  optionText: {
    fontSize: wp(4),
  },
  checkIcon: {
    marginLeft: wp(3),
  },
  lastElement: {
    borderBottomLeftRadius: wp(2),
    borderBottomRightRadius: wp(2),
  },
  firstElement: {
    borderTopLeftRadius: wp(2),
    borderTopRightRadius: wp(2),
  },
});

export default Option;
