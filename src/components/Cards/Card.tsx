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
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import Animated from 'react-native-reanimated';

import { useTheme } from '../../hooks';

import { WallpaperType } from '../../types';

type CardProps = {
  wallpaper: WallpaperType;
  onClick?: (wallpaper: WallpaperType, index: number) => void;
  height: string | number;
  width: string | number;
  style?: StyleProp<ViewStyle>;
  index?: number;
  hideText?: boolean;
};

const Card: React.FC<CardProps> = function (props) {
  const height = heightPercentageToDP(props.height);
  const width = widthPercentageToDP(props.width);
  const [themeStyles] = useTheme();

  const handleClick = () => {
    if (props.onClick) props.onClick(props.wallpaper, props.index || 0);
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleClick}>
      <Animated.View
        style={[
          {
            height,
            width,
          },
          styles.imageView,
          themeStyles.bg,
          props.style,
        ]}>
        <Image
          style={[
            styles.image,
            {
              height,
              width,
            },
          ]}
          source={props.wallpaper.imageSource! || props.wallpaper.imageUri!}
        />
        {!props.hideText ? (
          <View style={styles.textView}>
            <Text style={styles.title}>{props.wallpaper.title}</Text>
            <Text style={styles.subTitle}>Wallpapers</Text>
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
  textView: {
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

export { Card };
