import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { PRIMARY_COLORS } from '../../constants';
import { STYLES } from '../../styles';

import Search from './search.svg';

const SearchBar: React.FC = function () {
  return (
    <View style={styles.root}>
      <View style={styles.searchContainer}>
        <View style={[STYLES.flexRowCenter]}>
          <TextInput placeholder="Search Devices" style={styles.searchInput} />
          <TouchableOpacity>
            <Search
              fill="#8C8BF0"
              height={heightPercentageToDP('3')}
              width={heightPercentageToDP('3')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  searchContainer: {
    backgroundColor: PRIMARY_COLORS.bgColor,
    borderRadius: widthPercentageToDP('3'),
    marginTop: heightPercentageToDP('3'),
    paddingHorizontal: widthPercentageToDP('4'),
    paddingVertical: heightPercentageToDP('1'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  searchInput: {
    fontSize: heightPercentageToDP('2.5'),
  },
});

export default SearchBar;
