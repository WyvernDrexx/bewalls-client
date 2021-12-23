import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Cards } from '../../components/Cards'
import { Bundles } from '../../components/Carousel'
import CategoryItems from '../../components/CategoryItems'
import Header from '../../components/Header'
import HeadingTitle from '../../components/HeadingTitle'
import NoNetworkAccess from '../../components/NoNetworkAccess'
import SearchBar from '../../components/SearchBar'
import SideBar from '../../components/SideBar'
import WallpaperView from '../../components/WallpaperView'
import { Bundle, Category, useHomeScreenQuery, Wallpaper } from '../../generated/graphql'
import { useAlerts, useTheme, useWallpaperView } from '../../hooks'
import { HomeScreenProps, RootStackParamList } from '../../navigation/types'
import { ItemGroup } from '../../types'
import { hp, wp } from '../../utilities'
import { BannerAd, BannerAdSize, TestIds } from '@react-native-admob/admob'
import CategoriesSpectrum from '../../components/CategoriesSpectrum'

const Home: React.FC<HomeScreenProps> = function (props) {
  const [isSideBarShown, setIsSideBarShown] = useState(false)
  const { wallpaper, setWallpaper } = useWallpaperView()
  const { themedStyles } = useTheme()
  const { loading, data, error } = useHomeScreenQuery()
  const { dispatchShowAlert } = useAlerts()
  const handleSearchBarClick = () => {
    props.navigation.navigate('Search')
  }

  const handleSideBarOpen = () => {
    setIsSideBarShown(true)
  }

  const handleSideBarClose = () => {
    setIsSideBarShown(false)
  }

  const goToCategories = () => {
    props.navigation.navigate('Categories')
  }

  const handleBoxClick = (select: Category, group: ItemGroup) => {
    props.navigation.navigate('Selection', {
      title: select.name,
      group,
      groupId: select.id
    })
  }

  const handleSideBarItemClick = (route: keyof RootStackParamList) => {
    handleSideBarClose()
    props.navigation.navigate(route)
  }

  const handleBundleClick = (bundle: Bundle, group: ItemGroup) => {
    props.navigation.navigate('Selection', {
      title: bundle.name,
      group,
      groupId: bundle.id
    })
  }

  const navigateToBundlesScreen = () => {
    props.navigation.navigate('Bundles')
  }

  useEffect(() => {
    if (error) {
      dispatchShowAlert({
        error: 'Unable to retrieve wallpapers. Try again later'
      })
    }
  }, [error])
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
          overScrollMode='never'
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <Header onProfileClick={handleSideBarOpen} />
          <NoNetworkAccess>
            <SearchBar disabled={isSideBarShown} onSearchBarActive={handleSearchBarClick} />
            <HeadingTitle hideButton title='Trending Now' />
            <Cards
              loading={loading}
              horizantal
              group='category'
              items={data?.trending! as Wallpaper[]}
              onClick={setWallpaper}
              height='35'
              width='42'
            />
            <HeadingTitle onClick={navigateToBundlesScreen} title='Bundles' />
            <Bundles
              height='15'
              loading={loading}
              onClick={handleBundleClick}
              itemType='bundle'
              items={data?.bundles! as Bundle[]}
            />
            <HeadingTitle onClick={goToCategories} title='Categories' />
            <CategoryItems
              hideVisits
              loading={loading}
              onClick={handleBoxClick}
              categories={data?.categories as Category[]}
              group='category'
              height='15'
              width='70'
            />
            <View style={styles.header}>
              <Text style={styles.text}>Explore More</Text>
              <View style={styles.line}></View>
            </View>
            <CategoriesSpectrum onWallpaperClick={setWallpaper} />
          </NoNetworkAccess>
        </ScrollView>
      </View>
      <View style={[styles.flex, themedStyles.bg]}>
        {/* <BannerAd size={BannerAdSize.BANNER} unitId='ca-app-pub-3940256099942544/6300978111' /> */}
      </View>
      <WallpaperView onCloseClick={() => setWallpaper(null)} wallpaper={wallpaper} />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  root: {
    flex: 1
  },
  scrollView: {
    margin: 0,
    borderRadius: wp(10)
  },
  marginBottom: { marginBottom: hp(4) },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: wp(2),
    marginTop: hp(1),
  },
  text: {
    fontSize: wp(4.5),
    fontWeight: 'bold'
  },
  line: {
    borderBottomWidth: 2,
    height: 1,
    flex: 1,
    marginLeft: wp(2)
  }
})

export { Home }
