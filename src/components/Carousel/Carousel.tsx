import React from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { CarouselItem } from './CarouselItem';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useThemeStyles } from '../../hooks';

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

type CarouselProps = {
  disableText?: boolean;
};

const Carousel: React.FC<CarouselProps> = function (props) {
  const scrollOffsetX = useSharedValue(0);
  const themeStyles = useThemeStyles();
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const x = event.contentOffset.x;
      scrollOffsetX.value = x;
    },
  });

  return (
    <View style={[styles.root, themeStyles.bg]}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        alwaysBounceHorizontal={false}
        overScrollMode="never"
        bounces={false}>
        {CAROUSEL_ITEMS.map((item, i) => {
          return (
            <CarouselItem
              x={scrollOffsetX}
              style={{}}
              lastIndex={CAROUSEL_ITEMS.length - 1}
              index={i}
              key={i}
              data={item}
              disableText={props.disableText}
            />
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginHorizontal: widthPercentageToDP('-4'),
  },
});

export default Carousel;
