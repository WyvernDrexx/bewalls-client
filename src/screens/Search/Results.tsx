import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../../utilities';

import { Cards } from '../../components/Cards';

import { useTheme } from '../../hooks';
import { WallpaperType } from '../../types';

type ResultsProps = {
  items: WallpaperType[];
  searchTerm: string;
  numberOfResults: number;
  onClick?: (select: WallpaperType, index: number) => void;
};

const Results: React.FC<ResultsProps> = function (props) {
  const [themeStyles] = useTheme();

  return (
    <View style={styles.root}>
      <Text style={[styles.searchTermText, themeStyles.text]}>
        "{props.searchTerm}"
      </Text>
      <Text style={[styles.subText, themeStyles.text]}>
        {props.numberOfResults} Wallpapers are available.
      </Text>
      <View style={styles.resultsView}>
        <Cards
          disableLastMargin
          disableText
          height="34"
          width="44"
          items={props.items}
          onClick={props.onClick}
          style={{ marginBottom: hp(2) }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: hp(4),
    paddingHorizontal: wp(4),
  },
  searchTermText: {
    fontSize: hp(4),
    fontWeight: 'bold',
  },
  subText: {
    color: 'gray',
  },
  resultsView: {
    marginTop: hp(3),
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: wp(-4),
  },
});

export default Results;
