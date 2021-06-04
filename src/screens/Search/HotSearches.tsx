import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { hp, wp } from '../../utilities';
import { useTheme } from '../../hooks';

export type SearchTerm = {
  term: string;
};

type HotSearchesProps = {
  onClick: (searchTerm: SearchTerm) => void;
  searchTerms: SearchTerm[];
};

const HotSearches: React.FC<HotSearchesProps> = function (props) {
  const [themeStyles] = useTheme();

  const handleClick = (searchTerm: SearchTerm) => {
    props.onClick(searchTerm);
  };

  return (
    <View style={styles.root}>
      <Text style={themeStyles.text}>Hot Searches</Text>
      <View style={styles.searchTermsContainer}>
        {props.searchTerms.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleClick(item)}
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
    paddingVertical: hp(4),
  },
  searchTermsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchTerm: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    marginRight: hp(3),
    marginTop: hp(3),
    borderRadius: hp(1),
  },
});

export default HotSearches;
