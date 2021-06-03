import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import Animated from 'react-native-reanimated';

import { useTheme } from '../../hooks';

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
              height={heightPercentageToDP(3)}
              width={heightPercentageToDP(3)}
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
    paddingHorizontal: widthPercentageToDP(4),
    paddingVertical: heightPercentageToDP(3),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftView: {
    width: widthPercentageToDP(30.66),
    marginLeft: widthPercentageToDP(-2),
  },
  leftArrow: {
    width: widthPercentageToDP(12),
  },
  middleText: {
    width: widthPercentageToDP(30.66),
    fontSize: heightPercentageToDP(2.6),
  },
  rightView: {
    width: widthPercentageToDP(30.66),
  },
});

export default StackHeader;
