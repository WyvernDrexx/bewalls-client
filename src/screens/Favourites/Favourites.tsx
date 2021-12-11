import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Cards } from '../../components/Cards'
import { LoadingView } from '../../components/Loader/LoadingView'
import MountOn from '../../components/MountOn'
import StackHeader from '../../components/StackHeader'
import WallpaperView from '../../components/WallpaperView'
import { useGetUserFavouritesQuery, Wallpaper } from '../../generated/graphql'
import { useTheme, useWallpaperView } from '../../hooks'
import { FavouritesScreenProps } from '../../navigation/types'
import { hp, wp } from '../../utilities'

const Favourites: React.FC<FavouritesScreenProps> = (props) => {
  const { themedStyles } = useTheme()
  const { data, loading, refetch } = useGetUserFavouritesQuery()
  const { wallpaper, setWallpaper } = useWallpaperView()

  const handleAfterFavouriteMutation = (_: Wallpaper) => {
    refetch()
  }

  const renderFavouritesCards = () => {
    if (!data?.getUserInfo?.favourites.length) {
      return (
        <>
          <StackHeader title='Favourites' />
          <View style={styles.placeholderView}>
            <Text style={[styles.placeholderText, themedStyles.textDark]}>
              Wow, it's empty! Go and find your favourite wallpaper now!
            </Text>
          </View>
        </>
      )
    }

    return (
      <View style={styles.favourites}>
        <Cards
          HeaderComponent={<StackHeader title='Favourites' />}
          onClick={setWallpaper}
          group='bundle'
          height='15'
          width='47'
          items={data?.getUserInfo?.favourites as Wallpaper[]}
          disableLastMargin
          style={styles.cards}
        />
      </View>
    )
  }

  useEffect(() => {
    refetch()
  }, [])

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <MountOn
        fallback={
          <>
            <StackHeader title='Favourites' />
            <LoadingView height='85' />
          </>
        }
        on={!loading}
      >
        <View style={styles.container}>{renderFavouritesCards()}</View>
      </MountOn>
      <WallpaperView
        wallpaper={wallpaper}
        afterFavouriteMutation={handleAfterFavouriteMutation}
        onCloseClick={() => setWallpaper(null)}
      />
    </View>
  )
}

export { Favourites }

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {},
  favourites: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  cards: {
    marginBottom: wp(2)
  },
  placeholderView: {
    height: hp(90),
    width: wp(98),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderText: {
    fontSize: wp(6),
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
