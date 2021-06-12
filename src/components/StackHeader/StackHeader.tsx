import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

import Animated from 'react-native-reanimated';

import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';

import LeftArrowSvg from './left-arrow.svg';

type StackHeaderProps = {
  title?: string;
  titlePosition?: 'left' | 'center' | 'right';
  viewStyle?: StyleProp<ViewStyle>;
  onLeftClick?: () => void;
  right?: React.FC;
};

const StackHeader: React.FC<StackHeaderProps> = function (props) {
  const {
    themedStyles,
    theme: { colors },
  } = useTheme();

  return (
    <Animated.View style={[styles.root, themedStyles.bg, props.viewStyle]}>
      <View style={styles.header}>
        <View style={styles.leftView}>
          <TouchableOpacity
            onPress={props.onLeftClick}
            style={styles.leftArrow}>
            <LeftArrowSvg
              fill={colors.secondary}
              height={hp(4)}
              width={hp(4)}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.middleText,
            { textAlign: props.titlePosition || 'center' },
            themedStyles.text,
          ]}>
          {props.title || 'Title'}
        </Text>
        <View style={styles.rightView}>
          {props.right ? <props.right /> : null}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'pink',
    paddingHorizontal: wp(4),
    paddingVertical: hp(3),
    width: wp(100),
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftView: {
    marginLeft: wp(-2),
    width: wp(8),
    marginRight: wp(3),
  },
  leftArrow: {},
  middleText: {
    fontSize: hp(2.6),
    width: wp(60),
    textAlign: 'left',
  },
  rightView: {
    width: wp(24.66),
  },
});

export default StackHeader;
