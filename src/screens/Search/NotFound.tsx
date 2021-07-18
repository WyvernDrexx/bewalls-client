import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Cards } from '../../components/Cards';
import HeadingTitle from '../../components/HeadingTitle';
import {
  useRecentQuery,
  useTrendingQuery,
  Wallpaper,
} from '../../generated/graphql';
import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';

type NotFoundProps = {
  onRecentUploadsClick?: () => void;
  onClick?: (select: Wallpaper) => void;
};

const NotFound: React.FC<NotFoundProps> = function (props) {
  const { themedStyles } = useTheme();
  const { data: recommended } = useTrendingQuery();
  const { data: recent } = useRecentQuery();

  const handleMoreClick = () => {
    if (props.onRecentUploadsClick) props.onRecentUploadsClick();
  };

  const handleClick = (select: Wallpaper) => {
    if (props.onClick) props.onClick(select);
  };
  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={[styles.notFoundText, themedStyles.text]}>
          Couldn't find any results. Check out our recommendations below.
        </Text>
        <HeadingTitle hideButton title="Recommended" />
        <Cards
          horizantal
          onClick={handleClick}
          group="category"
          items={recommended?.trending as Wallpaper[]}
          height="35"
          width="42"
        />
        <View style={styles.recentUploads}>
          <HeadingTitle onClick={handleMoreClick} title="Recent Uploads" />
          <Cards
            horizantal
            onClick={handleClick}
            group="none"
            items={recent?.recent as Wallpaper[]}
            height="35"
            width="42"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: hp(6),
  },
  notFoundText: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: wp(4),
    marginBottom: hp(3),
    paddingHorizontal: wp(2),
  },
  recentUploads: {
    marginBottom: hp(2),
  },
});

export default NotFound;
