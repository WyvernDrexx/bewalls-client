import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import { Cards } from '../../components/Cards';
import { Box, Boxes } from '../../components/Carousel';

import Header from '../../components/Header';
import HeadingTitle from '../../components/HeadingTitle';
import SearchBar from '../../components/SearchBar';
import SideBar from '../../components/SideBar';

import { hp, wp } from '../../utilities';
import { useTheme } from '../../hooks';

import { HomeScreenProps, RootStackParamList } from '../../navigation/types';
import { useTrendingQuery, Wallpaper } from '../../generated/graphql';

const Home: React.FC<HomeScreenProps> = function (props) {
  const [isSideBarShown, setIsSideBarShown] = useState(false);
  const { themedStyles } = useTheme();
  const { loading, data } = useTrendingQuery();

  if (loading) {
    return null;
  }
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

  const handleCardClick = (select: Wallpaper) => {
    props.navigation.navigate('Selection', { select: select.name! });
  };

  const handleBoxClick = (select: string) => {
    props.navigation.navigate('Selection', { select });
  };

  const handleSideBarItemClick = (route: keyof RootStackParamList) => {
    handleSideBarClose();
    props.navigation.navigate(route);
  };

  return (
    <View style={[styles.mainContainer, themedStyles.bgSecondary]}>
      <SideBar
        currentRoute={props.route.name}
        onItemClick={handleSideBarItemClick}
        onClose={handleSideBarClose}
        isShown={isSideBarShown}
      />
      <View style={[styles.root, themedStyles.bg]}>
        <ScrollView
          scrollEnabled={!isSideBarShown}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <Header onProfileClick={handleSideBarOpen} />
          <SearchBar
            disabled={isSideBarShown}
            onSearchBarActive={handleSearchBarClick}
          />
          <HeadingTitle title="Trending Now" />
          <ScrollView
            scrollEnabled={!isSideBarShown}
            horizontal
            showsHorizontalScrollIndicator={false}
            overScrollMode="never">
            <Cards
              items={data?.trending! as Wallpaper[]}
              onClick={handleCardClick}
              height="35"
              width="42"
            />
          </ScrollView>
          <HeadingTitle onClick={handleMoreClick} title="Categories" />
          <Boxes
            scrollEnabled={!isSideBarShown}
            disableClick={isSideBarShown}
            onClick={handleBoxClick}
            items={CATEGORIES}
          />
          <HeadingTitle title="Smartphone Brands" />
          <ScrollView
            scrollEnabled={!isSideBarShown}
            style={styles.marginBottom}
            horizontal
            showsHorizontalScrollIndicator={false}
            overScrollMode="never">
            <Cards
              items={data?.trending! as Wallpaper[]}
              onClick={handleCardClick}
              height="15"
              width="55"
            />
          </ScrollView>
        </ScrollView>
      </View>
    </View>
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
    borderRadius: wp(10),
  },
  marginBottom: { marginBottom: hp(4) },
});
export { Home };
