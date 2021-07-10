import React from 'react';
import { StyleSheet, View } from 'react-native';
import CategoryItems from '../../components/CategoryItems';
import StackHeader from '../../components/StackHeader';
import { Category, useCategoriesDataQuery } from '../../generated/graphql';
import { useTheme } from '../../hooks';
import { CategoriesScreenProps } from '../../navigation/types';

const Categories: React.FC<CategoriesScreenProps> = function (props) {
  const { themedStyles } = useTheme();

  const handleClick = (category: Category) => {
    props.navigation.navigate('Selection', {
      title: category.name,
      group: 'category',
      groupId: category.id,
    });
  };

  const { loading, data } = useCategoriesDataQuery();

  if (loading) return null;

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <StackHeader title="Categories" />
      <CategoryItems
        onClick={handleClick}
        isVertical
        group="category"
        categories={data?.categories as Category[]}
        height="23"
        width="96"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  categoryItems: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export { Categories };
