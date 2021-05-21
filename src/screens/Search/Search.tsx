import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useTheme, useThemeStyles } from '../../hooks';
import { SearchScreenProps } from '../../navigation/types';
import { STYLES } from '../../styles';
import HotSearches, { SearchTerm } from './HotSearches';

import SearchIcon from './search.svg';

const COLORS_BOX = [
  {
    color: '#00D3FF',
  },
  {
    color: '#FF002B',
  },
  {
    color: '#5B5BFF',
  },
  {
    color: '#E6D111',
  },
  {
    color: '#000000',
  },
  {
    color: '#26C741',
  },
];

const SEARCHES_TERM: SearchTerm[] = [
  {
    term: 'COOL',
  },
  {
    term: '3D',
  },
  {
    term: 'APPLE',
  },
  {
    term: 'ONEPLUS',
  },
  {
    term: 'OPPO',
  },
  {
    term: 'REALME',
  },
];

const Search: React.FC<SearchScreenProps> = function () {
  const inputRef = useRef<TextInput>(null);
  const themeStyles = useThemeStyles();
  const theme = useTheme();

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const onColorBoxClickHandler = (color: string) => {
    console.log('Clicked Color', color);
  };

  const onSearchTermClick = (searchTerm: SearchTerm) => {
    console.log('Clicked', searchTerm.term);
  };

  return (
    <View style={[styles.root, themeStyles.bg]}>
      <View style={[styles.searchContainer, themeStyles.bgLight]}>
        <View style={[STYLES.flexRowCenter]}>
          <View style={[styles.searchTextView]}>
            <SearchIcon
              fill={theme.colors.secondary}
              height={heightPercentageToDP('3')}
              width={heightPercentageToDP('3')}
            />
            <TextInput
              ref={inputRef}
              selectionColor={theme.colors.secondary}
              style={[styles.searchInput, themeStyles.text]}
              placeholderTextColor={theme.colors.secondary}
              placeholder="Search Devices"
            />
          </View>
        </View>
      </View>
      <View style={styles.instaBannerView}>
        <Image style={styles.instaImage} source={require('./insta.webp')} />
        <Text style={[styles.instaText]}>Follow Us On Instagram</Text>
      </View>
      <View style={styles.colorsView}>
        <Text style={[styles.colorsText, themeStyles.text]}>Colours</Text>
        <View style={styles.colorsContainer}>
          {COLORS_BOX.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                onPress={() => onColorBoxClickHandler(item.color)}>
                <View
                  style={[
                    styles.colorBox,
                    {
                      backgroundColor: item.color,
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View>
        <HotSearches
          onSearchTermClick={onSearchTermClick}
          searchTerms={SEARCHES_TERM}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: widthPercentageToDP(2),
  },
  searchContainer: {
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
  colorsView: {
    marginTop: heightPercentageToDP(4),
  },
  colorsText: {
    fontSize: heightPercentageToDP(2),
  },
  colorsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: heightPercentageToDP(3),
  },
  colorBox: {
    padding: heightPercentageToDP(1.5),
    borderRadius: widthPercentageToDP(100),
  },
});

export { Search };
