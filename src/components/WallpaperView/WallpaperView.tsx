import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import LeftArrow from './left-arrow.svg';

type WallpaperViewProps = {
  animatedStyle: StyleProp<ViewStyle>;
  onCloseClick?: () => void;
  image: object;
};

export default function WallpaperView(props: WallpaperViewProps) {
  return (
    <Animated.View style={[props.animatedStyle, styles.root]}>
      <View>
        <Image style={styles.image} source={props.image} />
      </View>
      <TouchableOpacity onPress={props.onCloseClick} style={styles.arrow}>
        <LeftArrow
          fill="white"
          height={heightPercentageToDP(4)}
          width={heightPercentageToDP(4)}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
    position: 'absolute',
    backgroundColor: 'white',
  },
  image: {
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
    resizeMode: 'stretch',
  },
  arrow: {
    position: 'absolute',
    top: heightPercentageToDP(4),
    left: widthPercentageToDP(2),
  },
});
