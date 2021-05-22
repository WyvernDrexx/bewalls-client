import React, { useState } from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Cards } from '../../components/Card';
import { CardData } from '../../components/Card/Card';
import { Box, Boxes } from '../../components/Carousel';
import Header from '../../components/Header';
import HeadingTitle from '../../components/HeadingTitle';
import SearchBar from '../../components/SearchBar';
import SideBar from '../../components/SideBar';
import { useThemeStyles } from '../../hooks';
import { HomeScreenProps } from '../../navigation/types';

const Home: React.FC<HomeScreenProps> = function (props) {
  const searchBarActive = useSharedValue(0);
  const [isSideBarShown, setIsSideBarShown] = useState(false);
  const themeStyles = useThemeStyles();
  const CAROUSEL_ITEMS: CardData[] = [
    {
      title: 'OnePlus',
      subTitle: 'Wallpapers',
      image: require('./1.jpg'),
    },

    {
      title: 'Realme',
      subTitle: 'Wallpapers',
      image: require('./3.png'),
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

  const BRANDS: CardData[] = [
    {
      title: 'Apple',
      image: require('./apple.jpg'),
    },

    {
      title: 'OnePlus',
      image: require('./oneplus.png'),
    },
    {
      title: 'Realme',
      image: require('./realme.jpg'),
    },
  ];

  const headerStyle = useAnimatedStyle(() => {
    const offsetY = interpolate(searchBarActive.value, [0, 1], [0, -100]);
    return {
      transform: [{ translateY: Animated.withTiming(offsetY) }],
    };
  });

  const onSearchBarActive = () => {
    props.navigation.navigate('Search');
  };

  const onMenuClick = () => {
    setIsSideBarShown(true);
  };

  const onMenuClose = () => {
    setIsSideBarShown(false);
  };

  const onMoreClick = () => {
    props.navigation.navigate('Categories');
  };

  return (
    <>
      <View style={[styles.root, themeStyles.bg]}>
        <SideBar onMenuClose={onMenuClose} isShown={isSideBarShown} />
        <ScrollView
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <Header onMenuClick={onMenuClick} animatedStyle={headerStyle} />
          <SearchBar onSearchBarActive={onSearchBarActive} />
          <HeadingTitle title="Trending Now" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            overScrollMode="never">
            <Cards items={CAROUSEL_ITEMS} height="35" width="42" />
          </ScrollView>
          <HeadingTitle onMoreClick={onMoreClick} title="Categories" />
          <Boxes items={CATEGORIES} />
          <HeadingTitle title="Smartphone Brands" />
          <ScrollView
            style={{ marginBottom: heightPercentageToDP(4) }}
            horizontal
            showsHorizontalScrollIndicator={false}
            overScrollMode="never">
            <Cards items={BRANDS} height="15" width="55" />
          </ScrollView>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollView: {
    margin: 0,
  },
});
export { Home };
