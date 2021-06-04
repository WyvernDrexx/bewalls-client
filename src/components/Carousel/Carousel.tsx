import React from 'react';
import { StyleSheet, View } from 'react-native';
import { wp } from '../../utilities';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import { CarouselItem } from './CarouselItem';

import { useTheme } from '../../hooks';
import { WallpaperType } from '../../types';
import { isLastElement } from '../../utilities';

type CarouselProps = {
  hideText?: boolean;
  onClick?: (select: WallpaperType, index: number) => void;
  items: WallpaperType[];
};

const Carousel: React.FC<CarouselProps> = function (props) {
  const scrollOffsetX = useSharedValue(0);
  const [themeStyles] = useTheme();

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
        overScrollMode="never">
        {props.items.map((item, i) => {
          return (
            <CarouselItem
              offsetX={scrollOffsetX}
              isLastItem={isLastElement(i, props.items.length)}
              index={i}
              key={i}
              data={item}
              hideText={props.hideText}
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
    marginHorizontal: wp('-4'),
  },
});

export default Carousel;
