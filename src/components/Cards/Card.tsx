import React, { useState } from 'react';
import { Image, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { Wallpaper } from '../../generated/graphql';
import { useTheme } from '../../hooks';
import { ItemGroup } from '../../types';
import { hp, wp } from '../../utilities';
import { LoadingView } from '../Loader/LoadingView';

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
  const [imageLoading, setImageLoading] = useState(true);
  const height = hp(props.height);
  const width = wp(props.width);
  const { themedStyles } = useTheme();

  const handleClick = React.useCallback(() => {
    if (props.onClick) props.onClick(props.wallpaper!, props.group);
  }, [props.wallpaper]);

  const handleImageLoad = () => {
    setImageLoading(false);
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
          props.style,
          themedStyles.bg,
        ]}>
        <Image
          onLoadEnd={handleImageLoad}
          progressiveRenderingEnabled
          style={[
            styles.image,
            {
              height,
              width,
            },
          ]}
          source={{ uri: props.wallpaper?.imageSmall }}
        />
        <LoadingView
          light
          style={styles.loadingView}
          loading={!imageLoading}
          height={height}
          width={width}
        />
        {!props.hideText ? (
          <LinearGradient
            colors={['transparent', 'rgba(21, 21, 21, 0.7)']}
            style={[styles.textView, { height: height / 2, width }]}>
            <Text style={styles.title}>
              {props.wallpaper!.name.slice(0, 16)}
            </Text>
          </LinearGradient>
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
    borderRadius: hp(1.5),
    marginLeft: wp(2),
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
    fontSize: wp(4),
    position: 'absolute',
    bottom: hp(1),
    left: wp(3),
  },
  image: {
    borderRadius: hp(1.5),
    width: wp('65'),
    height: hp('60'),
    resizeMode: 'cover',
  },
  loadingView: {
    position: 'absolute',
  },
});

export { Card };
