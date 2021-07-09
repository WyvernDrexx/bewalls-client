import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Cards } from '../../components/Cards';
import { Bundles } from '../../components/Carousel';
import CategoryItems from '../../components/CategoryItems';
import Header from '../../components/Header';
import HeadingTitle from '../../components/HeadingTitle';
import NoNetworkAccess from '../../components/NoNetworkAccess';
import SearchBar from '../../components/SearchBar';
import SideBar from '../../components/SideBar';
import WallpaperView from '../../components/WallpaperView';
import {
  Bundle,
  Category,
  useHomeScreenQuery,
  Wallpaper,
} from '../../generated/graphql';
import { useAlerts, useTheme } from '../../hooks';
import { HomeScreenProps, RootStackParamList } from '../../navigation/types';
import { ItemGroup } from '../../types';
import { hp, wp } from '../../utilities';

const Home: React.FC<HomeScreenProps> = function (props) {
  const [isSideBarShown, setIsSideBarShown] = useState(false);
  const [selected, setSelected] = useState<Wallpaper | undefined>();
  const [viewSelected, setViewSelected] = useState(false);
  const { themedStyles } = useTheme();
  const { loading, data, error } = useHomeScreenQuery();
  const { dispatchShowAlert } = useAlerts();
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

  const handleCardClick = (select: Wallpaper) => {
    setSelected(select);
    setViewSelected(true);
  };

  const handleCloseClick = () => {
    setViewSelected(false);
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

  const handleBundleClick = (bundle: Bundle, group: ItemGroup) => {
    props.navigation.navigate('Selection', {
      title: bundle.name,
      group,
      groupId: bundle.id,
    });
  };

  const navigateToBundlesScreen = () => {
    props.navigation.navigate('Bundles');
  };

  useEffect(() => {
    if (error) {
      dispatchShowAlert({
        error: 'Unable to retrieve wallpapers. Try again later',
      });
    }
  }, [error]);

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
          <NoNetworkAccess>
            <SearchBar
              disabled={isSideBarShown}
              onSearchBarActive={handleSearchBarClick}
            />
            <HeadingTitle hideButton title="Trending Now" />
            <ScrollView
              scrollEnabled={!isSideBarShown}
              horizontal
              showsHorizontalScrollIndicator={false}
              overScrollMode="never">
              <Cards
                loading={loading}
                group="category"
                items={data?.trending! as Wallpaper[]}
                onClick={handleCardClick}
                height="35"
                width="42"
              />
            </ScrollView>
            <HeadingTitle onClick={navigateToBundlesScreen} title="Bundles" />
            <Bundles
              loading={loading}
              onClick={handleBundleClick}
              itemType="bundle"
              items={data?.bundles! as Bundle[]}
            />
            <HeadingTitle onClick={goToCategories} title="Categories" />
            <ScrollView
              scrollEnabled={!isSideBarShown}
              style={styles.marginBottom}
              horizontal
              showsHorizontalScrollIndicator={false}
              overScrollMode="never">
              <CategoryItems
                hideVisits
                loading={loading}
                onClick={handleBoxClick}
                categories={data?.categories as Category[]}
                group="category"
                height="15"
                width="70"
              />
            </ScrollView>
          </NoNetworkAccess>
        </ScrollView>
      </View>
      <WallpaperView
        onCloseClick={handleCloseClick}
        wallpaper={selected}
        showWallpaper={viewSelected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  root: {
    flex: 1,
  },
  scrollView: {
    margin: 0,
    borderRadius: wp(10),
  },
  marginBottom: { marginBottom: hp(4) },
});

export { Home };
