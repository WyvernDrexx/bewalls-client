import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useTheme } from '../../hooks';
import { STYLES } from '../../styles';

import Search from './search.svg';

type SearchBarProps = {
  onSearchBarActive: () => void;
  isTouchEnabled?: boolean;
};

const SearchBar: React.FC<SearchBarProps> = function (props) {
  const onPressHandler = () => {
    props.onSearchBarActive();
  };

  const [themeStyles, theme] = useTheme();

  return (
    <>
      <View style={[styles.root]}>
        <TouchableOpacity
          disabled={props.isTouchEnabled}
          onPress={onPressHandler}
          activeOpacity={0.8}
          style={[styles.searchContainer, themeStyles.bgLight]}>
          <View style={[STYLES.flexRowCenter]}>
            <View style={[styles.searchTextView]}>
              <Search
                fill={theme.colors.secondary}
                height={heightPercentageToDP('3')}
                width={heightPercentageToDP('3')}
              />
              <Text style={[styles.placeholderText, themeStyles.text]}>
                Search Devices
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: widthPercentageToDP(2),
    zIndex: 1,
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: widthPercentageToDP(4),
    marginVertical: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1.5),
    marginBottom: 0,
    height: heightPercentageToDP(8),
    zIndex: 0,
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
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderText: {
    color: 'gray',
    position: 'absolute',
    left: widthPercentageToDP(10),
    fontSize: heightPercentageToDP(2),
  },
});

export default SearchBar;
