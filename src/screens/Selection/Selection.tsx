import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Cards } from '../../components/Cards';

import CarouselSvg from './carousel.svg';
import GridSvg from './grid.svg';
import DownArrowSvg from './down-arrow.svg';

import WallpaperView from '../../components/WallpaperView';
import Carousel from '../../components/Carousel/Carousel';
import StackHeader from '../../components/StackHeader';

import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';

import { SelectionScreenProps } from '../../navigation/types';
import { WallpaperType } from '../../types';

import { BRANDS } from '../../sample/sampleData';
import Options from '../../components/Options';
import { OptionType } from '../../components/Options/Option';

const Selection: React.FC<SelectionScreenProps> = function (props) {
  const [displayMode, setDisplayMode] =
    useState<'carousel' | 'grid'>('carousel');
  const [previewWallpaper, setPreviewWallpaper] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState<WallpaperType>();
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedSortOption, setSelectedSortOption] =
    useState<string | number>(0);

  const {
    themedStyles,
    theme: { colors },
  } = useTheme();

  const sortOptions: OptionType[] = [
    {
      title: 'Newest First',
      id: 1001,
    },
    {
      title: 'Top Rated First',
      id: 1002,
    },
    {
      title: 'Top Rated First',
      id: 1003,
    },
    {
      title: 'Top Rated First',
      id: 1004,
    },
  ];

  const handleCardClick = (wallpaper: WallpaperType) => {
    setSelectedWallpaper(wallpaper);
    setPreviewWallpaper(true);
  };

  const handlePreviewClose = () => {
    setPreviewWallpaper(false);
  };

  const renderCards = (items: WallpaperType[]) => {
    return (
      <View style={styles.gridView}>
        <Cards
          onClick={handleCardClick}
          items={items}
          disableText
          height="34"
          width="44"
          disableLastMargin
          style={styles.cards}
        />
      </View>
    );
  };

  const handleOptionsShow = () => {
    setShowSortOptions(true);
  };

  const handleOptionsClose = () => {
    setShowSortOptions(false);
  };

  const handleOptionChange = (id: string | number) => {
    setSelectedSortOption(id);
    handleOptionsClose();
  };

  const sortOption = sortOptions.find(item => item.id === selectedSortOption);

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <StackHeader
        onLeftClick={props.navigation.goBack}
        title={props.route.params.select}
      />
      <Options
        options={sortOptions}
        showOptions={showSortOptions}
        onUnderlayClick={handleOptionsClose}
        onChange={handleOptionChange}
      />
      <Animated.ScrollView>
        <View style={styles.displaySelection}>
          <TouchableOpacity
            style={styles.sortOptions}
            onPress={handleOptionsShow}>
            <Text style={[styles.sortingText, themedStyles.text]}>
              {sortOption?.title}
            </Text>
            <DownArrowSvg
              style={styles.downArrowIcon}
              fill={colors.secondary}
            />
          </TouchableOpacity>
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
        {displayMode === 'carousel' ? (
          <Carousel onClick={handleCardClick} items={BRANDS} hideText />
        ) : (
          renderCards(BRANDS)
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(4),
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
