import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { hp } from '../../utilities';

import { Cards } from '../../components/Cards';
import { Box, Boxes } from '../../components/Carousel';
import { BRANDS, TRENDING_NOW } from '../../sample/sampleData';

import StackHeader from '../../components/StackHeader';
import HeadingTitle from '../../components/HeadingTitle';

import { useTheme } from '../../hooks';
import { CategoriesScreenProps } from '../../navigation/types';
import { WallpaperType } from '../../types';

const Categories: React.FC<CategoriesScreenProps> = function (props) {
  const [themeStyles] = useTheme();

  const CATEGORIES: Box[] = [
    {
      title: 'All',
      backgroundColor: 'black',
    },
    {
      title: 'Abstract',
      backgroundColor: 'tomato',
    },
    {
      title: 'Cars',
      backgroundColor: 'crimson',
    },
    {
      title: '3D',
      backgroundColor: 'teal',
    },
    {
      title: 'Stock',
      backgroundColor: 'orange',
    },
  ];

  const handleCardClick = (select: WallpaperType) => {
    props.navigation.navigate('Selection', { select: select.title! });
  };

  const handleBoxClick = (select: string) => {
    props.navigation.navigate('Selection', { select });
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={[styles.root, themeStyles.bg]}>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <StackHeader onLeftClick={goBack} title="Categories" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.brandsView}
          overScrollMode="never">
          <Cards
            onClick={handleCardClick}
            items={BRANDS}
            height="8"
            width="38"
          />
        </ScrollView>
        <HeadingTitle title="Choose your favourite" hideButton />
        <Boxes items={CATEGORIES} />
        <View style={styles.boxesView}>
          <Boxes onClick={handleBoxClick} items={CATEGORIES} />
        </View>
        <HeadingTitle title="Trending" hideButton />
        <Cards
          items={TRENDING_NOW}
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
