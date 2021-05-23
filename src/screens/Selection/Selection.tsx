import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Carousel from '../../components/Carousel/Carousel';
import { useThemeStyles } from '../../hooks';
import { SelectionScreenProps } from '../../navigation/types';

import GridSvg from './grid.svg';
import CarouselSvg from './carousel.svg';
import { CardData, Cards } from '../../components/Card';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import WallpaperView from '../../components/WallpaperView';

const BRANDS: CardData[] = [
  {
    title: '',
    image: require('./apple.jpg'),
    id: 1,
  },

  {
    title: '',
    image: require('./oneplus.png'),
    id: 2,
  },
  {
    title: '',
    image: require('./realme.jpg'),
    id: 3,
  },
  {
    title: '',
    image: require('./apple.jpg'),
    id: 4,
  },

  {
    title: '',
    image: require('./oneplus.png'),
    id: 5,
  },
  {
    title: '',
    image: require('./realme.jpg'),
    id: 6,
  },
  {
    title: '',
    image: require('./apple.jpg'),
    id: 7,
  },

  {
    title: '',
    image: require('./oneplus.png'),
    id: 8,
  },
  {
    title: '',
    image: require('./realme.jpg'),
    id: 9,
  },
];

const Selection: React.FC<SelectionScreenProps> = function (props) {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [displayWallpaper, setDisplayWallpaper] = useState(false);
  const [activeWallpaper, setActiveWallpaper] = useState<number>(0);

  const screenHeight = heightPercentageToDP(100);
  const offsetY = useSharedValue(screenHeight);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(offsetY.value, [0, screenHeight], [1, 0]);

    return {
      transform: [
        {
          translateY: Animated.withTiming(offsetY.value),
        },
      ],
      opacity: Animated.withTiming(opacity, { duration: 500 }),
    };
  });

  const themeStyles = useThemeStyles();
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerTitle: props.route.params.select,
      headerTitleAlign: 'center',
    });
  }, [props.route.params.select]);

  const onCardClick = (_: unknown, index: number) => {
    offsetY.value = 0;
    setActiveWallpaper(index);
    setDisplayWallpaper(true);
  };

  const onClose = () => {
    offsetY.value = screenHeight;
    setTimeout(() => {
      setDisplayWallpaper(false);
    }, 500);
  };

  const renderCards = () => {
    return (
      <View style={styles.gridView}>
        <Cards
          onClick={onCardClick}
          items={BRANDS}
          height="34"
          width="44"
          style={{ marginBottom: heightPercentageToDP(2) }}
        />
      </View>
    );
  };

  useEffect(() => {
    if (displayWallpaper) {
      props.navigation.setOptions({ headerShown: false });
    }
  }, [displayWallpaper]);

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
        {viewMode === 'carousel' ? <Carousel disableText /> : renderCards()}
      </Animated.ScrollView>
      {displayWallpaper ? (
        <WallpaperView
          image={BRANDS[activeWallpaper].image}
          onCloseClick={onClose}
          animatedStyle={animatedStyle}
        />
      ) : null}
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
