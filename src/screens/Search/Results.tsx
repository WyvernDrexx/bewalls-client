import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Cards } from '../../components/Card';
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
          style={{ marginBottom: heightPercentageToDP(2) }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: heightPercentageToDP(4),
    paddingHorizontal: widthPercentageToDP(2),
  },
  searchTermText: {
    fontSize: heightPercentageToDP(4),
    fontWeight: 'bold',
  },
  subText: {
    color: 'gray',
  },
  resultsView: {
    marginTop: heightPercentageToDP(3),
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: widthPercentageToDP(-2),
  },
});

export default Results;
