import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import HotSearches, { SearchTerm } from './HotSearches';

import { hp, wp } from '../../utilities';
import { useTheme } from '../../hooks';
import { Color, useColorsAllQuery } from '../../generated/graphql';

const SEARCHES_TERM: SearchTerm[] = [
  {
    term: 'COOL',
  },
  {
    term: '3D',
  },
  {
    term: 'APPLE',
  },
  {
    term: 'ONEPLUS',
  },
  {
    term: 'OPPO',
  },
  {
    term: 'REALME',
  },
];

type ExtrasProps = {
  onColorBoxClick: (color: Color) => void;
  onSearchTermClick: (searchTerm: SearchTerm) => void;
};

const Extras: React.FC<ExtrasProps> = function (props) {
  const {
    themedStyles,
    theme: { colors },
  } = useTheme();

  const handleColorBoxClick = (color: Color) => {
    props.onColorBoxClick(color);
  };

  const handleSearchTermClick = (searchTerm: SearchTerm) => {
    props.onSearchTermClick(searchTerm);
  };

  const { data: colorsData, loading } = useColorsAllQuery();

  if (loading) return null;

  return (
    <>
      <View style={styles.root}>
        <View style={styles.instaBannerView}>
          <Image style={styles.instaImage} source={require('./insta.webp')} />
          <Text style={[styles.instaText]}>Follow Us On Instagram</Text>
        </View>
        <View style={styles.colorsView}>
          <Text style={themedStyles.text}>Colours</Text>
          <View style={styles.colorsContainer}>
            {colorsData?.colors.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={index}
                  onPress={() => handleColorBoxClick(item!)}>
                  <View
                    style={[
                      styles.colorBox,
                      {
                        backgroundColor: item!.code,
                        borderColor: colors.secondary,
                      },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <HotSearches
          onClick={handleSearchTermClick}
          searchTerms={SEARCHES_TERM}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: wp(4),
  },
  instaBannerView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
  },
  instaImage: {
    width: wp(92),
    height: hp(15),
    borderRadius: wp(4),
  },
  instaText: {
    position: 'absolute',
    color: 'white',
    fontSize: hp(3.5),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  colorsView: {
    marginTop: hp(4),
  },
  colorsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp(3),
  },
  colorBox: {
    padding: hp(1.5),
    borderRadius: wp(100),
    borderWidth: 1,
    backgroundColor: 'black',
  },
});

export default Extras;
