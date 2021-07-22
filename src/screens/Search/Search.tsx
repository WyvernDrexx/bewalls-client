import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import WallpaperView from '../../components/WallpaperView';
import {
  Color,
  HotSearchTerm,
  useSearchTextStringLazyQuery,
  Wallpaper,
} from '../../generated/graphql';
import { useTheme, useWallpaperView } from '../../hooks';
import { SearchScreenProps } from '../../navigation/types';
import { hp, wp } from '../../utilities';
import CloseSvg from './close.svg';
import Extras from './Extras';
import LeftArrowSvg from './left-arrow.svg';
import NotFound from './NotFound';
import Results from './Results';
import SearchSvg from './search.svg';

const Search: React.FC<SearchScreenProps> = function (props) {
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [searchResults, setSearchResults] = useState<Wallpaper[]>([]);
  const [iskeyboardVisible, setIskeyboardVisible] = useState(true);
  const { themedStyles, theme } = useTheme();
  const { wallpaper, setWallpaper } = useWallpaperView();
  const [searchTextString, { loading }] = useSearchTextStringLazyQuery({
    onCompleted: data => {
      setSearchResults((data.search.wallpapers as Wallpaper[]) || []);
      setIsChanged(false);
    },
  });
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTextChange = (text: string) => {
    setIsChanged(true);
    setSearchText(text);
  };

  const handleBoxClick = (color: Color) => {
    props.navigation.navigate('Selection', {
      group: 'color',
      groupId: color.id,
      title: `${color.name}`,
    });
  };

  const handleSearchTermClick = (searchTerm: HotSearchTerm) => {
    setSearchText(searchTerm.term);
  };

  const handleBackClick = () => {
    props.navigation.goBack();
  };

  const handleSearchClick = () => {};

  const handleRecentUploadsClick = () => {
    props.navigation.navigate('Selection', {
      group: 'none',
      groupId: 'none',
      title: 'Recent Uploads',
    });
  };

  const renderContents = () => {
    if (loading) return null;
    if (searchText.length < 2) {
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
          onClick={setWallpaper}
          numberOfResults={searchResults.length || 0}
          items={searchResults as Wallpaper[]}
          searchTerm={searchText}
        />
      );
    }

    if (!searchResults.length && searchText.length > 1) {
      return (
        <NotFound
          onClick={setWallpaper}
          onRecentUploadsClick={handleRecentUploadsClick}
        />
      );
    }

    return (
      <Extras
        onColorBoxClick={handleBoxClick}
        onSearchTermClick={handleSearchTermClick}
      />
    );
  };
  const renderSearchBarButtons = () => {
    if (loading || isChanged) {
      return <ActivityIndicator color={theme.colors.secondary} />;
    }
    if (searchText.length) {
      return (
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => handleTextChange('')}>
          <CloseSvg
            fill={theme.colors.secondary}
            height={hp('1.8')}
            width={hp('1.8')}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.rightIcon} />;
  };

  useEffect(() => {
    if (searchText.length < 2) {
      return setIsChanged(false);
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setTimeoutId(
      setTimeout(async () => {
        searchTextString({ variables: { searchText } });
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
    return () => {
      Keyboard.removeAllListeners('keyboardDidHide');
      Keyboard.removeAllListeners('keyboardDidShow');
    };
  }, []);

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <View style={[styles.searchContainer, themedStyles.bgLight]}>
        <View style={styles.flexView}>
          <View style={[styles.searchTextView]}>
            {iskeyboardVisible ? (
              <TouchableOpacity onPress={handleSearchClick}>
                <SearchSvg
                  fill={theme.colors.secondary}
                  height={wp(5)}
                  width={wp(5)}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleBackClick}>
                <LeftArrowSvg
                  fill={theme.colors.secondary}
                  height={wp(5)}
                  width={wp(5)}
                />
              </TouchableOpacity>
            )}
            <TextInput
              value={searchText}
              onChangeText={handleTextChange}
              ref={inputRef}
              selectionColor={theme.colors.secondary}
              style={[styles.searchInput, themedStyles.text]}
              placeholderTextColor={theme.colors.secondary}
              placeholder="Search Devices"
              returnKeyType="search"
            />
          </View>
          {renderSearchBarButtons()}
        </View>
      </View>
      {renderContents()}
      <WallpaperView
        wallpaper={wallpaper}
        onCloseClick={() => setWallpaper(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  searchContainer: {
    paddingHorizontal: wp(2),
    marginVertical: hp(2),
    marginBottom: 0,
    borderRadius: hp(1),
    height: hp(7),
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: wp(2),
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
    fontSize: wp(4),
    marginLeft: wp(3),
  },
  searchTextView: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp(2),
  },
  placeholderText: {
    position: 'absolute',
    left: wp(10),
    fontSize: wp(4),
  },
  colorsView: {
    marginTop: hp(4),
  },
  colorsText: {
    fontSize: wp(4),
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
