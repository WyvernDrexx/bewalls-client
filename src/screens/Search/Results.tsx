import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Cards } from '../../components/Cards';
import { Wallpaper } from '../../generated/graphql';
import { hp, wp } from '../../utilities';

type ResultsProps = {
  items: Wallpaper[];
  searchTerm: string;
  numberOfResults: number;
  onClick?: (select: Wallpaper) => void;
  hide?: boolean;
};

const Results: React.FC<ResultsProps> = function (props) {
  const handleClick = (select: Wallpaper) => {
    Keyboard.dismiss();
    if (props.onClick) props.onClick(select);
  };

  return (
    <View style={[styles.root]}>
      <Cards
        group="category"
        disableLastMargin
        height="34"
        width="47"
        items={props.items}
        onClick={handleClick}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: wp(2),
  },
  subText: {
    color: 'gray',
    paddingHorizontal: wp(2),
    marginBottom: wp(4),
  },
  resultsView: {},
  searchTermText: {
    fontSize: wp(6),
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginVertical: hp(1.5),
  },
});

export default Results;
