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
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Wallpaper } from '../../types';

type CarouselItemProps = {
  data: Wallpaper;
  index: number;
  lastIndex: number;
  style: StyleProp<ViewStyle>;
  x: Animated.SharedValue<number>;
  disableText?: boolean;
  onClick?: (select: Wallpaper, index: number) => void;
};

const CarouselItem = function (props: CarouselItemProps) {
  const width = widthPercentageToDP(67);
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      props.x.value,
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

  const onClickHandler = () => {
    if (props.onClick) props.onClick(props.data, props.index);
  };

  return (
    <Animated.View
      style={[
        styles.root,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          paddingLeft:
            props.index === 0
              ? widthPercentageToDP('17.5')
              : widthPercentageToDP(1),
          paddingRight:
            props.index === props.lastIndex ? widthPercentageToDP(17.5) : 0,
        },
      ]}>
      <TouchableOpacity activeOpacity={0.8} onPress={onClickHandler}>
        <Animated.View style={[animatedStyle, styles.imageView]}>
          <Image
            style={styles.image}
            source={props.data.imageSource! || props.data.imageUri!}
          />
          {!props.disableText ? (
            <View style={styles.titleView}>
              <Text style={styles.title}>{props.data.title}</Text>
              <Text style={styles.subTitle}>Wallpapers</Text>
            </View>
          ) : null}
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: heightPercentageToDP(4),
  },
  imageView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: heightPercentageToDP(5),
    width: widthPercentageToDP('75'),
    height: heightPercentageToDP('75'),
  },
  titleView: {
    position: 'absolute',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: heightPercentageToDP(5),
  },
  subTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: heightPercentageToDP(3),
    fontWeight: '400',
  },
  image: {
    borderRadius: heightPercentageToDP(5),
    width: widthPercentageToDP('75'),
    height: heightPercentageToDP('75'),
    resizeMode: 'cover',
  },
});

export { CarouselItem };
