import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
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
