import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useTheme } from '../../hooks';
import HotSearches, { SearchTerm } from './HotSearches';

const COLORS_BOX = [
  {
    color: '#00D3FF',
  },
  {
    color: '#FF002B',
  },
  {
    color: '#5B5BFF',
  },
  {
    color: '#E6D111',
  },
  {
    color: '#000000',
  },
  {
    color: '#26C741',
  },
];

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
  onColorBoxClick: (color: string) => void;
  onSearchTermClick: (searchTerm: SearchTerm) => void;
};

const Extras: React.FC<ExtrasProps> = function (props) {
  const [themeStyles] = useTheme();

  const onColorBoxClickHandler = (color: string) => {
    props.onColorBoxClick(color);
  };

  const onSearchTermClick = (searchTerm: SearchTerm) => {
    props.onSearchTermClick(searchTerm);
  };

  return (
    <>
      <View style={styles.instaBannerView}>
        <Image style={styles.instaImage} source={require('./insta.webp')} />
        <Text style={[styles.instaText]}>Follow Us On Instagram</Text>
      </View>
      <View style={styles.colorsView}>
        <Text style={[styles.colorsText, themeStyles.text]}>Colours</Text>
        <View style={styles.colorsContainer}>
          {COLORS_BOX.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                onPress={() => onColorBoxClickHandler(item.color)}>
                <View
                  style={[
                    styles.colorBox,
                    {
                      backgroundColor: item.color,
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View>
        <HotSearches
          onSearchTermClick={onSearchTermClick}
          searchTerms={SEARCHES_TERM}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  instaBannerView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentageToDP(3),
  },
  instaImage: {
    width: widthPercentageToDP(96),
    height: heightPercentageToDP(15),
    borderRadius: widthPercentageToDP(4),
  },
  instaText: {
    position: 'absolute',
    color: 'white',
    fontSize: heightPercentageToDP(3.5),
    fontWeight: 'bold',
    width: widthPercentageToDP(96),
    textAlign: 'center',
    padding: heightPercentageToDP(2),
  },
  colorsView: {
    marginTop: heightPercentageToDP(4),
  },
  colorsText: {
    fontSize: heightPercentageToDP(2),
  },
  colorsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: heightPercentageToDP(3),
  },
  colorBox: {
    padding: heightPercentageToDP(1.5),
    borderRadius: widthPercentageToDP(100),
  },
});

export default Extras;