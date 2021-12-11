import React, { useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import CategoryItems from '../../components/CategoryItems'
import { LoadingView } from '../../components/Loader/LoadingView'
import MountOn from '../../components/MountOn'
import MiniSearchButton from '../../components/SearchBar/MiniSearchButton'
import StackHeader from '../../components/StackHeader'
import { Category, useCategoriesDataQuery } from '../../generated/graphql'
import { useTheme } from '../../hooks'
import { CategoriesScreenProps } from '../../navigation/types'

const Categories: React.FC<CategoriesScreenProps> = function (props) {
  const { themedStyles } = useTheme()
  const { loading, data } = useCategoriesDataQuery()

  const handleClick = useCallback((category: Category) => {
    props.navigation.navigate('Selection', {
      title: category.name,
      group: 'category',
      groupId: category.id
    })
  }, [props.navigation])

  const handleSearchButtonClick = useCallback(() => {
    props.navigation.navigate('Search')
  }, [props.navigation])


  return (
    <View style={[styles.root, themedStyles.bg]}>
      <MountOn
        fallback={
          <>
            <StackHeader right={<MiniSearchButton onClick={handleSearchButtonClick} />} title='Categories' />
            <LoadingView height={90} />
          </>
        }
        on={!loading}
      >
        <CategoryItems
          HeaderComponent={
            <StackHeader right={<MiniSearchButton onClick={handleSearchButtonClick} />} title='Categories' />
          }
          onClick={handleClick}
          isVertical
          group='category'
          categories={data?.categories as Category[]}
          height='23'
          width='96'
        />
      </MountOn>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  categoryItems: {
    display: 'flex',
    justifyContent: 'center'
  }
})

export { Categories }
