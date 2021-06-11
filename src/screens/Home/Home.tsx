import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';

import { Cards } from '../../components/Cards';
import { Categories } from '../../components/Carousel';

import Header from '../../components/Header';
import HeadingTitle from '../../components/HeadingTitle';
import SearchBar from '../../components/SearchBar';
import SideBar from '../../components/SideBar';

import { hp, wp } from '../../utilities';
import { useTheme } from '../../hooks';

import { HomeScreenProps, RootStackParamList } from '../../navigation/types';

import {
  Category,
  Wallpaper,
  useHomeScreenDataQuery,
  Brand,
} from '../../generated/graphql';
import Brands from '../../components/Brands';
import { ItemGroup } from '../../types';

const Home: React.FC<HomeScreenProps> = function (props) {
  const [isSideBarShown, setIsSideBarShown] = useState(false);
  const { themedStyles } = useTheme();
  const { loading, data } = useHomeScreenDataQuery();

  const handleSearchBarClick = () => {
    props.navigation.navigate('Search');
  };

  const handleSideBarOpen = () => {
    setIsSideBarShown(true);
  };

  const handleSideBarClose = () => {
    setIsSideBarShown(false);
  };

  const goToCategories = () => {
    props.navigation.navigate('Categories');
  };

  const handleCardClick = (select: Wallpaper, group: ItemGroup) => {
    props.navigation.navigate('Selection', {
      title: select.name!,
      group,
      groupId: select.brand.id,
    });
  };

  const handleBoxClick = (select: Category, group: ItemGroup) => {
    props.navigation.navigate('Selection', {
      title: select.name,
      group,
      groupId: select.id,
    });
  };

  const handleSideBarItemClick = (route: keyof RootStackParamList) => {
    handleSideBarClose();
    props.navigation.navigate(route);
  };

  const handleBrandClick = (brand: Brand, group: ItemGroup) => {
    props.navigation.navigate('Selection', {
      title: brand.name,
      group,
      groupId: brand.id,
    });
  };

  if (loading) {
    return null;
  }

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
          {loading ? (
            <ActivityIndicator color="red" />
          ) : (
            <>
              <HeadingTitle title="Trending Now" />
              <ScrollView
                scrollEnabled={!isSideBarShown}
                horizontal
                showsHorizontalScrollIndicator={false}
                overScrollMode="never">
                <Cards
                  group="brand"
                  items={data?.trending! as Wallpaper[]}
                  onClick={handleCardClick}
                  height="35"
                  width="42"
                />
              </ScrollView>
              <HeadingTitle onClick={goToCategories} title="Categories" />
              <Categories
                itemType="category"
                scrollEnabled={!isSideBarShown}
                disableClick={isSideBarShown}
                onClick={handleBoxClick}
                items={data?.categories! as Category[]}
              />
              <HeadingTitle title="Smartphone Brands" />
              <ScrollView
                scrollEnabled={!isSideBarShown}
                style={styles.marginBottom}
                horizontal
                showsHorizontalScrollIndicator={false}
                overScrollMode="never">
                <Brands
                  group="brand"
                  onClick={handleBrandClick}
                  height="15"
                  width="55"
                  brands={data?.brands! as Brand[]}
                />
              </ScrollView>
            </>
          )}
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
