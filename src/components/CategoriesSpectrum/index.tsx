import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { CategoriesDataQuery, CategoriesSpectrumQuery, Category, useCategoriesSpectrumQuery, Wallpaper } from '../../generated/graphql'
import { hp, wp } from '../../utilities'
import { Cards } from '../Cards'
import HeadingTitle from '../HeadingTitle'
import { Loader } from '../Loader'

type CategoriesSpectrumProps = {
  onWallpaperClick: (wallpaper: Wallpaper) => void
}

const CategoriesSpectrum: React.FC<CategoriesSpectrumProps> = ({ onWallpaperClick }) => {
  const { loading, data } = useCategoriesSpectrumQuery()

  if (loading) return <Loader />

  const renderItems = (mainData: CategoriesSpectrumQuery | undefined) => {
    if(typeof mainData === 'undefined') return null
    const myItems = [...mainData?.categoriesSpectrum]
    myItems!.sort((a, b) => {
      if (a?.totalNumberOfItems! < b?.totalNumberOfItems!) return 1
      return -1
    })
    return myItems!.map((item) => {
      return (
        <View key={item?.id}>
          <HeadingTitle hideButton title={item?.name || ''} />
          <Cards
            loading={loading}
            horizantal
            group='category'
            items={item?.wallpapers as Wallpaper[]}
            onClick={onWallpaperClick}
            height='35'
            width='42'
          />
        </View>
      )
    })
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.text}>Explore More</Text>
        <View style={styles.line}>
          <Text></Text>
        </View>
      </View>
      {renderItems(data)}
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: wp(2),
    marginTop: hp(1)
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

export default CategoriesSpectrum
