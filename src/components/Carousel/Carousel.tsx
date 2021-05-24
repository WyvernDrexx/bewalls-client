import React from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { CarouselItem } from './CarouselItem';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useThemeStyles } from '../../hooks';
import { Wallpaper } from '../../types';

type CarouselProps = {
  disableText?: boolean;
  onClick?: (select: Wallpaper, index: number) => void;
  items: Wallpaper[];
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
        {props.items.map((item, i) => {
          return (
            <CarouselItem
              x={scrollOffsetX}
              style={{}}
              lastIndex={props.items.length - 1}
              index={i}
              key={i}
              data={item}
              disableText={props.disableText}
              onClick={props.onClick}
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
