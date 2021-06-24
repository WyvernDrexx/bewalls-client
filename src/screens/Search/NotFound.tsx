import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Cards } from '../../components/Cards';

import HeadingTitle from '../../components/HeadingTitle';

import { useTheme } from '../../hooks';
import { hp } from '../../utilities';

import { useRecommendedQuery, Wallpaper } from '../../generated/graphql';

type NotFoundProps = {
  onRecentUploadsClick?: () => void;
};

const NotFound: React.FC<NotFoundProps> = function (props) {
  const { themedStyles } = useTheme();
  const { data: recommendedData } = useRecommendedQuery();

  const handleMoreClick = () => {
    if (props.onRecentUploadsClick) props.onRecentUploadsClick();
  };

  return (
    <View style={styles.root}>
      <Text style={[styles.notFoundText, themedStyles.text]}>
        Couldn't find any results. Check out our recommendations below.
      </Text>
      <View>
        <HeadingTitle onClick={handleMoreClick} title="Recent Uploads" />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          overScrollMode="never"
          horizontal>
          <Cards
            group="category"
            items={recommendedData?.recommended as Wallpaper[]}
            height="35"
            width="42"
          />
        </ScrollView>
      </View>
      {/* <View style={styles.recentUploads}>
        <HeadingTitle title="Recent Uploads" />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          overScrollMode="never"
          horizontal>
          <Cards items={BRANDS} height="35" width="42" />
        </ScrollView>
      </View> */}
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
