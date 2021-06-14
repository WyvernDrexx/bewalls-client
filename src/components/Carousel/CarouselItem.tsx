import React from 'react';
import { Image, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import MountAnimatedView from '../MountAnimatedView';

import { hp, wp } from '../../utilities';
import { Wallpaper } from '../../generated/graphql';
import LinearGradient from 'react-native-linear-gradient';

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
  const width = wp(73);

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

  return (
    <MountAnimatedView>
      <Animated.View
        style={[
          styles.root,
          props.index === 0 ? styles.firstItem : {},
          props.isLastItem ? styles.lastItem : {},
        ]}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleClick}>
          <Animated.View style={[animatedStyle, styles.imageView]}>
            <Image style={styles.image} source={{ uri: props.data.imageUri }} />
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
    </MountAnimatedView>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: hp(4),
    paddingLeft: wp(1),
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
    fontSize: hp(3),
    position: 'absolute',
    bottom: hp(2),
    width: wp(80),
  },
  subTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: hp(3),
    fontWeight: '400',
  },
  image: {
    borderRadius: hp(5),
    width: wp('80'),
    height: hp('80'),
    resizeMode: 'cover',
  },
  firstItem: {
    paddingLeft: wp('14'),
  },
  lastItem: {
    paddingRight: wp(15 - 2), //Subtract 2% of the extra padding from root
  },
});

export { CarouselItem };
