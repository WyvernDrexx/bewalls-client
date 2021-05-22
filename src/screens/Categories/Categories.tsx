import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Cards, CardData } from '../../components/Card';
import { useThemeStyles } from '../../hooks';
import { CategoriesScreenProps } from '../../navigation/types';

import HeadingTitle from '../../components/HeadingTitle';

const Categories: React.FC<CategoriesScreenProps> = function () {
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

  return (
    <View style={[styles.root, themeStyles.bg]}>
      <ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.brandsView}
          overScrollMode="never">
          <Cards items={BRANDS} height="8" width="38" />
        </ScrollView>
        <HeadingTitle disableMore={true} title="Choose your favourite" />
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
