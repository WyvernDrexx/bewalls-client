import React, { useState } from 'react';

import { StyleSheet, ScrollView, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Cards } from '../../components/Card';
import { Box, Boxes } from '../../components/Carousel';
import Header from '../../components/Header';
import HeadingTitle from '../../components/HeadingTitle';
import SearchBar from '../../components/SearchBar';
import SideBar from '../../components/SideBar';
import { useTheme } from '../../hooks';
import { HomeScreenProps, RootStackParamList } from '../../navigation/types';
import { BRANDS, TRENDING_NOW } from '../../sample/sampleData';
import { WallpaperType } from '../../types';

const Home: React.FC<HomeScreenProps> = function (props) {
  const searchBarActive = useSharedValue(0);
  const homeOffesetX = useSharedValue(0);
  const translateX = widthPercentageToDP(75);
  const borderRadius = widthPercentageToDP(15);
  const homePadding = widthPercentageToDP(6);
  const [isSideBarShown, setIsSideBarShown] = useState(false);
  const [isSideBarOpenClicked, setIsSideBarOpenClicked] = useState(false);
  const [themeStyles] = useTheme();

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

  const homeStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      homeOffesetX.value,
      [0, translateX],
      [1, 0.9],
      Extrapolate.CLAMP,
    );

    const padding = interpolate(
      homeOffesetX.value,
      [0, translateX],
      [0, homePadding],
      Extrapolate.CLAMP,
    );

    const borderRadiusInter = interpolate(
      homeOffesetX.value,
      [0, translateX],
      [0, borderRadius],
      Extrapolate.CLAMP,
    );

    return {
      transform: [
        {
          translateX: Animated.withTiming(homeOffesetX.value, {}, isFin => {
            if (isFin && isSideBarOpenClicked) {
              runOnJS(setIsSideBarShown)(true);
              runOnJS(setIsSideBarOpenClicked)(false);
            }
          }),
        },
        {
          scale: Animated.withSpring(scale),
        },
      ],
      borderRadius: Animated.withTiming(borderRadiusInter),
      padding: Animated.withTiming(padding),
    };
  });

  const onSearchBarActive = () => {
    props.navigation.navigate('Search');
  };

  const menuOpen = () => {
    setIsSideBarOpenClicked(true);
    homeOffesetX.value = translateX;
  };

  const menuClose = () => {
    homeOffesetX.value = 0;
    setIsSideBarShown(false);
  };

  const onMoreClick = () => {
    props.navigation.navigate('Categories');
  };

  const onCardClick = (select: WallpaperType) => {
    props.navigation.navigate('Selection', { select: select.title! });
  };

  const onBoxClick = (select: string) => {
    props.navigation.navigate('Selection', { select });
  };

  const onSideBarItemClick = (route: keyof RootStackParamList) => {
    menuClose();
    props.navigation.navigate(route);
  };

  return (
    <>
      <View style={[styles.mainContainer]}>
        <SideBar
          activeRoute={props.route.name}
          onItemClick={onSideBarItemClick}
          onMenuClose={menuClose}
          isShown={isSideBarShown}
        />
        <Animated.View style={[homeStyle, styles.root, themeStyles.bg]}>
          <ScrollView
            scrollEnabled={!isSideBarShown}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            <Header onMenuClick={menuOpen} animatedStyle={headerStyle} />
            <SearchBar
              isTouchEnabled={isSideBarShown}
              onSearchBarActive={onSearchBarActive}
            />
            <HeadingTitle title="Trending Now" />
            <ScrollView
              scrollEnabled={!isSideBarShown}
              horizontal
              showsHorizontalScrollIndicator={false}
              overScrollMode="never">
              <Cards
                items={TRENDING_NOW}
                onClick={onCardClick}
                height="35"
                width="42"
              />
            </ScrollView>
            <HeadingTitle onMoreClick={onMoreClick} title="Categories" />
            <Boxes
              scrollEnabled={!isSideBarShown}
              disabled={isSideBarShown}
              onClick={onBoxClick}
              items={CATEGORIES}
            />
            <HeadingTitle title="Smartphone Brands" />
            <ScrollView
              scrollEnabled={!isSideBarShown}
              style={{ marginBottom: heightPercentageToDP(4) }}
              horizontal
              showsHorizontalScrollIndicator={false}
              overScrollMode="never">
              <Cards
                items={BRANDS}
                onClick={onCardClick}
                height="15"
                width="55"
              />
            </ScrollView>
          </ScrollView>
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#0E1E54',
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: 'red',
  },
  scrollView: {
    margin: 0,
    borderRadius: widthPercentageToDP(10),
  },
});
export { Home };
