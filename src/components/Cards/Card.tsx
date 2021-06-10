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
import MountAnimatedView from '../MountAnimatedView';

import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';

import { Wallpaper } from '../../generated/graphql';
import { ItemType } from '../../types';

type CardProps = {
  wallpaper: Wallpaper | null;
  onClick?: (wallpaper: Wallpaper, itemType: ItemType) => void;
  height: string | number;
  width: string | number;
  style?: StyleProp<ViewStyle>;
  index?: number;
  hideText?: boolean;
  itemType: ItemType;
};

const Card: React.FC<CardProps> = function (props) {
  const height = hp(props.height);
  const width = wp(props.width);
  const { themedStyles } = useTheme();

  const handleClick = () => {
    if (props.onClick) props.onClick(props.wallpaper!, props.itemType);
  };

  const imageSource = props.wallpaper!.imageUri
    ? { uri: props.wallpaper!.imageUri }
    : {};

  return (
    <MountAnimatedView>
      <TouchableOpacity activeOpacity={0.8} onPress={handleClick}>
        <Animated.View
          style={[
            {
              height,
              width,
            },
            styles.imageView,
            themedStyles.bg,
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
            source={imageSource}
          />
          {!props.hideText ? (
            <View style={styles.textView}>
              <Text style={styles.title}>{props.wallpaper!.name}</Text>
              <Text style={styles.subTitle}>Wallpapers</Text>
            </View>
          ) : null}
        </Animated.View>
      </TouchableOpacity>
    </MountAnimatedView>
  );
};

const styles = StyleSheet.create({
  root: {},
  imageView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(1.5),
    marginLeft: wp(4),
  },
  textView: {
    position: 'absolute',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp(2.3),
  },
  subTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: hp(1.3),
    fontWeight: '400',
  },
  image: {
    borderRadius: hp(1.5),
    width: wp('65'),
    height: hp('60'),
    resizeMode: 'cover',
  },
});

export { Card };
