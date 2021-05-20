/* eslint-disable curly */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export type CardData = {
  title?: string;
  subTitle?: string;
  image: object;
};

export type CardProps = {
  cardData: CardData;
  onClick?: () => void;
  height: string | number;
  width: string | number;
  style?: StyleProp<ViewStyle>;
};

const Card: React.FC<CardProps> = function (props) {
  const onClickHandler = () => {
    if (props.onClick) props.onClick();
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onClickHandler}>
      <Animated.View
        style={[
          styles.imageView,
          {
            height: heightPercentageToDP(props.height),
            width: widthPercentageToDP(props.width),
          },
          props.style,
        ]}>
        <Image
          style={[
            styles.image,
            {
              height: heightPercentageToDP(props.height),
              width: widthPercentageToDP(props.width),
            },
          ]}
          source={props.cardData.image}
        />
        <View style={styles.titleView}>
          {props.cardData.title ? (
            <Text style={styles.title}>{props.cardData.title}</Text>
          ) : null}
          {props.cardData.subTitle ? (
            <Text style={styles.subTitle}>{props.cardData.subTitle}</Text>
          ) : null}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {},
  imageView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: widthPercentageToDP(2.5),
    marginLeft: widthPercentageToDP(4),
  },
  titleView: {
    position: 'absolute',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: heightPercentageToDP(2.3),
  },
  subTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: heightPercentageToDP(1.3),
    fontWeight: '400',
  },
  image: {
    borderRadius: heightPercentageToDP(2.5),
    width: widthPercentageToDP('65'),
    height: heightPercentageToDP('60'),
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
});

export default Card;
