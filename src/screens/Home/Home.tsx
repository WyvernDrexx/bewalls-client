import React, { useState } from 'react';

import { StyleSheet, ScrollView, View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import { useTheme } from '../../hooks';

import { Cards } from '../../components/Card';
import { Box, Boxes } from '../../components/Carousel';
import { WallpaperType } from '../../types';

import Header from '../../components/Header';
import HeadingTitle from '../../components/HeadingTitle';
import SearchBar from '../../components/SearchBar';
import SideBar from '../../components/SideBar';

import { BRANDS, TRENDING_NOW } from '../../sample/sampleData';
import { HomeScreenProps, RootStackParamList } from '../../navigation/types';

const Home: React.FC<HomeScreenProps> = function (props) {
  const [isSideBarShown, setIsSideBarShown] = useState(false);
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

  const handleSearchBarClick = () => {
    props.navigation.navigate('Search');
  };

  const handleSideBarOpen = () => {
    setIsSideBarShown(true);
  };

  const handleSideBarClose = () => {
    setIsSideBarShown(false);
  };

  const handleMoreClick = () => {
    props.navigation.navigate('Categories');
  };

  const handleCardClick = (select: WallpaperType) => {
    props.navigation.navigate('Selection', { select: select.title! });
  };

  const handleBoxClick = (select: string) => {
    props.navigation.navigate('Selection', { select });
  };

  const handleSideBarItemClick = (route: keyof RootStackParamList) => {
    handleSideBarClose();
    props.navigation.navigate(route);
  };

  return (
    <>
      <View style={[styles.mainContainer, themeStyles.bgSecondary]}>
        <SideBar
          currentRoute={props.route.name}
          onItemClick={handleSideBarItemClick}
          onClose={handleSideBarClose}
          isShown={isSideBarShown}
        />
        <View style={[styles.root, themeStyles.bg]}>
          <ScrollView
            scrollEnabled={!isSideBarShown}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            <Header onMenuClick={handleSideBarOpen} />
            <SearchBar
              isTouchEnabled={isSideBarShown}
              onSearchBarActive={handleSearchBarClick}
            />
            <HeadingTitle title="Trending Now" />
            <ScrollView
              scrollEnabled={!isSideBarShown}
              horizontal
              showsHorizontalScrollIndicator={false}
              overScrollMode="never">
              <Cards
                items={TRENDING_NOW}
                onClick={handleCardClick}
                height="35"
                width="42"
              />
            </ScrollView>
            <HeadingTitle onMoreClick={handleMoreClick} title="Categories" />
            <Boxes
              scrollEnabled={!isSideBarShown}
              disabled={isSideBarShown}
              onClick={handleBoxClick}
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
                onClick={handleCardClick}
                height="15"
                width="55"
              />
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
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
