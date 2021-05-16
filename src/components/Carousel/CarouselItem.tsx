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
};

const CarouselItem = function (prop: CarouselItemProps) {
  const width = widthPercentageToDP(67);
  const animatedStyle = useAnimatedStyle(() => {
    console.log(
      `Start:${prop.index * width} | End:${width * (prop.index + 1)}`,
    );
    const scale = interpolate(
      prop.x.value,
      [(prop.index - 1) * width, width * prop.index, width * (prop.index + 1)],
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
            prop.index === 0
              ? widthPercentageToDP('17.5')
              : widthPercentageToDP(1),
          paddingRight:
            prop.index === prop.lastIndex ? widthPercentageToDP(17.5) : 0,
        },
      ]}>
      <Animated.View style={[animatedStyle, styles.imageView]}>
        <Image style={styles.image} source={prop.data.image} />
        <View style={styles.titleView}>
          <Text style={styles.title}>{prop.data.title}</Text>
          <Text style={styles.subTitle}>{prop.data.subTitle}</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {},
  imageView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
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
    width: widthPercentageToDP('65'),
    height: heightPercentageToDP('60'),
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
});

export { CarouselItem };
