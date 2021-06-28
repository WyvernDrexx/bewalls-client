import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { Wallpaper } from '../../generated/graphql';
import { useTheme } from '../../hooks';
import { isLastElement } from '../../utilities';
import { CarouselItem } from './CarouselItem';

type CarouselProps = {
  hideText?: boolean;
  onClick?: (select: Wallpaper) => void;
  items: Wallpaper[];
};

const Carousel: React.FC<CarouselProps> = function (props) {
  const scrollOffsetX = useSharedValue(0);
  const { themedStyles } = useTheme();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const x = event.contentOffset.x;
      scrollOffsetX.value = x;
    },
  });

  if (!props.items) return null;

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        style={styles.root}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        overScrollMode="never">
        {props.items.map((item, i) => {
          return (
            <CarouselItem
              offsetX={scrollOffsetX}
              isLastItem={isLastElement(i, props.items.length)}
              index={i}
              key={item.id}
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
  root: {},
});

export default Carousel;
