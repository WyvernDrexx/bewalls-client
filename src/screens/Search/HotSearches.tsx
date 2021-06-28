import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HotSearchTerm } from '../../generated/graphql';
import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';

type HotSearchesProps = {
  onClick: (searchTerm: HotSearchTerm) => void;
  searchTerms: HotSearchTerm[];
};

const HotSearches: React.FC<HotSearchesProps> = function (props) {
  const { themedStyles } = useTheme();

  const handleClick = (searchTerm: HotSearchTerm) => {
    props.onClick(searchTerm);
  };

  return (
    <View style={styles.root}>
      <Text style={themedStyles.text}>Hot Searches</Text>
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
                  themedStyles.bgLight,
                  themedStyles.text,
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
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    marginRight: hp(3),
    marginTop: hp(3),
    borderRadius: hp(1),
  },
});

export default HotSearches;
