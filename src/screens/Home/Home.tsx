import React, { useState } from 'react';

import { View, StyleSheet, Keyboard } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import BottomDragMenu from '../../components/BottomDragMenu';
import Carousel from '../../components/Carousel';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import SideBar from '../../components/SideBar';
import { PADDING_SAFE } from '../../constants';
import getColorScheme from '../../utilities/getColorScheme';

const Home: React.FC = function (_) {
  const searchBarActive = useSharedValue(0);
  const [isSideBarShown, setIsSideBarShown] = useState(false);
  const COLORS = getColorScheme();

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
    setTimeout(() => {
      Keyboard.dismiss();
    }, 250);
  };

  const onMenuClick = () => {
    setIsSideBarShown(true);
  };

  const onMenuClose = () => {
    setIsSideBarShown(false);
  };

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: COLORS.primary,
      paddingHorizontal: PADDING_SAFE,
    },
  });

  return (
    <>
      <SideBar onMenuClose={onMenuClose} isShown={isSideBarShown} />
      <Header onMenuClick={onMenuClick} animatedStyle={headerStyle} />
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

export default Home;
