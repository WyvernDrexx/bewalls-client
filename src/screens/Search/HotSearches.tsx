import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useTheme } from '../../hooks';

export type SearchTerm = {
  term: string;
};

type HotSearchesProps = {
  onSearchTermClick: (searchTerm: SearchTerm) => void;
  searchTerms: SearchTerm[];
};

const HotSearches: React.FC<HotSearchesProps> = function (props) {
  const onTermClickHandler = (searchTerm: SearchTerm) => {
    props.onSearchTermClick(searchTerm);
  };

  const [themeStyles] = useTheme();

  return (
    <View style={styles.root}>
      <Text style={themeStyles.text}>Hot Searches</Text>
      <View style={styles.searchTermsContainer}>
        {props.searchTerms.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => onTermClickHandler(item)}
              key={index}>
              <Text
                style={[
                  styles.searchTerm,
                  themeStyles.bgLight,
                  themeStyles.text,
                ]}>
                {item.term}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: heightPercentageToDP(4),
  },
  searchTermsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchTerm: {
    paddingHorizontal: widthPercentageToDP(4),
    paddingVertical: heightPercentageToDP(1),
    marginRight: heightPercentageToDP(3),
    marginTop: heightPercentageToDP(3),
    borderRadius: heightPercentageToDP(1),
  },
});

export default HotSearches;
