import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Category } from '../../generated/graphql'
import { useTheme } from '../../hooks'
import { ItemGroup } from '../../types'
import { hp, isLastElement, numberToMetricScale, wp } from '../../utilities'
import { LoadingView } from '../Loader/LoadingView'

type CategoryProps = {
  categories: Category[]
  onClick?: (category: Category, group: ItemGroup) => void
  height: string | number
  width: string | number
  group: ItemGroup
  isVertical?: boolean
  hideVisits?: boolean
  loading?: boolean
  imageSize?: 'imageSmall' | 'imageMedium' | 'imageLarge'
  HeaderComponent?: React.ReactElement
  loaderHeight?: string
}

type RenderItem = {
  item: Category
  index: number
}

const Categories: React.FC<CategoryProps> = React.memo(function (props) {
  const height = hp(props.height)
  const width = wp(props.width)
  const imageSize = props.imageSize || 'imageMedium'
  const [imageLoading, setImageLoading] = useState(true)
  const { themedStyles } = useTheme()

  const handleClick = (category: Category) => {
    if (props.onClick) props.onClick(category, props.group)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  if (props.loading || typeof props.categories === 'undefined') {
    return (
      <>
        {props.HeaderComponent}
        <LoadingView useThemeColor height={props.loaderHeight || props.height} width={100} />
      </>
    )
  }

  const renderItem = function (data: RenderItem) {
    const isLast = isLastElement(data.index, props.categories.length)
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            styles.root,
            isLast && props.isVertical ? styles.lastElement : {},
            props.isVertical ? styles.marginBottom : styles.marginLeft,
            isLast && !props.isVertical ? styles.marginRight : {},
            {
              height,
            }
          ]}
          onPress={() => handleClick(data.item)}
          key={data.item.id}
        >
          <Image
            progressiveRenderingEnabled
            blurRadius={imageLoading ? 2 : 0}
            onLoadEnd={handleImageLoad}
            style={[
              styles.image,
              {
                height,
                width
              },
              themedStyles.bg
            ]}
            source={{
              uri: data.item[imageSize]
            }}
          />
          <View style={[styles.totalNumberOfItems]}>
            <Text style={[styles.numberOfItemsText]}>{data.item.totalNumberOfItems}</Text>
          </View>
          <LinearGradient
            colors={['transparent', 'rgba(21, 21, 21, 0.7)']}
            style={[styles.textView, { height: height / 1.5, width }]}
          >
            <View style={[styles.flex, { width: width - wp(4), left: wp(2) }]}>
              <Text style={styles.title}>{data.item!.name}</Text>
              {!props.hideVisits ? <Text style={styles.lightText}>{numberToMetricScale(data.item.visits)}</Text> : null}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <FlatList
      ListHeaderComponent={props.HeaderComponent}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal={!props.isVertical}
      data={props.categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  )
})

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: hp(1.5)
  },
  image: {
    borderRadius: hp(1.5),
    resizeMode: 'cover'
  },
  textView: {
    position: 'absolute',
    bottom: 0,
    borderRadius: wp(3)
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: wp(4)
  },
  lastElement: {
    marginBottom: hp(6)
  },
  marginLeft: {
    marginLeft: wp(2),
    marginBottom: wp(2)
  },
  marginRight: {
    marginRight: wp(2)
  },
  marginBottom: {
    marginBottom: wp(2)
  },
  verticalAndLastElement: {},
  loadingView: {
    position: 'absolute'
  },
  totalNumberOfItems: {
    position: 'absolute',
    top: hp(1),
    right: wp(4),
    backgroundColor: 'white',
    padding: wp(1),
    paddingHorizontal: wp(2.4),
    borderRadius: wp(2)
  },
  numberOfItemsText: {
    fontWeight: 'bold',
    color: '#5b5bff',
    fontSize: wp(3.4)
  },
  flex: {
    position: 'absolute',
    bottom: hp(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  lightText: {
    color: 'white'
  }
})

export default Categories
