import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { STYLES } from '../../styles';
import { CarouselItemType } from './Carousel';

type CarouselItemProps = {
  data: CarouselItemType;
  index: number;
  lastIndex: number;
};

const CarouselItem = function (prop: CarouselItemProps) {
  return (
    <View
      style={[
        styles.root,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          paddingLeft:
            prop.index === 0
              ? widthPercentageToDP('17.5')
              : widthPercentageToDP(7),
          paddingRight:
            prop.index === prop.lastIndex ? widthPercentageToDP(15) : 0,
        },
      ]}>
      <View style={[styles.imageView]}>
        <Image style={styles.image} source={prop.data.image} />
        <View style={styles.titleView}>
          <Text style={styles.title}>{prop.data.title}</Text>
          <Text style={styles.subTitle}>{prop.data.subTitle}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  imageView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});

export { CarouselItem };
