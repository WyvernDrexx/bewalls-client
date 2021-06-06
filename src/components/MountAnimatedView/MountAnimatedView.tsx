import React, { useEffect } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { useTheme } from '../../hooks';

type MountAnimatedViewProps = {
  style?: StyleProp<ViewStyle>;
  animationDelay?: number;
  renderTriggerValue?: boolean | string | number;
  clean?: boolean;
};

const MountAnimatedView: React.FC<MountAnimatedViewProps> = function (props) {
  const intialOpacity = 0.5;
  const opacity = useSharedValue(intialOpacity);
  const { themedStyles } = useTheme();
  const uas = useAnimatedStyle(() => {
    return {
      opacity: Animated.withTiming(opacity.value),
    };
  });

  useEffect(() => {
    if (typeof props.renderTriggerValue !== 'undefined') {
      opacity.value = intialOpacity;
      setTimeout(() => {
        opacity.value = 1;
      }, 50);
    }
  }, [props.renderTriggerValue]);

  useEffect(() => {
    setTimeout(() => {
      opacity.value = 1;
    }, props.animationDelay || 100);
  }, []);

  if (props.clean) {
    return (
      <Animated.View style={[styles.root, props.style, uas]}>
        {props.children}
      </Animated.View>
    );
  }

  return (
    <View style={[styles.main, themedStyles.bg]}>
      <Animated.View style={[styles.root, props.style, uas]}>
        {props.children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  main: {
    backgroundColor: 'white',
  },
});

export default MountAnimatedView;
