import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Cards, CardData } from '../../components/Card';
import { useThemeStyles } from '../../hooks';
import { CategoriesScreenProps } from '../../navigation/types';

import HeadingTitle from '../../components/HeadingTitle';
import { Box, Boxes } from '../../components/Carousel';

const Categories: React.FC<CategoriesScreenProps> = function (props) {
  const themeStyles = useThemeStyles();

  const BRANDS: CardData[] = [
    {
      title: 'Apple',
      image: require('./apple.jpg'),
    },

    {
      title: 'OnePlus',
      image: require('./oneplus.png'),
    },
    {
      title: 'Realme',
      image: require('./realme.jpg'),
    },
  ];

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
  const onCardClick = (select: CardData) => {
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
          items={BRANDS}
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
