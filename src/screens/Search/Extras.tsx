import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Color,
  HotSearchTerm,
  useExtrasDataQuery,
} from '../../generated/graphql';
import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';
import HotSearches from './HotSearches';

type ExtrasProps = {
  onColorBoxClick: (color: Color) => void;
  onSearchTermClick: (searchTerm: HotSearchTerm) => void;
};

const Extras: React.FC<ExtrasProps> = function (props) {
  const {
    themedStyles,
    theme: { colors },
  } = useTheme();

  const handleColorBoxClick = (color: Color) => {
    props.onColorBoxClick(color);
  };

  const handleSearchTermClick = (searchTerm: HotSearchTerm) => {
    props.onSearchTermClick(searchTerm);
  };

  const { data, loading } = useExtrasDataQuery();

  if (loading || typeof data === 'undefined') return null;

  return (
    <View style={styles.root}>
      <View style={styles.instaBannerView}>
        <Image style={styles.instaImage} source={require('./insta.webp')} />
        <Text style={[styles.instaText]}>Follow Us On Instagram</Text>
      </View>
      <View style={styles.colorsView}>
        <Text style={themedStyles.text}>Colours</Text>
        <View style={styles.colorsContainer}>
          {data?.colors.map((item, index) => {
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
        searchTerms={data?.hotSearches as HotSearchTerm[]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: wp(2),
    flex: 1,
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
    fontSize: wp(5.5),
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
    width: wp(96),
  },
  colorBox: {
    padding: hp(1.5),
    borderRadius: wp(100),
    borderWidth: 1,
    backgroundColor: 'black',
  },
});

export default Extras;
