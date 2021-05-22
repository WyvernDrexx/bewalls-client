import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { CarouselItemType } from './Carousel';

type CarouselItemProps = {
  data: CarouselItemType;
  index: number;
  lastIndex: number;
  style: StyleProp<ViewStyle>;
  x: Animated.SharedValue<number>;
  disableText?: boolean;
};

const CarouselItem = function (props: CarouselItemProps) {
  const width = widthPercentageToDP(67);
  const animatedStyle = useAnimatedStyle(() => {
    console.log(
      `Start:${props.index * width} | End:${width * (props.index + 1)}`,
    );
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
      <Animated.View style={[animatedStyle, styles.imageView]}>
        <Image style={styles.image} source={props.data.image} />
        {!props.disableText ? (
          <View style={styles.titleView}>
            <Text style={styles.title}>{props.data.title}</Text>
            <Text style={styles.subTitle}>{props.data.subTitle}</Text>
          </View>
        ) : null}
      </Animated.View>
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
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
    borderRadius: heightPercentageToDP(5),
    marginBottom: heightPercentageToDP(6),
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
    backgroundColor: 'white',
  },
});

export { CarouselItem };
