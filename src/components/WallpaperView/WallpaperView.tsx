import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { BottomDraggable } from './BottomDraggable';

import LeftArrow from './left-arrow.svg';

type WallpaperViewProps = {
  animatedStyle: StyleProp<ViewStyle>;
  onCloseClick?: () => void;
  image: object;
};

export default function WallpaperView(props: WallpaperViewProps) {
  return (
    <Animated.View style={[props.animatedStyle, styles.root]}>
      <Image style={styles.image} source={props.image} />
      <TouchableOpacity onPress={props.onCloseClick} style={styles.arrow}>
        <LeftArrow
          fill="white"
          height={heightPercentageToDP(4)}
          width={heightPercentageToDP(4)}
        />
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
});
