import React, { useEffect } from 'react';

import { Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
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
  const sideBarWidth = widthPercentageToDP(75);
  const sideBarShown = useSharedValue(props.isShown);

  useEffect(() => {
    sideBarShown.value = props.isShown;
  }, [props.isShown, sideBarShown]);

  const sideBarStyle = useAnimatedStyle(() => {
    const offsetX = interpolate(
      Number(sideBarShown.value),
      [0, 1],
      [-sideBarWidth, 0],
    );

    return {
      transform: [
        {
          translateX: Animated.withTiming(offsetX),
        },
      ],
    };
  });

  return (
    <Animated.View style={[sideBarStyle, styles.root]}>
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
