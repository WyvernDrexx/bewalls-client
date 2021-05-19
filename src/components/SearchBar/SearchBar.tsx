import React, { createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
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
import { STYLES } from '../../styles';
import getColorScheme from '../../utilities/getColorScheme';

import Search from './search.svg';

const COLORS = getColorScheme();

type SearchBarProps = {
  onSearchBarActive: () => void;
  onSearchBarRelease: () => void;
};

const SearchBar: React.FC<SearchBarProps> = function (props) {
  const activeSearch = useSharedValue(0);
  let inputRef = createRef<TextInput>();

  const headerHeight = heightPercentageToDP(9);
  const searchBarOffsetY = -(headerHeight - heightPercentageToDP(2));
  const placeholderOffsetX = heightPercentageToDP(5);
  const placeholderOffsetY = heightPercentageToDP(4.3);

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
      [0, -placeholderOffsetY],
    );
    const scale = interpolate(activeSearch.value, [0, 1], [1, 0.6]);
    const offsetX = interpolate(
      activeSearch.value,
      [0, 1],
      [0, -placeholderOffsetX],
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
            <View style={[styles.searchTextView]}>
              <Search
                fill={'gray'}
                height={heightPercentageToDP('3')}
                width={heightPercentageToDP('3')}
              />
              <Animated.Text
                style={[placeholderTextStyle, styles.placeholderText]}>
                Search Devices
              </Animated.Text>
              <Animated.View style={textInputStyle}>
                <TouchableOpacity onPress={onPressHandler}>
                  <TextInput
                    selectionColor={COLORS.secondary}
                    ref={inputRef}
                    style={styles.searchInput}
                  />
                </TouchableOpacity>
              </Animated.View>
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
    paddingTop: heightPercentageToDP(2),
  },
  searchContainer: {
    backgroundColor: COLORS.light,
    borderRadius: widthPercentageToDP('3'),
    paddingHorizontal: widthPercentageToDP(4),
    paddingVertical: widthPercentageToDP(2),
  },
  searchInput: {
    margin: 0,
    width: widthPercentageToDP(76),
    color: 'black',
    fontSize: heightPercentageToDP(2),
    marginLeft: widthPercentageToDP(3),
  },
  searchTextView: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderText: {
    color: 'gray',
    position: 'absolute',
    left: widthPercentageToDP(10),
    fontSize: heightPercentageToDP(2),
  },
  searchBarBackground: {
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
    position: 'absolute',
    zIndex: 0,
    backgroundColor: COLORS.primary,
    opacity: 1,
    paddingTop: heightPercentageToDP(14),
    paddingHorizontal: widthPercentageToDP(5),
  },
  searchResultsView: {
    // backgroundColor: 'tomato',
  },
});

export default SearchBar;
