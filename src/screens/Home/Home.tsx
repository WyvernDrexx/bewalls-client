import React, { useState } from 'react';

import { View, StyleSheet, Keyboard, ScrollView } from 'react-native';
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
      paddingTop: heightPercentageToDP(2),
    },
    scrollView: {
      margin: 0,
    },
  });

  return (
    <>
      <View style={styles.root}>
        <Header onMenuClick={onMenuClick} animatedStyle={headerStyle} />
        <SideBar onMenuClose={onMenuClose} isShown={isSideBarShown} />
        <SearchBar
          onSearchBarActive={onSearchBarActive}
          onSearchBarRelease={onSearchBarRelease}
        />
        <ScrollView style={styles.scrollView}>
          <HeadingTitle title="Trending Now" />
          <MediumSizeCarousel items={CAROUSEL_ITEMS} />
          <HeadingTitle title="Categories" />
          <Boxes items={CATEGORIES} />
          <HeadingTitle title="Smartphone Brands" />
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
