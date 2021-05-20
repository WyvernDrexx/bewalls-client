import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { SearchScreenProps } from '../../navigation/types';
import getColorScheme from '../../utilities/getColorScheme';

const Search: React.FC<SearchScreenProps> = function () {
  return (
    <View style={styles.root}>
      <Text>Search</Text>
    </View>
  );
};

const COLORS = getColorScheme();

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    backgroundColor: COLORS.primary,
    padding: heightPercentageToDP(2),
  },
});

export { Search };
