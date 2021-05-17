import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
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
  const [isEditable, setIsEditable] = useState(false);
  const activeSearch = useSharedValue(0);
  const onPressHandler = () => {
    setIsEditable(true);
    props.onSearchBarActive();
    activeSearch.value = 1;
  };

  const onReleaseHandler = () => {
    setIsEditable(false);
    props.onSearchBarRelease();
    activeSearch.value = 0;
  };

  const animatedStyle = useAnimatedStyle(() => {
    const offsetY = interpolate(activeSearch.value, [0, 1], [0, -50]);
    return {
      transform: [
        {
          translateY: Animated.withTiming(offsetY),
        },
      ],
    };
  });

  const backgroundViewStyle = useAnimatedStyle(() => {
    const offsetY = interpolate(activeSearch.value, [0, 1], [0, -10]);
    return {
      transform: [
        {
          translateY: Animated.withTiming(offsetY),
        },
      ],
      opacity: Animated.withTiming(activeSearch.value),
      zIndex: activeSearch.value,
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
              <Text style={styles.placeholderText}>Search Devices</Text>
              <TextInput editable={isEditable} />
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
  },
  searchContainer: {
    backgroundColor: PRIMARY_COLORS.bgColor,
    borderRadius: widthPercentageToDP('3'),
    paddingHorizontal: widthPercentageToDP('4'),
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
    fontSize: heightPercentageToDP('2.5'),
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
    top: 0,
    zIndex: 1,
    backgroundColor: 'white',
    opacity: 1,
  },
  searchResultsView: {
    // backgroundColor: 'tomato',
    padding: 20,
  },
});

export default SearchBar;
