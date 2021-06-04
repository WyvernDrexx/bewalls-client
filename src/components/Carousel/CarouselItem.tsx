import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { hp, wp } from '../../utilities';

import { WallpaperType } from '../../types';
import MountAnimatedView from '../MountAnimatedView';

type CarouselItemProps = {
  data: WallpaperType;
  index: number;
  isLastItem: boolean;
  style?: StyleProp<ViewStyle>;
  offsetX: Animated.SharedValue<number>;
  hideText?: boolean;
  onClick?: (select: WallpaperType, index: number) => void;
};

const CarouselItem = function (props: CarouselItemProps) {
  const width = wp(67);

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
    if (props.onClick) props.onClick(props.data, props.index);
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
            <Image
              style={styles.image}
              source={props.data.imageSource! || props.data.imageUri!}
            />
            {!props.hideText ? (
              <View style={styles.titleView}>
                <Text style={styles.title}>{props.data.title}</Text>
                <Text style={styles.subTitle}>Wallpapers</Text>
              </View>
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
    width: wp('75'),
    height: hp('75'),
  },
  titleView: {
    position: 'absolute',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp(5),
  },
  subTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: hp(3),
    fontWeight: '400',
  },
  image: {
    borderRadius: hp(5),
    width: wp('75'),
    height: hp('75'),
    resizeMode: 'cover',
  },
  firstItem: {
    paddingLeft: wp('17.5'),
  },
  lastItem: {
    paddingRight: wp(17.5 - 2), //Subtract 2% of the extra padding from root
  },
});

export { CarouselItem };
