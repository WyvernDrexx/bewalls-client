import React, { useEffect } from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { BottomDraggable } from './BottomDraggable';

import { hp, wp } from '../../utilities';
import { WallpaperType } from '../../types';

import LeftArrowSvg from './left-arrow.svg';

type WallpaperViewProps = {
  animatedStyle?: StyleProp<ViewStyle>;
  onCloseClick?: () => void;
  wallpaper?: WallpaperType;
  showWallpaper?: boolean;
};

export default function WallpaperView(props: WallpaperViewProps) {
  const screenHeight = hp(100);
  const offsetY = useSharedValue(screenHeight);

  useEffect(() => {
    if (props.showWallpaper) {
      offsetY.value = 0;
    } else {
      offsetY.value = screenHeight;
    }
  }, [props.showWallpaper]);

  const handleCloseClick = () => {
    offsetY.value = screenHeight;
    if (props.onCloseClick) props.onCloseClick();
  };

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(offsetY.value, [0, screenHeight], [1, 0]);

    return {
      transform: [
        {
          translateY: Animated.withTiming(offsetY.value),
        },
      ],
      opacity: Animated.withTiming(opacity),
    };
  });

  if (!props.wallpaper) return null;

  return (
    <Animated.View style={[animatedStyle, styles.root]}>
      <Image
        style={styles.image}
        source={props.wallpaper.imageSource! || props.wallpaper.imageUri!}
      />
      <TouchableOpacity onPress={handleCloseClick} style={styles.arrow}>
        <LeftArrowSvg style={styles.arrowIcon} fill="white" />
      </TouchableOpacity>
      <BottomDraggable />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: hp(100),
    width: wp(100),
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
  },
  image: {
    position: 'absolute',
    height: hp(100),
    width: wp(100),
    resizeMode: 'cover',
  },
  arrow: {
    position: 'absolute',
    top: hp(4),
    left: wp(2),
  },
  arrowIcon: {
    height: hp(4),
    width: hp(4),
  },
});
