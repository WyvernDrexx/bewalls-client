import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { CarouselItem } from './CarouselItem';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

export type CarouselItemType = {
  title: string;
  subTitle: string;
  image: object;
};

const CAROUSEL_ITEMS: CarouselItemType[] = [
  {
    title: 'OnePlus',
    subTitle: 'Wallpapers',
    image: require('./1.jpg'),
  },
  {
    title: 'Samsung',
    subTitle: 'Wallpapers',
    image: require('./2.jpg'),
  },
  {
    title: 'Realme',
    subTitle: 'Wallpapers',
    image: require('./3.jpg'),
  },
];

const Carousel = function () {
  const scrollOffsetX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const x = event.contentOffset.x;
      scrollOffsetX.value = x;
    },
  });

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        {CAROUSEL_ITEMS.map((item, i) => {
          return (
            <CarouselItem
              x={scrollOffsetX}
              style={{}}
              lastIndex={CAROUSEL_ITEMS.length - 1}
              index={i}
              key={i}
              data={item}
            />
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: heightPercentageToDP('6%'),
    marginHorizontal: widthPercentageToDP('-4'),
    backgroundColor: 'white',
  },
});

export default Carousel;
