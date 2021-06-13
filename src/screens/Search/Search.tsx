import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { SearchTerm } from './HotSearches';

import Extras from './Extras';
import WallpaperView from '../../components/WallpaperView';
import NotFound from './NotFound';
import Results from './Results';
import SearchSvg from './search.svg';
import CloseSvg from './close.svg';
import LeftArrowSvg from './left-arrow.svg';

import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';

import { SearchScreenProps } from '../../navigation/types';
import { useSearchTextStringQuery, Wallpaper } from '../../generated/graphql';
import MountAnimatedView from '../../components/MountAnimatedView';

const Search: React.FC<SearchScreenProps> = function (props) {
  const [searchStatus, setSearchStatus] =
    useState<null | 'none' | 'found'>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper>();
  const [showWallpaper, setShowWallpaper] = useState(false);
  const {
    themedStyles,
    theme: { colors },
  } = useTheme();
  const [iskeyboardVisible, setIskeyboardVisible] = useState(true);
  const inputRef = useRef<TextInput>(null);
  const { data, loading } = useSearchTextStringQuery({
    variables: {
      searchText,
    },
  });

  console.log(data?.search);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTextChange = (text: string) => {
    setSearchText(text);
  };

  const handleBoxClick = (color: string) => {
    console.log('Clicked Color', color);
  };

  const handleSearchTermClick = (searchTerm: SearchTerm) => {
    console.log('Clicked', searchTerm.term);
  };

  const handleResultClick = (select: Wallpaper) => {
    setSelectedWallpaper(select);
    setShowWallpaper(true);
  };

  const handleWallpaperViewClose = () => {
    setShowWallpaper(false);
  };

  const handleBackClick = () => {
    props.navigation.goBack();
  };

  const handleSearchClick = () => {
    console.log('search');
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
          numberOfResults={data?.search.wallpapers.length || 0}
          items={data?.search.wallpapers as Wallpaper[]}
          searchTerm={searchText}
        />
      );
    } else {
      return <NotFound />;
    }
  };

  useEffect(() => {
    if (!data) {
      setSearchStatus('none');
    } else if (!data.search) {
      setSearchStatus('none');
    } else if (!data.search.wallpapers.length) {
      setSearchStatus('none');
    } else {
      setSearchStatus('found');
    }
    if (!searchText) setSearchStatus(null);
  }, [data, searchText]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      setIskeyboardVisible(false);
      inputRef.current?.blur();
    });
    Keyboard.addListener('keyboardDidShow', () => {
      setIskeyboardVisible(true);
    });
  }, []);

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        <View style={[styles.searchContainer, themedStyles.bgLight]}>
          <View style={styles.flexView}>
            <View style={[styles.searchTextView]}>
              {iskeyboardVisible ? (
                <TouchableOpacity onPress={handleSearchClick}>
                  <SearchSvg
                    fill={colors.secondary}
                    height={hp('3')}
                    width={hp('3')}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleBackClick}>
                  <LeftArrowSvg
                    fill={colors.secondary}
                    height={hp('3')}
                    width={hp('3')}
                  />
                </TouchableOpacity>
              )}
              <TextInput
                value={searchText}
                onChangeText={handleTextChange}
                ref={inputRef}
                selectionColor={colors.secondary}
                style={[styles.searchInput, themedStyles.text]}
                placeholderTextColor={colors.secondary}
                placeholder="Search Devices"
                returnKeyType="search"
              />
            </View>
            {searchText.length ? (
              <TouchableOpacity onPress={() => handleTextChange('')}>
                <CloseSvg
                  fill={colors.secondary}
                  height={hp('1.8')}
                  width={hp('1.8')}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <MountAnimatedView
          animationDelay={500}
          renderTriggerValue={searchStatus}>
          {loading ? <ActivityIndicator color="red" /> : renderContents()}
        </MountAnimatedView>
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
    width: wp(73),
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
