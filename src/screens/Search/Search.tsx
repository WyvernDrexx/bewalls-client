import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useTheme } from '../../hooks';
import { SearchScreenProps } from '../../navigation/types';
import { BRANDS } from '../../sample/sampleData';
import { STYLES } from '../../styles';
import { WallpaperType } from '../../types';
import Extras from './Extras';
import { SearchTerm } from './HotSearches';
import Results from './Results';
import SearchIcon from './search.svg';

const Search: React.FC<SearchScreenProps> = function () {
  const [searchStatus, setSearchStatus] =
    useState<null | 'none' | 'found'>('found');
  const inputRef = useRef<TextInput>(null);
  const [themeStyles, theme] = useTheme();

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    const id = setTimeout(() => {
      setSearchStatus('none');
    }, 6000);
    return () => clearTimeout(id);
  }, []);

  const onColorBoxClickHandler = (color: string) => {
    console.log('Clicked Color', color);
  };

  const onSearchTermClick = (searchTerm: SearchTerm) => {
    console.log('Clicked', searchTerm.term);
  };

  const onResultClick = (select: WallpaperType) => {
    console.log(select);
  };

  const renderContents = () => {
    if (!searchStatus) {
      return (
        <Extras
          onColorBoxClick={onColorBoxClickHandler}
          onSearchTermClick={onSearchTermClick}
        />
      );
    } else if (searchStatus === 'found') {
      return (
        <Results
          onClick={onResultClick}
          numberOfResults={4}
          items={[...BRANDS, ...BRANDS]}
          searchTerm="OnePlus"
        />
      );
    } else {
      return (
        <Extras
          onColorBoxClick={onColorBoxClickHandler}
          onSearchTermClick={onSearchTermClick}
        />
      );
    }
  };

  return (
    <View style={[styles.root, themeStyles.bg]}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
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
        {renderContents()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: widthPercentageToDP(2),
    paddingBottom: 0,
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
