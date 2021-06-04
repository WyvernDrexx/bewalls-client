import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { hp } from 'react-native-responsive-screen';

import { Cards } from '../../components/Cards';

import HeadingTitle from '../../components/HeadingTitle';

import { useTheme } from '../../hooks';
import { BRANDS } from '../../sample/sampleData';

const NotFound: React.FC = function () {
  const [themeStyles] = useTheme();
  return (
    <View style={styles.root}>
      <Text style={[styles.notFoundText, themeStyles.text]}>
        Couldn't find any results. Check out our recommendations below.
      </Text>
      <View>
        <HeadingTitle title="Recommended" />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          overScrollMode="never"
          horizontal>
          <Cards items={BRANDS} height="35" width="42" />
        </ScrollView>
      </View>
      <View style={styles.recentUploads}>
        <HeadingTitle title="Recent Uploads" />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          overScrollMode="never"
          horizontal>
          <Cards items={BRANDS} height="35" width="42" />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: hp(6),
  },
  notFoundText: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: hp(2.3),
    marginBottom: hp(3),
  },
  recentUploads: {
    marginBottom: hp(2),
  },
});

export default NotFound;
