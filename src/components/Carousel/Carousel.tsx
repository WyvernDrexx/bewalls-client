import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { CarouselItem } from './CarouselItem';

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
  return (
    <View style={styles.root}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        {CAROUSEL_ITEMS.map((item, i) => (
          <CarouselItem
            lastIndex={CAROUSEL_ITEMS.length - 1}
            index={i}
            key={i}
            data={item}
          />
        ))}
      </ScrollView>
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
