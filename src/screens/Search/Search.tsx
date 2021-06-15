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
import { Color, SearchResult, Wallpaper } from '../../generated/graphql';
import MountAnimatedView from '../../components/MountAnimatedView';
import { apolloClient } from '../../apollo';
import gql from 'graphql-tag';

const Search: React.FC<SearchScreenProps> = function (props) {
  const [searchText, setSearchText] = useState('');
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper>();
  const [showWallpaper, setShowWallpaper] = useState(false);
  const {
    themedStyles,
    theme: { colors },
  } = useTheme();
  const [iskeyboardVisible, setIskeyboardVisible] = useState(true);
  const inputRef = useRef<TextInput>(null);

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [searchResults, setSearchResults] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTextChange = (text: string) => {
    setLoading(true);
    setSearchText(text);
  };

  const handleBoxClick = (color: Color) => {
    props.navigation.navigate('Selection', {
      group: 'color',
      groupId: color.id,
      title: `${color.name}`,
    });
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
    if (loading) return null;
    if (!searchText) {
      return (
        <Extras
          onColorBoxClick={handleBoxClick}
          onSearchTermClick={handleSearchTermClick}
        />
      );
    }

    if (searchResults.length) {
      return (
        <Results
          onClick={handleResultClick}
          numberOfResults={searchResults.length || 0}
          items={searchResults as Wallpaper[]}
          searchTerm={searchText}
        />
      );
    }

    if (!loading && !searchResults.length && searchText) {
      return <NotFound />;
    }
    return (
      <Extras
        onColorBoxClick={handleBoxClick}
        onSearchTermClick={handleSearchTermClick}
      />
    );
  };

  const renderSearchBarButtons = () => {
    if (loading) {
      return <ActivityIndicator color="black" />;
    }
    if (searchText.length) {
      return (
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => handleTextChange('')}>
          <CloseSvg
            fill={colors.secondary}
            height={hp('1.8')}
            width={hp('1.8')}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.rightIcon} />;
  };

  useEffect(() => {
    if (!searchText) setLoading(false);
    if (searchText.length < 3) return;
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setTimeoutId(
      setTimeout(async () => {
        const { data } = await apolloClient.query<{ search: SearchResult }>({
          query: gql`
            query SearchTextString($searchText: String!) {
              search(searchText: $searchText) {
                wallpapers {
                  name
                  imageUri
                  downloads
                  id
                }
              }
            }
          `,
          variables: {
            searchText,
          },
        });
        setSearchResults((data.search.wallpapers as Wallpaper[]) || []);
        setLoading(false);
      }, 150),
    );
  }, [searchText]);

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
            {renderSearchBarButtons()}
          </View>
        </View>
        <MountAnimatedView>{renderContents()}</MountAnimatedView>
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
    paddingRight: wp(4),
  },
  rightIcon: {},
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
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(50),
  },
});

export { Search };
