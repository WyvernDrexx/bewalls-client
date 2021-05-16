import React from 'react';

import { View, StyleSheet } from 'react-native';
import BottomDragMenu from '../../components/BottomDragMenu';
import Carousel from '../../components/Carousel';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import { PADDING_SAFE } from '../../constants';

const Home: React.FC = function (_) {
  return (
    <>
      <Header />
      <View style={styles.root}>
        <SearchBar />
        <Carousel />
        <BottomDragMenu />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: PADDING_SAFE,
  },
});

export default Home;
