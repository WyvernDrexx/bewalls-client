import React from 'react';
import { Text, StyleSheet, Image, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Animated from 'react-native-reanimated';
import MountAnimatedView from '../MountAnimatedView';

import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';

import { Wallpaper } from '../../generated/graphql';
import { ItemGroup } from '../../types';
import LinearGradient from 'react-native-linear-gradient';

type CardProps = {
  wallpaper: Wallpaper | null;
  onClick?: (wallpaper: Wallpaper, group: ItemGroup) => void;
  height: string | number;
  width: string | number;
  style?: StyleProp<ViewStyle>;
  index?: number;
  hideText?: boolean;
  group: ItemGroup;
};

const Card: React.FC<CardProps> = function (props) {
  const height = hp(props.height);
  const width = wp(props.width);
  const { themedStyles } = useTheme();

  const handleClick = () => {
    if (props.onClick) props.onClick(props.wallpaper!, props.group);
  };
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
            source={{ uri: props.wallpaper?.imageUri }}
          />
          {!props.hideText ? (
            <LinearGradient
              colors={['transparent', 'rgba(21, 21, 21, 0.7)']}
              style={[styles.textView, { height: height / 2, width }]}>
              <Text style={styles.title}>{props.wallpaper!.name}</Text>
            </LinearGradient>
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
    borderRadius: hp(1.5),
    marginLeft: wp(4),
  },
  textView: {
    position: 'absolute',
    bottom: 0,
    borderRadius: hp(1.5),
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp(2.3),
    position: 'absolute',
    bottom: hp(1),
    left: wp(3),
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
