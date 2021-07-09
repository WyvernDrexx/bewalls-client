import React from 'react';
import { Keyboard } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Cards } from '../../components/Cards';
import { Wallpaper } from '../../generated/graphql';
import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';

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

  const handleClick = (select: Wallpaper) => {
    Keyboard.dismiss();
    if (props.onClick) props.onClick(select);
  };

  const uas = useAnimatedStyle(() => {
    return {
      opacity: Animated.withTiming(hide.value),
    };
  });

  return (
    <Animated.View style={[styles.root, uas]}>
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
          width="47"
          items={props.items}
          onClick={handleClick}
          style={styles.marginBottom}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: wp(2),
  },

  subText: {
    color: 'gray',
    marginBottom: wp(4),
  },
  resultsView: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: wp(-2),
  },
  marginBottom: {
    marginBottom: hp(2),
  },
});

export default Results;
