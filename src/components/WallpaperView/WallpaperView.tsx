import React, { useEffect } from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { BottomDraggable } from './BottomDraggable';

import { hp, wp } from '../../utilities';

import DownArrowSvg from './down-arrow.svg';
import { Wallpaper } from '../../generated/graphql';
import { useUser } from '../../hooks';
import { apolloClient } from '../../apollo';
import { gql } from '@apollo/client';

type WallpaperViewProps = {
  animatedStyle?: StyleProp<ViewStyle>;
  onCloseClick?: () => void;
  wallpaper?: Wallpaper;
  showWallpaper?: boolean;
  isFavourite?: boolean;
};

export default function WallpaperView(props: WallpaperViewProps) {
  const screenHeight = hp(100);
  const offsetY = useSharedValue(screenHeight);
  const user = useUser();
  useEffect(() => {
    if (props.showWallpaper) {
      offsetY.value = 0;
    } else {
      offsetY.value = screenHeight;
    }
  }, [props.showWallpaper]);

  const handleCloseClick = () => {
    offsetY.value = screenHeight;
    if (props.onCloseClick) props.onCloseClick();
  };

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(offsetY.value, [0, screenHeight], [1, 0]);

    return {
      transform: [
        {
          translateY: Animated.withTiming(offsetY.value),
        },
      ],
      opacity: Animated.withTiming(opacity),
    };
  });

  if (!props.wallpaper) return null;

  const handleFavourite = async (id: String) => {
    if (user.isVerified) {
      try {
        const { data } = await apolloClient.mutate<{
          addToFavourite: Wallpaper | null;
        }>({
          mutation: gql`
            mutation ($token: String!, $wallpaperId: String!) {
              addToFavourite(token: $token, wallpaperId: $wallpaperId) {
                name
              }
            }
          `,
          variables: {
            token: user.token,
            wallpaperId: id,
          },
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Animated.View style={[animatedStyle, styles.root]}>
      <Image style={styles.image} source={{ uri: props.wallpaper.imageUri }} />
      <TouchableOpacity onPress={handleCloseClick} style={styles.arrow}>
        <DownArrowSvg style={styles.arrowIcon} fill="white" />
      </TouchableOpacity>
      <BottomDraggable
        onFavourite={handleFavourite}
        wallpaper={props.wallpaper}
        isFavourite={props.isFavourite}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: hp(100),
    width: wp(100),
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
  },
  image: {
    position: 'absolute',
    height: hp(100),
    width: wp(100),
    resizeMode: 'cover',
  },
  arrow: {
    position: 'absolute',
    top: hp(4),
    left: wp(2),
  },
  arrowIcon: {
    height: hp(4),
    width: hp(4),
    opacity: 0.8,
  },
});
