import React from 'react';

import { View, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import { PADDING_SAFE, PRIMARY_COLORS } from '../../constants';

const Home: React.FC = function (_) {
  return (
    <>
      <Header />
      <View style={styles.root}>
        <SearchBar />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PRIMARY_COLORS.bgColor,
    paddingHorizontal: PADDING_SAFE,
  },
});

export default Home;
