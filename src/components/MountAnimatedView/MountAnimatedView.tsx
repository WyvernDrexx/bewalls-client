import React, { useEffect } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type MountAnimatedViewProps = {
  style?: StyleProp<ViewStyle>;
  animationDelay?: number;
};

const MountAnimatedView: React.FC<MountAnimatedViewProps> = function (props) {
  const opacity = useSharedValue(0);

  const uas = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value),
    };
  });

  useEffect(() => {
    setTimeout(() => {
      opacity.value = 1;
    }, props.animationDelay || 150);
  }, []);

  return (
    <Animated.View style={[styles.root, props.style, uas]}>
      {props.children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default MountAnimatedView;
