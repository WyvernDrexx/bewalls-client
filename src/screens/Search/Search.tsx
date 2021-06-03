import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import { SearchTerm } from './HotSearches';

import Extras from './Extras';
import WallpaperView from '../../components/WallpaperView';
import NotFound from './NotFound';
import Results from './Results';
import SearchIcon from './search.svg';

import { useTheme } from '../../hooks';

import { BRANDS } from '../../sample/sampleData';
import { STYLES } from '../../styles';

import { WallpaperType } from '../../types';
import { SearchScreenProps } from '../../navigation/types';

const Search: React.FC<SearchScreenProps> = function () {
  const [searchStatus, setSearchStatus] =
    useState<null | 'none' | 'found'>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedWallpaper, setSelectedWallpaper] = useState<WallpaperType>();
  const [showWallpaper, setShowWallpaper] = useState(false);
  const [themeStyles, { colors }] = useTheme();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    if (searchText === 'OnePlus') {
      setSearchStatus('found');
    } else {
      setSearchStatus('none');
    }
    if (!searchText) {
      setSearchStatus(null);
    }
  }, [searchText]);

  const handleTextChange = (text: string) => {
    setSearchText(text);
  };

  const handleBoxClick = (color: string) => {
    console.log('Clicked Color', color);
  };

  const handleSearchTermClick = (searchTerm: SearchTerm) => {
    console.log('Clicked', searchTerm.term);
  };

  const handleResultClick = (select: WallpaperType) => {
    setSelectedWallpaper(select);
    setShowWallpaper(true);
  };

  const handleWallpaperViewClose = () => {
    setShowWallpaper(false);
  };

  const renderContents = () => {
    if (!searchStatus) {
      return (
        <Extras
          onColorBoxClick={handleBoxClick}
          onSearchTermClick={handleSearchTermClick}
        />
      );
    } else if (searchStatus === 'found') {
      return (
        <Results
          onClick={handleResultClick}
          numberOfResults={4}
          items={BRANDS}
          searchTerm="OnePlus"
        />
      );
    } else {
      return <NotFound />;
    }
  };

  return (
    <View style={[styles.root, themeStyles.bg]}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        <View style={[styles.searchContainer, themeStyles.bgLight]}>
          <View style={[STYLES.flexRowCenter]}>
            <View style={[styles.searchTextView]}>
              <SearchIcon
                fill={colors.secondary}
                height={heightPercentageToDP('3')}
                width={heightPercentageToDP('3')}
              />
              <TextInput
                value={searchText}
                onChangeText={handleTextChange}
                ref={inputRef}
                selectionColor={colors.secondary}
                style={[styles.searchInput, themeStyles.text]}
                placeholderTextColor={colors.secondary}
                placeholder="Search Devices"
              />
            </View>
          </View>
        </View>
        {renderContents()}
      </ScrollView>
      <WallpaperView
        onCloseClick={handleWallpaperViewClose}
        showWallpaper={showWallpaper}
        wallpaper={selectedWallpaper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: widthPercentageToDP(4),
    marginVertical: heightPercentageToDP(2),
    marginBottom: 0,
    borderRadius: heightPercentageToDP(1.5),
    height: heightPercentageToDP(8),
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: widthPercentageToDP(4),
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
