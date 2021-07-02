import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Cards } from '../../components/Cards';
import { LoadingView } from '../../components/Loader/LoadingView';
import MountAnimatedView from '../../components/MountAnimatedView';
import StackHeader from '../../components/StackHeader';
import WallpaperView from '../../components/WallpaperView';
import { useGetUserFavouritesQuery, Wallpaper } from '../../generated/graphql';
import { useTheme } from '../../hooks';
import { FavouritesScreenProps } from '../../navigation/types';
import { hp, wp } from '../../utilities';

const Favourites: React.FC<FavouritesScreenProps> = props => {
  const { themedStyles } = useTheme();
  const [wallpaper, setWallpaper] = useState<Wallpaper | undefined>();
  const [previewWallpaper, setPreviewWallpaper] = useState(false);
  const { data, loading, refetch } = useGetUserFavouritesQuery();

  const handleCardClick = (select: Wallpaper) => {
    setWallpaper(select);
    setPreviewWallpaper(true);
  };

  const handleCloseClick = () => {
    setPreviewWallpaper(false);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const handleAfterFavouriteMutation = (_: Wallpaper) => {
    refetch();
  };

  const renderFavouritesCards = () => {
    if (!data?.getUserInfo?.favourites.length) {
      return (
        <MountAnimatedView>
          <View style={styles.placeholderView}>
            <Text style={[styles.placeholderText, themedStyles.textDark]}>
              Wow, it's empty! Go and find your favourite wallpaper now!
            </Text>
          </View>
        </MountAnimatedView>
      );
    }

    return (
      <View style={styles.favourites}>
        <Cards
          onClick={handleCardClick}
          group="bundle"
          height="15"
          width="47"
          items={data?.getUserInfo?.favourites as Wallpaper[]}
          disableLastMargin
          style={styles.cards}
        />
      </View>
    );
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <StackHeader
        onLeftClick={goBack}
        titlePosition="left"
        title="Favourites"
      />
      {loading ? (
        <LoadingView />
      ) : (
        <View style={styles.container}>
          <ScrollView>{renderFavouritesCards()}</ScrollView>
        </View>
      )}
      <WallpaperView
        afterFavouriteMutation={handleAfterFavouriteMutation}
        onCloseClick={handleCloseClick}
        showWallpaper={previewWallpaper}
        wallpaper={wallpaper}
      />
    </View>
  );
};

export { Favourites };

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {},
  favourites: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  cards: {
    marginBottom: wp(2),
  },
  placeholderView: {
    height: hp(90),
    width: wp(98),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: wp(6),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
