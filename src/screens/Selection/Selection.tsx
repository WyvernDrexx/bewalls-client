import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Cards } from '../../components/Cards'
import { LoadingView } from '../../components/Loader/LoadingView'
import StackHeader from '../../components/StackHeader'
import WallpaperView from '../../components/WallpaperView'
import { useWallpapersQuery, Wallpaper } from '../../generated/graphql'
import { useTheme, useWallpaperView } from '../../hooks'
import { SelectionScreenProps } from '../../navigation/types'
import { hp, wp } from '../../utilities'

const Selection: React.FC<SelectionScreenProps> = function (props) {
  const { group: type, groupId: selectorId } = props.route.params
  const { wallpaper, setWallpaper } = useWallpaperView()
  const variables = {
    bundleId: type === 'bundle' ? selectorId : '',
    categoryId: type === 'category' ? selectorId : '',
    colorId: type === 'color' ? selectorId : '',
    tagsId: type === 'tag' ? selectorId : ''
  }

  const { loading, data } = useWallpapersQuery({
    variables: type === 'none' ? {} : variables
  })

  const { themedStyles } = useTheme()

  const renderDisplay = useCallback(() => {
    if (loading || !data) {
      return <LoadingView height={88} />
    }

    return (
      <Cards
        HeaderComponent={<StackHeader title={props.route.params.title} />}
        group='category'
        onClick={setWallpaper}
        items={data?.wallpapers as Wallpaper[]}
        height='39'
        width='47'
        disableLastMargin
        style={styles.cards}
      />
    )
  }, [data?.wallpapers, loading])

  return (
    <View style={[styles.root, themedStyles.bg]}>
      {loading && <StackHeader title={props.route.params.title} />}
      {renderDisplay()}
      <WallpaperView wallpaper={wallpaper} onCloseClick={() => setWallpaper(null)} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'red'
  },
  displaySelection: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  displayLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  modeIcon: {
    paddingLeft: wp(4)
  },
  gridView: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  cards: {
    marginBottom: wp(2)
  },
  sortOptions: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  downArrowIcon: {
    marginLeft: wp(2),
    height: hp(3),
    width: wp(5)
  },
  sortingText: {
    fontSize: wp(4)
  },
  carousel: {
    marginTop: hp(2.8)
  }
})

export { Selection }
