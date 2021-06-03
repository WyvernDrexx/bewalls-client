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
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { WallpaperType } from '../../types';
import { BottomDraggable } from './BottomDraggable';

import LeftArrowSvg from './left-arrow.svg';

type WallpaperViewProps = {
  animatedStyle?: StyleProp<ViewStyle>;
  onCloseClick?: () => void;
  wallpaper?: WallpaperType;
  showWallpaper?: boolean;
};

export default function WallpaperView(props: WallpaperViewProps) {
  const screenHeight = heightPercentageToDP(100);
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
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
  },
  image: {
    position: 'absolute',
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
    resizeMode: 'cover',
  },
  arrow: {
    position: 'absolute',
    top: heightPercentageToDP(4),
    left: widthPercentageToDP(2),
  },
  arrowIcon: {
    height: heightPercentageToDP(4),
    width: heightPercentageToDP(4),
  },
});
