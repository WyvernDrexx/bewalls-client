import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Cards } from '../../components/Cards';
import { Boxes } from '../../components/Carousel';

import StackHeader from '../../components/StackHeader';
import HeadingTitle from '../../components/HeadingTitle';

import { useTheme } from '../../hooks';
import { hp } from '../../utilities';

import { CategoriesScreenProps } from '../../navigation/types';
import {
  Category,
  useHomeScreenDataQuery,
  Wallpaper,
} from '../../generated/graphql';

const Categories: React.FC<CategoriesScreenProps> = function (props) {
  const { themedStyles } = useTheme();

  const handleCardClick = (select: Wallpaper) => {
    props.navigation.navigate('Selection', { select: select.name! });
  };

  const handleBoxClick = (select: string) => {
    props.navigation.navigate('Selection', { select });
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const { loading, data } = useHomeScreenDataQuery();

  if (loading) return null;

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <StackHeader onLeftClick={goBack} title="Categories" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.brandsView}
          overScrollMode="never">
          <Cards
            onClick={handleCardClick}
            items={data?.trending as Wallpaper[]}
            height="8"
            width="38"
          />
        </ScrollView>
        <HeadingTitle title="Choose your favourite" hideButton />
        <Boxes items={data?.categories as Category[]} />
        <View style={styles.boxesView}>
          <Boxes
            onClick={handleBoxClick}
            items={data?.categories as Category[]}
          />
        </View>
        <HeadingTitle title="Trending" hideButton />
        <Cards
          items={data?.trending as Wallpaper[]}
          onClick={handleCardClick}
          height="14"
          width="92"
          style={styles.cards}
        />
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
});

export { Categories };
