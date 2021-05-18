import React from 'react';

import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

type SideBarProps = {
  isShown?: boolean;
  animatedStyle?: StyleProp<ViewStyle>;
};

const SideBar: React.FC<SideBarProps> = function (props) {
  return (
    <Animated.View style={[props.animatedStyle, styles.root]}>
      <Text>SideBar</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    width: widthPercentageToDP(75),
    height: heightPercentageToDP(100),
    padding: heightPercentageToDP(3),
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
});

export default SideBar;
