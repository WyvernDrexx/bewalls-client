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
import { useThemeStyles } from '../../hooks';

export type CardData = {
  title?: string;
  subTitle?: string;
  image: object;
};

type CardProps = {
  cardData: CardData;
  onClick?: (select: CardData) => void;
  height: string | number;
  width: string | number;
  style?: StyleProp<ViewStyle>;
};

const Card: React.FC<CardProps> = function (props) {
  const themeStyles = useThemeStyles();

  const onClickHandler = () => {
    if (props.onClick) props.onClick(props.cardData);
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onClickHandler}>
      <Animated.View
        style={[
          styles.imageView,
          themeStyles.bg,
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
            <Text style={[styles.title]}>{props.cardData.title}</Text>
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
    borderRadius: widthPercentageToDP(1.5),
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
    borderRadius: heightPercentageToDP(1.5),
    width: widthPercentageToDP('65'),
    height: heightPercentageToDP('60'),
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
});

export default Card;
