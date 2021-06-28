import React, { useState } from 'react';
import { Image, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Wallpaper } from '../../generated/graphql';
import { hp, wp } from '../../utilities';

type CarouselItemProps = {
  data: Wallpaper;
  index: number;
  isLastItem: boolean;
  style?: StyleProp<ViewStyle>;
  offsetX: Animated.SharedValue<number>;
  hideText?: boolean;
  onClick?: (select: Wallpaper) => void;
};

const CarouselItem = function (props: CarouselItemProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const width = wp(76);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      props.offsetX.value,
      [
        (props.index - 1) * width,
        width * props.index,
        width * (props.index + 1),
      ],
      [0.8, 1, 0.8],
      Extrapolate.CLAMP,
    );

    return { transform: [{ scale }] };
  });

  const handleClick = () => {
    if (props.onClick) props.onClick(props.data);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <Animated.View
      style={[
        styles.root,
        props.index === 0 ? styles.firstItem : {},
        props.isLastItem ? styles.lastItem : {},
      ]}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleClick}>
        <Animated.View style={[animatedStyle, styles.imageView]}>
          <Image
            onLoadEnd={handleImageLoad}
            blurRadius={imageLoading ? 5 : 0}
            progressiveRenderingEnabled
            style={styles.image}
            source={{ uri: props.data.imageUri }}
          />
          {!props.hideText ? (
            <LinearGradient
              colors={['transparent', 'rgba(21, 21, 21, 0.7)']}
              style={[styles.titleView]}>
              <Text style={styles.title}>{props.data.name}</Text>
            </LinearGradient>
          ) : null}
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginRight: wp(-6),
  },
  imageView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(5),
    width: wp('80'),
    height: hp('80'),
  },
  titleView: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: hp(2),
    borderRadius: hp(5),
    width: wp(80),
    height: hp(40),
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: wp(4.5),
    position: 'absolute',
    bottom: hp(2),
    width: wp(80),
  },
  image: {
    borderRadius: hp(5),
    width: wp('80'),
    height: hp('80'),
    resizeMode: 'cover',
  },
  firstItem: {
    paddingLeft: wp('10'),
  },
  lastItem: {
    paddingRight: wp(9), //Subtract 2% of the extra padding from root
    marginRight: 0,
  },
});

export { CarouselItem };
