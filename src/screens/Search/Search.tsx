import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { SearchScreenProps } from '../../navigation/types';
import { STYLES } from '../../styles';
import getColorScheme from '../../utilities/getColorScheme';

import SearchIcon from './search.svg';

const Search: React.FC<SearchScreenProps> = function () {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <View style={styles.root}>
      <View style={styles.searchContainer}>
        <View style={[STYLES.flexRowCenter]}>
          <View style={[styles.searchTextView]}>
            <SearchIcon
              fill={'gray'}
              height={heightPercentageToDP('3')}
              width={heightPercentageToDP('3')}
            />
            <TextInput
              ref={inputRef}
              selectionColor={COLORS.secondary}
              style={styles.searchInput}
              placeholder="Search Devices"
            />
          </View>
        </View>
      </View>
      <View style={styles.instaBannerView}>
        <Image style={styles.instaImage} source={require('./insta.webp')} />
        <Text style={styles.instaText}>Follow Us On Instagram</Text>
      </View>
    </View>
  );
};

const COLORS = getColorScheme();

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: widthPercentageToDP(2),
  },
  searchContainer: {
    backgroundColor: COLORS.light,
    paddingHorizontal: widthPercentageToDP(4),
    marginVertical: heightPercentageToDP(2),
    marginBottom: 0,
    borderRadius: heightPercentageToDP(1.5),
    height: heightPercentageToDP(8),
    display: 'flex',
    justifyContent: 'center',
  },
  searchInput: {
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
  instaBannerView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentageToDP(3),
  },
  instaImage: {
    width: widthPercentageToDP(96),
    height: heightPercentageToDP(15),
    borderRadius: widthPercentageToDP(4),
  },
  instaText: {
    position: 'absolute',
    color: 'white',
    fontSize: heightPercentageToDP(3.5),
    fontWeight: 'bold',
    width: widthPercentageToDP(96),
    textAlign: 'center',
    padding: heightPercentageToDP(2),
  },
});

export { Search };
