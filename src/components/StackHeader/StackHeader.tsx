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
};

const StackHeader: React.FC<StackHeaderProps> = function (props) {
  const [themeStyles, { colors }] = useTheme();

  return (
    <Animated.View style={[styles.root, themeStyles.bg, props.viewStyle]}>
      <View style={styles.header}>
        <View style={styles.leftView}>
          <TouchableOpacity
            onPress={props.onLeftClick}
            style={styles.leftArrow}>
            <LeftArrowSvg
              fill={colors.secondary}
              height={hp(3)}
              width={hp(3)}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.middleText,
            { textAlign: props.titlePosition || 'center' },
            themeStyles.text,
          ]}>
          {props.title || 'Title'}
        </Text>
        <View style={styles.rightView} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'pink',
    paddingHorizontal: wp(4),
    paddingVertical: hp(3),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftView: {
    width: wp(30.66),
    marginLeft: wp(-2),
  },
  leftArrow: {
    width: wp(12),
  },
  middleText: {
    width: wp(30.66),
    fontSize: hp(2.6),
  },
  rightView: {
    width: wp(30.66),
  },
});

export default StackHeader;
