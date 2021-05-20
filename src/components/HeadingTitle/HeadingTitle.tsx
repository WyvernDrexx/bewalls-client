import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import getColorScheme from '../../utilities/getColorScheme';

const HeadingTitle = function () {
  return (
    <View style={styles.root}>
      <Text style={styles.headingText}>Trending Now</Text>
      <TouchableOpacity>
        <Text style={styles.moreText}>MORE</Text>
      </TouchableOpacity>
    </View>
  );
};

const COLORS = getColorScheme();

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingVertical: heightPercentageToDP(2),
  },
  headingText: {
    color: COLORS.secondary,
    fontSize: heightPercentageToDP(3),
    fontWeight: 'bold',
  },
  moreText: {
    color: '#5079FF',
    fontSize: heightPercentageToDP(2.5),
  },
});

export default HeadingTitle;
