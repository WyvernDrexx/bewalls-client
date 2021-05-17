import React, { createRef, useState } from 'react';
import { StyleSheet, TextInput, View, Text, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { PRIMARY_COLORS } from '../../constants';
import { STYLES } from '../../styles';

import Search from './search.svg';

type SearchBarProps = {
  onSearchBarActive: () => void;
  onSearchBarRelease: () => void;
};

const SearchBar: React.FC<SearchBarProps> = function (props) {
  const activeSearch = useSharedValue(0);
  let inputRef = createRef<TextInput>();

  const headerHeight = heightPercentageToDP(9);
  const searchBarOffsetY = -(headerHeight - heightPercentageToDP(2));
  const placeholderOffset = heightPercentageToDP(3.7);

  const onPressHandler = () => {
    if (!activeSearch.value) {
      props.onSearchBarActive();
      activeSearch.value = 1;
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  };

  const onReleaseHandler = () => {
    props.onSearchBarRelease();
    activeSearch.value = 0;
  };

  const animatedStyle = useAnimatedStyle(() => {
    const offsetY = interpolate(
      activeSearch.value,
      [0, 1],
      [0, searchBarOffsetY],
    );
    return {
      transform: [
        {
          translateY: Animated.withTiming(offsetY),
        },
      ],
    };
  });

  const backgroundViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: Animated.withTiming(-headerHeight),
        },
      ],
      opacity: Animated.withTiming(activeSearch.value),
      zIndex: activeSearch.value,
    };
  });

  const textInputStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(activeSearch.value),
        },
      ],
    };
  });

  const placeholderTextStyle = useAnimatedStyle(() => {
    const offsetY = interpolate(
      activeSearch.value,
      [0, 1],
      [0, -placeholderOffset],
    );
    const scale = interpolate(activeSearch.value, [0, 1], [1, 0.6]);
    const offsetX = interpolate(
      activeSearch.value,
      [0, 1],
      [0, -placeholderOffset],
    );
    return {
      transform: [
        {
          scale: withTiming(scale),
        },
        {
          translateY: withTiming(offsetY),
        },
        {
          translateX: withTiming(offsetX),
        },
      ],
    };
  });

  return (
    <>
      <Animated.View style={[animatedStyle, styles.root]}>
        <TouchableOpacity
          onPress={onPressHandler}
          onLongPress={onReleaseHandler}
          activeOpacity={0.8}
          style={styles.searchContainer}>
          <View style={[STYLES.flexRowCenter]}>
            <View style={[styles.searchTextView, STYLES.flexRowCenter]}>
              <Animated.Text
                style={[placeholderTextStyle, styles.placeholderText]}>
                Search Devices
              </Animated.Text>
              <Animated.View style={textInputStyle}>
                <TouchableOpacity onPress={onPressHandler}>
                  <TextInput ref={inputRef} style={styles.searchInput} />
                </TouchableOpacity>
              </Animated.View>
            </View>
            <View>
              <Search
                fill="#8C8BF0"
                height={heightPercentageToDP('3')}
                width={heightPercentageToDP('3')}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[backgroundViewStyle, styles.searchBarBackground]}>
        <TouchableOpacity onPress={onReleaseHandler}>
          <View style={styles.searchResultsView}>
            <Text>Hello world</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    zIndex: 100,
    height: heightPercentageToDP(8),
  },
  searchContainer: {
    backgroundColor: PRIMARY_COLORS.bgColor,
    borderRadius: widthPercentageToDP('3'),
    paddingHorizontal: widthPercentageToDP('3.5'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  searchInput: {
    fontSize: heightPercentageToDP('2'),
    margin: 0,
    width: widthPercentageToDP(76),
    color: 'black',
  },
  searchTextView: {},
  placeholderText: {
    color: 'lightgray',
    position: 'absolute',
  },
  searchBarBackground: {
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'white',
    opacity: 1,
    paddingTop: heightPercentageToDP(11),
    paddingHorizontal: widthPercentageToDP(5),
  },
  searchResultsView: {
    // backgroundColor: 'tomato',
  },
});

export default SearchBar;
