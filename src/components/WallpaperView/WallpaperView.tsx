import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
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
import {
  Tag,
  useAddToFavouriteMutation,
  Wallpaper,
} from '../../generated/graphql';
import { useAlerts, useUser } from '../../hooks';
import { hp, wp } from '../../utilities';
import { BottomDraggable } from './BottomDraggable';
import DownArrowSvg from './down-arrow.svg';

type WallpaperViewProps = {
  animatedStyle?: StyleProp<ViewStyle>;
  onCloseClick?: () => void;
  wallpaper?: Wallpaper;
  showWallpaper?: boolean;
  onFavouriteClick?: (id: string) => void;
  afterFavouriteMutation?: (wallpaper: Wallpaper) => void;
};

export default function WallpaperView(props: WallpaperViewProps) {
  const [wallpaper, setWallpaper] = useState(props.wallpaper);
  const navigation = useNavigation<StackNavigationProp<any>>();
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

  const handleTagClick = (tag: Tag) => {
    navigation.push('Selection', {
      title: tag.name,
      group: 'tag',
      groupId: tag.id,
    });
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

  const { dispatchShowAlert } = useAlerts();
  const [addToFavourite] = useAddToFavouriteMutation({
    onCompleted: data => {
      if (!data || data.addToFavourite !== null) {
        setWallpaper(data.addToFavourite as Wallpaper);
        if (data.addToFavourite?.isUsersFavourite) {
          dispatchShowAlert({
            success: 'Added to your favourites!',
          });
        } else {
          dispatchShowAlert({
            success: 'Removed from your favourites!',
          });
        }
        if (props.afterFavouriteMutation) {
          props.afterFavouriteMutation(data.addToFavourite as Wallpaper);
        }
      }
    },
  });

  const handleFavourite = async (id: string) => {
    if (user.isVerified && !props.onFavouriteClick) {
      return addToFavourite({
        variables: {
          id,
        },
      });
    }
    if (user.isVerified && props.onFavouriteClick) {
      props.onFavouriteClick(id);
      return;
    }
  };

  useEffect(() => {
    setWallpaper(props.wallpaper);
  }, [props.wallpaper]);

  if (!wallpaper) return null;

  return (
    <Animated.View style={[animatedStyle, styles.root]}>
      <Image style={styles.image} source={{ uri: wallpaper.imageUri }} />
      <TouchableOpacity onPress={handleCloseClick} style={styles.arrow}>
        <DownArrowSvg style={styles.arrowIcon} fill="white" />
      </TouchableOpacity>
      <BottomDraggable
        onTagClick={handleTagClick}
        onFavourite={handleFavourite}
        wallpaper={wallpaper}
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
