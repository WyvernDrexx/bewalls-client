import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Cards } from '../../components/Card';
import { useTheme } from '../../hooks';
import { CategoriesScreenProps } from '../../navigation/types';

import HeadingTitle from '../../components/HeadingTitle';
import { Box, Boxes } from '../../components/Carousel';
import { WallpaperType } from '../../types';
import { BRANDS, TRENDING_NOW } from '../../sample/sampleData';

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

  const onCardClick = (select: WallpaperType) => {
    props.navigation.navigate('Selection', { select: select.title! });
  };

  const onBoxClick = (select: string) => {
    props.navigation.navigate('Selection', { select });
  };

  return (
    <View style={[styles.root, themeStyles.bg]}>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.brandsView}
          overScrollMode="never">
          <Cards onClick={onCardClick} items={BRANDS} height="8" width="38" />
        </ScrollView>
        <HeadingTitle disableMore={true} title="Choose your favourite" />
        <Boxes items={CATEGORIES} />
        <View style={{ paddingTop: heightPercentageToDP(2) }}>
          <Boxes onClick={onBoxClick} items={CATEGORIES} />
        </View>
        <HeadingTitle title="Trending" disableMore />
        <Cards
          items={TRENDING_NOW}
          height="14"
          onClick={onCardClick}
          width="92"
          style={{ marginBottom: heightPercentageToDP(2) }}
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
    marginTop: heightPercentageToDP(3),
  },
});

export { Categories };
