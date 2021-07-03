import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Cards } from '../../components/Cards';
import Carousel from '../../components/Carousel/Carousel';
import { LoadingView } from '../../components/Loader/LoadingView';
import StackHeader from '../../components/StackHeader';
import WallpaperView from '../../components/WallpaperView';
import { useWallpapersQuery, Wallpaper } from '../../generated/graphql';
import { useTheme } from '../../hooks';
import { SelectionScreenProps } from '../../navigation/types';
import { hp, wp } from '../../utilities';
import CarouselSvg from './carousel.svg';
import GridSvg from './grid.svg';

type Display = 'carousel' | 'grid';

const Selection: React.FC<SelectionScreenProps> = function (props) {
  const { group: type, groupId: selectorId } = props.route.params;
  const [displayMode, setDisplayMode] = useState<Display>('carousel');
  const [previewWallpaper, setPreviewWallpaper] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper>();

  const variables = {
    bundleId: type === 'bundle' ? selectorId : '',
    categoryId: type === 'category' ? selectorId : '',
    colorId: type === 'color' ? selectorId : '',
    tagsId: type === 'tag' ? selectorId : '',
  };

  const { loading, data } = useWallpapersQuery({
    variables: type === 'none' ? {} : variables,
  });

  const { themedStyles } = useTheme();

  const handleCardClick = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
    setPreviewWallpaper(true);
  };

  const handlePreviewClose = () => {
    setPreviewWallpaper(false);
  };

  const renderDisplay = () => {
    if (loading) {
      return <LoadingView height={88} />;
    }
    if (displayMode === 'carousel') {
      return (
        <View style={styles.carousel}>
          <Carousel
            onClick={handleCardClick}
            items={data?.wallpapers as Wallpaper[]}
          />
        </View>
      );
    }
    return <Grid />;
  };

  const Grid = () => {
    return (
      <View style={styles.gridView}>
        <Cards
          group="category"
          onClick={handleCardClick}
          items={data?.wallpapers as Wallpaper[]}
          height="39"
          width="47"
          disableLastMargin
          style={styles.cards}
        />
      </View>
    );
  };

  const SelectMode: React.FC = () => {
    return (
      <View style={styles.displaySelection}>
        <TouchableOpacity style={styles.sortOptions} />
        <View style={styles.displayLayout}>
          <TouchableOpacity
            onPress={() => setDisplayMode('carousel')}
            style={styles.modeIcon}>
            <CarouselSvg
              fill={displayMode === 'carousel' ? '#9F88FF' : '#C9C9C9'}
              height={wp(6)}
              width={wp(6)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDisplayMode('grid')}
            style={styles.modeIcon}>
            <GridSvg
              fill={displayMode === 'grid' ? '#9F88FF' : '#C9C9C9'}
              height={wp(6)}
              width={wp(6)}
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
        right={<SelectMode />}
      />
      <Animated.ScrollView>{renderDisplay()}</Animated.ScrollView>
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
    paddingLeft: wp(4),
  },
  gridView: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  cards: {
    marginBottom: wp(2),
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
    fontSize: wp(4),
  },
  carousel: {
    marginTop: hp(2.8),
  },
});

export { Selection };
