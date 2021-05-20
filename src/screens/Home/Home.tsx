import React, { useState } from 'react';

import { View, StyleSheet, Keyboard } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { CardData } from '../../components/Card/Card';
import { Box, Boxes, MediumSizeCarousel } from '../../components/Carousel';
import Header from '../../components/Header';
import HeadingTitle from '../../components/HeadingTitle';
import SearchBar from '../../components/SearchBar';
import SideBar from '../../components/SideBar';
import { PADDING_SAFE } from '../../constants';
import getColorScheme from '../../utilities/getColorScheme';

const Home: React.FC = function (_) {
  const searchBarActive = useSharedValue(0);
  const [isSideBarShown, setIsSideBarShown] = useState(false);
  const COLORS = getColorScheme();

  const CAROUSEL_ITEMS: CardData[] = [
    {
      title: 'OnePlus',
      subTitle: 'Wallpapers',
      image: require('./1.jpg'),
    },

    {
      title: 'Realme',
      subTitle: 'Wallpapers',
      image: require('./3.jpg'),
    },
    {
      title: 'Samsung',
      subTitle: 'Wallpapers',
      image: require('./2.jpg'),
    },
  ];

  const CATEGORIES: Box[] = [
    {
      title: 'All',
      backgroundColor: 'black',
    },
    {
      title: 'Abstract',
      backgroundColor: 'tomato',
    },
    {
      title: 'Cars',
      backgroundColor: 'crimson',
    },
    {
      title: '3D',
      backgroundColor: 'teal',
    },
    {
      title: 'Stock',
      backgroundColor: 'orange',
    },
  ];

  const headerStyle = useAnimatedStyle(() => {
    const offsetY = interpolate(searchBarActive.value, [0, 1], [0, -100]);
    return {
      transform: [{ translateY: Animated.withTiming(offsetY) }],
    };
  });

  const onSearchBarActive = () => {
    searchBarActive.value = 1;
  };

  const onSearchBarRelease = function () {
    searchBarActive.value = 0;
    setTimeout(() => {
      Keyboard.dismiss();
    }, 250);
  };

  const onMenuClick = () => {
    setIsSideBarShown(true);
  };

  const onMenuClose = () => {
    setIsSideBarShown(false);
  };

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: COLORS.primary,
      paddingHorizontal: PADDING_SAFE,
      paddingTop: heightPercentageToDP(2),
    },
    noBorderFrame: {
      marginHorizontal: -PADDING_SAFE,
    },
  });

  return (
    <>
      <View style={styles.root}>
        <SideBar onMenuClose={onMenuClose} isShown={isSideBarShown} />
        <Header onMenuClick={onMenuClick} animatedStyle={headerStyle} />
        <SearchBar
          onSearchBarActive={onSearchBarActive}
          onSearchBarRelease={onSearchBarRelease}
        />
        <HeadingTitle title="Trending Now" />
        <MediumSizeCarousel
          style={styles.noBorderFrame}
          items={CAROUSEL_ITEMS}
        />
        <HeadingTitle title="Categories" />
        <Boxes style={styles.noBorderFrame} items={CATEGORIES} />
      </View>
    </>
  );
};

export default Home;
