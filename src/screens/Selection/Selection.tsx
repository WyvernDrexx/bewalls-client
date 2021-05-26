import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Carousel from '../../components/Carousel/Carousel';
import { useTheme } from '../../hooks';
import { SelectionScreenProps } from '../../navigation/types';

import GridSvg from './grid.svg';
import CarouselSvg from './carousel.svg';
import { Cards } from '../../components/Card';
import Animated from 'react-native-reanimated';
import WallpaperView from '../../components/WallpaperView';
import { BRANDS } from '../../sample/sampleData';
import { WallpaperType } from '../../types';

const Selection: React.FC<SelectionScreenProps> = function (props) {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [showWallpaper, setShowWallpaper] = useState(false);
  const [activeWallpaper, setActiveWallpaper] = useState<WallpaperType>();

  const [themeStyles] = useTheme();
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerTitle: props.route.params.select,
      headerTitleAlign: 'center',
    });
  }, [props.route.params.select]);

  const onCardClick = (wallpaper: WallpaperType) => {
    setActiveWallpaper(wallpaper);
    setShowWallpaper(true);
  };

  const onClose = () => {
    setShowWallpaper(false);
  };

  const renderCards = () => {
    return (
      <View style={styles.gridView}>
        <Cards
          onClick={onCardClick}
          items={BRANDS}
          disableText
          height="34"
          width="44"
          disableLastMargin
          style={{ marginBottom: heightPercentageToDP(2) }}
        />
      </View>
    );
  };

  return (
    <View style={[styles.root, themeStyles.bg]}>
      <Animated.ScrollView style={[]}>
        <View style={styles.displaySelection}>
          <View>
            <Text style={themeStyles.text}>Sort by Date</Text>
          </View>
          <View style={styles.displayLayout}>
            <TouchableOpacity
              onPress={() => setViewMode('carousel')}
              style={styles.modeIcon}>
              <CarouselSvg
                fill={viewMode === 'carousel' ? '#9F88FF' : '#C9C9C9'}
                height={heightPercentageToDP(3)}
                width={heightPercentageToDP(4)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setViewMode('grid')}
              style={styles.modeIcon}>
              <GridSvg
                fill={viewMode === 'grid' ? '#9F88FF' : '#C9C9C9'}
                height={heightPercentageToDP(3)}
                width={heightPercentageToDP(4)}
              />
            </TouchableOpacity>
          </View>
        </View>
        {viewMode === 'carousel' ? (
          <Carousel onClick={onCardClick} items={BRANDS} disableText />
        ) : (
          renderCards()
        )}
      </Animated.ScrollView>
      <WallpaperView
        showWallpaper={showWallpaper}
        wallpaper={activeWallpaper}
        onCloseClick={onClose}
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
});

export { Selection };
