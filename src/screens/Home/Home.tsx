import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Cards } from '../../components/Cards'
import CategoryItems from '../../components/CategoryItems'
import Header from '../../components/Header'
import HeadingTitle from '../../components/HeadingTitle'
import NoNetworkAccess from '../../components/NoNetworkAccess'
import SearchBar from '../../components/SearchBar'
import SideBar from '../../components/SideBar'
import WallpaperView from '../../components/WallpaperView'
import {
  Category,
  useFeaturedQuery,
  useHomeCategoriesQuery,
  useHomeTrendingQuery,
  Wallpaper
} from '../../generated/graphql'
import { useAlerts, useTheme, useWallpaperView } from '../../hooks'
import { HomeScreenProps, RootStackParamList } from '../../navigation/types'
import { ItemGroup } from '../../types'
import { hp, wp } from '../../utilities'

const Home: React.FC<HomeScreenProps> = function (props) {
  const [isSideBarShown, setIsSideBarShown] = useState(false)
  const { wallpaper, setWallpaper } = useWallpaperView()
  const { themedStyles } = useTheme()
  const {
    loading: trendingLoading,
    data: trending,
    error: trendingErr
  } = useHomeTrendingQuery({
    variables: {
      skip: 0,
      take: 10
    }
  })
  const { loading: featuredLoading, data: featured, error: featuredErr } = useFeaturedQuery()
  const { loading: categoriesLoading, data: categories, error: categoriesErr } = useHomeCategoriesQuery()
  const { dispatchShowAlert } = useAlerts()
  const handleSearchBarClick = () => {
    props.navigation.navigate('Search')
  }

  const handleSideBarOpen = useCallback(() => {
    setIsSideBarShown(true)
  }, [])

  const handleSideBarClose = useCallback(() => {
    setIsSideBarShown(false)
  }, [])

  const goToCategories = () => {
    props.navigation.navigate('Categories')
  }

  const goToTrending = () => {
    props.navigation.navigate('Trending')
  }

  const handleBoxClick = useCallback((select: Category, group: ItemGroup) => {
    props.navigation.navigate('Selection', {
      title: select.name,
      group,
      groupId: select.id
    })
  }, [])

  const handleSideBarItemClick = (route: keyof RootStackParamList) => {
    handleSideBarClose()
    props.navigation.navigate(route)
  }

  useEffect(() => {
    if (trendingErr || categoriesErr || trendingErr) {
      dispatchShowAlert({
        error: 'Unable to retrieve wallpapers. Try again later'
      })
    }
  }, [trendingErr, categoriesErr, trendingErr])

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
          <Header onSearchBarClick={handleSearchBarClick} onProfileClick={handleSideBarOpen} />
          <SearchBar disabled={isSideBarShown} onSearchBarActive={handleSearchBarClick} />
          <HeadingTitle hideButton title='Featured' />
          <Cards
            loading={featuredLoading}
            horizantal
            group='category'
            items={featured?.featured! as Wallpaper[]}
            onClick={setWallpaper}
            height='25'
            width='65'
          />
          <HeadingTitle onClick={goToTrending} title='Trending Now' />
          <Cards
            loading={trendingLoading}
            horizantal
            group='category'
            items={trending?.trending! as Wallpaper[]}
            onClick={setWallpaper}
            height='35'
            width='42'
          />
          <HeadingTitle onClick={goToCategories} title='Categories' />
          <CategoryItems
            hideVisits
            loading={categoriesLoading}
            onClick={handleBoxClick}
            categories={categories?.categories as Category[]}
            group='category'
            height='15'
            width='70'
          />
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
    margin: 0
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export { Home }
