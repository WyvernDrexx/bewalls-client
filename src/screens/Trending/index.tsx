import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import MIUIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Cards } from '../../components/Cards'
import { LoadingView } from '../../components/Loader/LoadingView'
import SearchBarIconWrapper from '../../components/SearchBar/SearchBarIconWrapper'
import StackHeader from '../../components/StackHeader'
import WallpaperView from '../../components/WallpaperView'
import { useTrendingQuery, Wallpaper } from '../../generated/graphql'
import { useTheme, useWallpaperView } from '../../hooks'
import { TrendingScreenProps } from '../../navigation/types'
import { hp, wp } from '../../utilities'

const Trending: React.FC<TrendingScreenProps> = (props) => {
  const { themedStyles, theme } = useTheme()
  const { wallpaper, setWallpaper } = useWallpaperView()
  const { loading, data, refetch } = useTrendingQuery({
    variables: {
      skip: 0,
      take: 20
    },
    notifyOnNetworkStatusChange: true
  })

  const handleRefreshClick = useCallback(() => {
    refetch()
  }, [props.navigation])

  if (loading) {
    return (
      <>
        <StackHeader
          right={
            <SearchBarIconWrapper
              Icon={() => <MIUIcon size={hp(3)} color={theme.colors.secondary} name='refresh' />}
              onClick={handleRefreshClick}
            />
          }
          title='Trending'
        />
        <LoadingView useThemeColor style={themedStyles.bg} height='95' />
      </>
    )
  }

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <Cards
        HeaderComponent={
          <StackHeader
            right={
              <SearchBarIconWrapper
                Icon={() => <MIUIcon size={hp(3)} color={theme.colors.secondary} name='refresh' />}
                onClick={handleRefreshClick}
              />
            }
            title='Trending'
          />
        }
        group='category'
        onClick={setWallpaper}
        items={data?.trending as Wallpaper[]}
        height='39'
        width='47'
        disableLastMargin
        style={styles.cards}
      />
      <WallpaperView wallpaper={wallpaper} onCloseClick={() => setWallpaper(null)} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  cards: {
    marginBottom: wp(2)
  }
})

export default Trending
