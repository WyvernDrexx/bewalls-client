import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CategoryItems from '../../components/CategoryItems';
import StackHeader from '../../components/StackHeader';
import { Category, useCategoriesQuery } from '../../generated/graphql';
import { useTheme } from '../../hooks';
import { CategoriesScreenProps } from '../../navigation/types';
import { hp } from '../../utilities';

const Categories: React.FC<CategoriesScreenProps> = function (props) {
  const { themedStyles } = useTheme();

  const handleClick = (category: Category) => {
    props.navigation.navigate('Selection', {
      title: category.name,
      group: 'category',
      groupId: category.id,
    });
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const { loading, data } = useCategoriesQuery();

  if (loading) return null;

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <StackHeader
          onLeftClick={goBack}
          titlePosition="left"
          title="Categories"
        />
        <View style={styles.categoryItems}>
          <CategoryItems
            onClick={handleClick}
            isVertical
            group="category"
            categories={data?.categories as Category[]}
            height="25"
            width="94"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  brandsView: {
    marginTop: hp(3),
  },
  boxesView: {
    paddingTop: hp(2),
  },
  cards: {
    marginBottom: hp(2),
  },
  categoryItems: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export { Categories };
