import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { STYLES } from '../../styles';

import MenuIcon from './menu.svg';
import Diamond from './diamond.svg';
import { PRIMARY_COLORS } from '../../constants';

const Header: React.FC = function () {
  const diamondCount = 0;

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.6}>
          <MenuIcon
            width={widthPercentageToDP('6%')}
            height={heightPercentageToDP('2')}
          />
        </TouchableOpacity>
        <View style={[STYLES.flexRowCenter, styles.appNameContainer]}>
          <Text style={styles.appNamePrefix}>Stock</Text>
          <Text style={styles.appNamePostfix}>Walls</Text>
        </View>
        <View style={[STYLES.flexRowCenter]}>
          <Diamond
            fill="black"
            width={widthPercentageToDP('6%')}
            height={heightPercentageToDP('4')}
          />
          <Text>{diamondCount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  headerContainer: {
    backgroundColor: PRIMARY_COLORS.bgColor,
    // backgroundColor: 'pink',
    paddingVertical: heightPercentageToDP('2%'),
    paddingHorizontal: widthPercentageToDP('4%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: heightPercentageToDP(3),
  },
  appNameContainer: {},
  appNamePrefix: {
    fontWeight: 'bold',
    fontSize: heightPercentageToDP('3.2'),
  },
  appNamePostfix: {
    fontSize: heightPercentageToDP('3.2'),
  },
});

export default Header;
