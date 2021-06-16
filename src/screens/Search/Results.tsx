import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Cards } from '../../components/Cards';

import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';

import { Wallpaper } from '../../generated/graphql';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type ResultsProps = {
  items: Wallpaper[];
  searchTerm: string;
  numberOfResults: number;
  onClick?: (select: Wallpaper) => void;
  hide?: boolean;
};

const Results: React.FC<ResultsProps> = function (props) {
  const { themedStyles } = useTheme();
  const hide = useSharedValue(props.hide ? 0 : 1);

  const uas = useAnimatedStyle(() => {
    return {
      opacity: Animated.withTiming(hide.value),
    };
  });

  return (
    <Animated.View style={[styles.root, uas]}>
      <Text style={[styles.searchTermText, themedStyles.text]}>
        "{props.searchTerm}"
      </Text>
      <Text style={[styles.subText, themedStyles.text]}>
        {props.numberOfResults} Wallpaper
        {props.numberOfResults > 1 ? 's are ' : ' is '}
        available.
      </Text>
      <View style={styles.resultsView}>
        <Cards
          group="category"
          disableLastMargin
          height="34"
          width="44"
          items={props.items}
          onClick={props.onClick}
          style={styles.marginBottom}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: hp(4),
    paddingHorizontal: wp(4),
  },
  searchTermText: {
    fontSize: hp(4),
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  subText: {
    color: 'gray',
  },
  resultsView: {
    marginTop: hp(3),
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: wp(-4),
  },
  marginBottom: {
    marginBottom: hp(2),
  },
});

export default Results;
