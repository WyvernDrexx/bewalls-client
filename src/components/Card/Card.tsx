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
import { Wallpaper } from '../../types';

type CardProps = {
  wallpaper: Wallpaper;
  onClick?: (select: Wallpaper, index: number) => void;
  height: string | number;
  width: string | number;
  style?: StyleProp<ViewStyle>;
  index?: number;
  disableText?: boolean;
};

const Card: React.FC<CardProps> = function (props) {
  const themeStyles = useThemeStyles();

  const onClickHandler = () => {
    if (props.onClick) props.onClick(props.wallpaper, props.index!);
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
          source={props.wallpaper.imageSource! || props.wallpaper.imageUri!}
        />
        {!props.disableText ? (
          <View style={styles.titleView}>
            {props.wallpaper.title ? (
              <Text style={[styles.title]}>{props.wallpaper.title}</Text>
            ) : null}
            {props.wallpaper.brand ? (
              <Text style={styles.subTitle}>Wallpapers</Text>
            ) : null}
          </View>
        ) : null}
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
  },
});

export default Card;
