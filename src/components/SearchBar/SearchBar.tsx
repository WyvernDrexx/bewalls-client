import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';
import SearchSvg from './search.svg';

type SearchBarProps = {
  onSearchBarActive?: () => void;
  disabled?: boolean;
};

const SearchBar: React.FC<SearchBarProps> = function (props) {
  const onClick = () => {
    if (props.onSearchBarActive) props.onSearchBarActive();
  };

  const {
    themedStyles,
    theme: { colors },
  } = useTheme();

  return (
    <View style={[styles.root]}>
      <TouchableOpacity
        disabled={props.disabled}
        onPress={onClick}
        activeOpacity={0.8}
        style={[styles.searchContainer, themedStyles.bgLight]}>
        <View style={[styles.flexView]}>
          <View style={[styles.searchTextView]}>
            <SearchSvg fill={colors.secondary} height={wp(6)} width={wp(6)} />
            <Text style={[styles.placeholderText, themedStyles.text]}>
              Search Devices
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: wp(2),
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: wp(4),
    marginVertical: hp(2),
    borderRadius: hp(1.5),
    marginBottom: 0,
    height: hp(8),
  },
  flexView: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchTextView: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderText: {
    position: 'absolute',
    left: wp(10),
    fontSize: wp(4),
  },
});

export default SearchBar;
