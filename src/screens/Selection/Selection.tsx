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
  const [showSortingOptions, setShowSortingOptions] = useState(false);
  const [selectedSortingOption, setSelectedSortingOption] =
    useState<string | number>(0);

  const {
    themedStyles,
    theme: { colors },
  } = useTheme();

  const sortingOptions: OptionType[] = [
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

  const handleClose = () => {
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
    setShowSortingOptions(true);
  };

  const handleOptionsClose = () => {
    setShowSortingOptions(false);
  };

  const handleOptionClick = (id: string | number) => {
    setSelectedSortingOption(id);
    handleOptionsClose();
  };

  const selectedOption = sortingOptions.find(
    item => item.id === selectedSortingOption,
  );

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <StackHeader
        onLeftClick={props.navigation.goBack}
        title={props.route.params.select}
      />
      <Options
        initalSelection={sortingOptions[0].id}
        options={sortingOptions}
        showOptions={showSortingOptions}
        onUnderlayClick={handleOptionsClose}
        onClick={handleOptionClick}
      />
      <Animated.ScrollView>
        <View style={styles.displaySelection}>
          <TouchableOpacity
            style={styles.sortOptions}
            onPress={handleOptionsShow}>
            <Text style={styles.sortingText}>{selectedOption?.title}</Text>
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
        onCloseClick={handleClose}
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
