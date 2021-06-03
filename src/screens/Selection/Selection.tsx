import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import Animated from 'react-native-reanimated';

import WallpaperView from '../../components/WallpaperView';
import Carousel from '../../components/Carousel/Carousel';
import StackHeader from '../../components/StackHeader';

import { BRANDS } from '../../sample/sampleData';
import { WallpaperType } from '../../types';
import { Cards } from '../../components/Cards';

import CarouselSvg from './carousel.svg';
import GridSvg from './grid.svg';

import { useTheme } from '../../hooks';
import { SelectionScreenProps } from '../../navigation/types';

const Selection: React.FC<SelectionScreenProps> = function (props) {
  const [displayMode, setDisplayMode] =
    useState<'carousel' | 'grid'>('carousel');
  const [previewWallpaper, setPreviewWallpaper] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState<WallpaperType>();

  const [themeStyles] = useTheme();

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

  return (
    <View style={[styles.root, themeStyles.bg]}>
      <StackHeader
        onLeftArrowClick={props.navigation.goBack}
        title={props.route.params.select}
      />
      <Animated.ScrollView>
        <View style={styles.displaySelection}>
          <View>
            <Text style={themeStyles.text}>Sort by Date</Text>
          </View>
          <View style={styles.displayLayout}>
            <TouchableOpacity
              onPress={() => setDisplayMode('carousel')}
              style={styles.modeIcon}>
              <CarouselSvg
                fill={displayMode === 'carousel' ? '#9F88FF' : '#C9C9C9'}
                height={heightPercentageToDP(3)}
                width={heightPercentageToDP(4)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDisplayMode('grid')}
              style={styles.modeIcon}>
              <GridSvg
                fill={displayMode === 'grid' ? '#9F88FF' : '#C9C9C9'}
                height={heightPercentageToDP(3)}
                width={heightPercentageToDP(4)}
              />
            </TouchableOpacity>
          </View>
        </View>
        {displayMode === 'carousel' ? (
          <Carousel onClick={handleCardClick} items={BRANDS} disableText />
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
    paddingHorizontal: widthPercentageToDP(4),
  },
  displayLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modeIcon: {
    paddingLeft: widthPercentageToDP(2),
  },
  gridView: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: heightPercentageToDP(4),
  },
  cards: {
    marginBottom: heightPercentageToDP(2),
  },
});

export { Selection };
