import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Cards } from '../../components/Cards';

import CarouselSvg from './carousel.svg';
import GridSvg from './grid.svg';

import WallpaperView from '../../components/WallpaperView';
import Carousel from '../../components/Carousel/Carousel';
import StackHeader from '../../components/StackHeader';

import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';

import { SelectionScreenProps } from '../../navigation/types';

import { Wallpaper, useWallpapersQuery } from '../../generated/graphql';

type Display = 'carousel' | 'grid';

const Selection: React.FC<SelectionScreenProps> = function (props) {
  const { group: type, groupId: selectorId } = props.route.params;
  const [displayMode, setDisplayMode] = useState<Display>('carousel');
  const [previewWallpaper, setPreviewWallpaper] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper>();

  const variables = {
    bundleId: type === 'bundle' ? selectorId : '',
    categoryId: type === 'category' ? selectorId : '',
  };

  const { loading, data, error } = useWallpapersQuery({
    variables,
  });

  console.log(error);
  const { themedStyles } = useTheme();

  const handleCardClick = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
    setPreviewWallpaper(true);
  };

  const handlePreviewClose = () => {
    setPreviewWallpaper(false);
  };

  if (loading) {
    return null;
  }

  const Grid = () => {
    return (
      <View style={styles.gridView}>
        <Cards
          group="category"
          onClick={handleCardClick}
          items={data?.wallpapers as Wallpaper[]}
          disableText
          height="34"
          width="44"
          disableLastMargin
          style={styles.cards}
        />
      </View>
    );
  };

  const DisplayMode: React.FC = () => {
    return (
      <View style={styles.displaySelection}>
        <TouchableOpacity style={styles.sortOptions} />
        <View style={styles.displayLayout}>
          <TouchableOpacity
            onPress={() => setDisplayMode('carousel')}
            style={styles.modeIcon}>
            <CarouselSvg
              fill={displayMode === 'carousel' ? '#9F88FF' : '#C9C9C9'}
              height={hp(3)}
              width={hp(4)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDisplayMode('grid')}
            style={styles.modeIcon}>
            <GridSvg
              fill={displayMode === 'grid' ? '#9F88FF' : '#C9C9C9'}
              height={hp(3)}
              width={hp(4)}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <StackHeader
        titlePosition="left"
        onLeftClick={props.navigation.goBack}
        title={props.route.params.title}
        right={DisplayMode}
      />
      <Animated.ScrollView>
        {displayMode === 'carousel' ? (
          <Carousel
            onClick={handleCardClick}
            items={data?.wallpapers as Wallpaper[]}
            hideText
          />
        ) : (
          <Grid />
        )}
      </Animated.ScrollView>
      <WallpaperView
        showWallpaper={previewWallpaper}
        wallpaper={selectedWallpaper}
        onCloseClick={handlePreviewClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'red',
  },
  displaySelection: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  displayLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modeIcon: {
    paddingLeft: wp(2),
  },
  gridView: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: hp(4),
  },
  cards: {
    marginBottom: hp(2),
  },
  sortOptions: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  downArrowIcon: {
    marginLeft: wp(2),
    height: hp(3),
    width: wp(5),
  },
  sortingText: {
    fontSize: hp(2),
  },
});

export { Selection };
