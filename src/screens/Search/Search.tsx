import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { SearchTerm } from './HotSearches';

import Extras from './Extras';
import WallpaperView from '../../components/WallpaperView';
import NotFound from './NotFound';
import Results from './Results';
import SearchIcon from './search.svg';

import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';

import { BRANDS } from '../../sample/sampleData';
import { WallpaperType } from '../../types';
import { SearchScreenProps } from '../../navigation/types';

const Search: React.FC<SearchScreenProps> = function () {
  const [searchStatus, setSearchStatus] =
    useState<null | 'none' | 'found'>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedWallpaper, setSelectedWallpaper] = useState<WallpaperType>();
  const [showWallpaper, setShowWallpaper] = useState(false);
  const {
    themedStyles,
    theme: { colors },
  } = useTheme();
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
    <View style={[styles.root, themedStyles.bg]}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        <View style={[styles.searchContainer, themedStyles.bgLight]}>
          <View style={styles.flexView}>
            <View style={[styles.searchTextView]}>
              <SearchIcon
                fill={colors.secondary}
                height={hp('3')}
                width={hp('3')}
              />
              <TextInput
                value={searchText}
                onChangeText={handleTextChange}
                ref={inputRef}
                selectionColor={colors.secondary}
                style={[styles.searchInput, themedStyles.text]}
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
    paddingHorizontal: wp(4),
    marginVertical: hp(2),
    marginBottom: 0,
    borderRadius: hp(1.5),
    height: hp(8),
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: wp(4),
  },
  flexView: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    width: wp(76),
    fontSize: hp(2),
    marginLeft: wp(3),
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
    fontSize: hp(2),
  },
  colorsView: {
    marginTop: hp(4),
  },
  colorsText: {
    fontSize: hp(2),
  },
  colorsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp(3),
  },
  colorBox: {
    padding: hp(1.5),
    borderRadius: wp(100),
  },
});

export { Search };
