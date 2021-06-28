import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
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
  right?: object;
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
              height={wp(6)}
              width={wp(6)}
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
          {props.right ? props.right : <View style={styles.placeholderView} />}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'pink',
    paddingHorizontal: wp(2),
    paddingVertical: hp(3),
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftView: {
    width: wp(12),
  },
  leftArrow: {},
  middleText: {
    fontSize: wp(4.5),
    flex: 1,
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  rightView: {},
  placeholderView: {
    padding: hp(2),
  },
});

export default StackHeader;
