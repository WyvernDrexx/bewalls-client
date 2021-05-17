import React from 'react';

import { View, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import BottomDragMenu from '../../components/BottomDragMenu';
import Carousel from '../../components/Carousel';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import { PADDING_SAFE } from '../../constants';

const Home: React.FC = function (_) {
  const searchBarActive = useSharedValue(0);
  const headerStyle = useAnimatedStyle(() => {
    const offsetY = interpolate(searchBarActive.value, [0, 1], [0, -100]);
    return {
      transform: [{ translateY: Animated.withTiming(offsetY) }],
    };
  });

  const bottomDragMenuStyle = useAnimatedStyle(() => {
    const offsetY = interpolate(searchBarActive.value, [0, 1], [0, 100]);
    return {
      transform: [{ translateY: Animated.withTiming(offsetY) }],
    };
  });

  const onSearchBarActive = () => {
    searchBarActive.value = 1;
  };

  const onSearchBarRelease = function () {
    searchBarActive.value = 0;
  };

  return (
    <>
      <Header animatedStyle={headerStyle} />
      <View style={styles.root}>
        <SearchBar
          onSearchBarActive={onSearchBarActive}
          onSearchBarRelease={onSearchBarRelease}
        />
        <Carousel />
        <BottomDragMenu animatedStyle={bottomDragMenuStyle} />
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
