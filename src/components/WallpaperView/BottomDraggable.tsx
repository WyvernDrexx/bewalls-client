import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useTheme, useThemeStyles } from '../../hooks';
import HeartSvg from './heart.svg';
import EditSvg from './edit.svg';
import ShareSvg from './share.svg';
import CheckSvg from './check.svg';
import DownloadSvg from './download.svg';

const BottomDraggable = function () {
  const startPosition = heightPercentageToDP(80);
  const maxOffset = heightPercentageToDP(40);
  const offsetY = useSharedValue(startPosition);
  const translationOffset = heightPercentageToDP(10);
  const themeStyles = useThemeStyles();
  const theme = useTheme();
  const actionIconSize = heightPercentageToDP(3);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startY: number }) => {
      ctx.startY = offsetY.value;
    },
    onActive: (event, ctx) => {
      offsetY.value = ctx.startY + event.translationY;
    },
    onEnd: event => {
      console.log(event.absoluteY);
      if (event.absoluteY > translationOffset) {
        offsetY.value = withTiming(maxOffset);
      } else {
        offsetY.value = withTiming(startPosition);
      }
    },
  });

  const uas = useAnimatedStyle(() => {
    let offset = offsetY.value;
    if (offsetY.value > maxOffset) {
      offset = offsetY.value;
    } else {
      offset = maxOffset;
    }
    if (offsetY.value > startPosition) {
      offset = startPosition;
    }
    return {
      transform: [
        {
          translateY: offset,
        },
      ],
    };
  });

  const onHeartClick = () => {
    console.log('Heart Clicked');
  };

  const ACTION_BUTTONS = [
    {
      icon: (
        <EditSvg
          fill={theme.colors.secondary}
          height={actionIconSize}
          width={actionIconSize}
        />
      ),
      backgroundColor: 'white',
    },
    {
      icon: (
        <ShareSvg
          fill={theme.colors.primary}
          height={actionIconSize}
          width={actionIconSize}
        />
      ),
      backgroundColor: '#17E300',
    },
    {
      icon: (
        <CheckSvg
          fill={'white'}
          height={actionIconSize}
          width={actionIconSize}
        />
      ),
      backgroundColor: '#FC2679',
    },
    {
      icon: (
        <DownloadSvg
          fill={'#4B75FF'}
          height={actionIconSize}
          width={actionIconSize}
        />
      ),
      backgroundColor: 'white',
    },
  ];

  const details = {
    downloads: 155,
    views: '1k',
    shares: 11,
    height: 1080,
    width: 3890,
    size: '598kB',
    createdAt: '18 Hours ago',
  };

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={[uas, styles.root, themeStyles.bg]}>
        <View style={styles.flexView}>
          <View style={[styles.topBar, themeStyles.bgSecondary]} />
        </View>
        <View>
          <View style={styles.headerView}>
            <View>
              <Text style={[styles.mainText, themeStyles.text]}>
                Never Settle
              </Text>
              <Text style={[styles.subText, themeStyles.text]}>
                OnePlus 7 Pro - Wallpaper
              </Text>
            </View>
            <TouchableOpacity onPress={onHeartClick}>
              <HeartSvg
                fill={theme.colors.secondary}
                height={heightPercentageToDP(5)}
                width={heightPercentageToDP(5)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.tagView}>
            <TouchableOpacity>
              <Text
                style={[
                  styles.tagText,
                  themeStyles.bgSecondary,
                  themeStyles.textLight,
                ]}>
                OnePlus
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={[
                  styles.tagText,
                  themeStyles.bgSecondary,
                  themeStyles.textLight,
                ]}>
                Never Settle
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          {ACTION_BUTTONS.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                style={[
                  styles.actionView,
                  { backgroundColor: item.backgroundColor },
                ]}>
                {item.icon}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.details}>
          <Text style={[styles.detailsText, themeStyles.bgLight]}>
            {details.downloads} Downloads
          </Text>
          <Text style={[styles.detailsText, themeStyles.bgLight]}>
            {details.views} Views
          </Text>
          <Text style={[styles.detailsText, themeStyles.bgLight]}>
            {details.shares} Shares
          </Text>
          <Text style={[styles.detailsText, themeStyles.bgLight]}>
            {details.height} x {details.width}{' '}
          </Text>
          <Text style={[styles.detailsText, themeStyles.bgLight]}>
            {details.size}
          </Text>
          <Text style={[styles.detailsText, themeStyles.bgLight]}>
            {details.createdAt}
          </Text>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  root: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(60),
    paddingHorizontal: widthPercentageToDP(2),
    borderTopLeftRadius: heightPercentageToDP(4),
    borderTopRightRadius: heightPercentageToDP(4),
    paddingTop: heightPercentageToDP(4),
  },
  topBar: {
    padding: heightPercentageToDP(0.5),
    width: widthPercentageToDP(40),
    borderRadius: widthPercentageToDP(2),
    marginTop: heightPercentageToDP(-5),
  },
  flexView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerView: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainText: {
    fontSize: heightPercentageToDP(3),
    fontWeight: 'bold',
  },
  subText: {
    fontSize: heightPercentageToDP(2.5),
    marginTop: heightPercentageToDP(1),
    color: 'gray',
  },
  tagText: {
    padding: heightPercentageToDP(1),
    borderRadius: heightPercentageToDP(1),
    marginRight: widthPercentageToDP(2),
  },
  tagView: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: heightPercentageToDP(1),
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: heightPercentageToDP(4),
  },
  actionView: {
    width: widthPercentageToDP(22),
    height: heightPercentageToDP(10),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: widthPercentageToDP(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentageToDP(5),
    flexWrap: 'wrap',
  },
  detailsText: {
    padding: heightPercentageToDP(1),
    width: widthPercentageToDP(45),
    borderRadius: widthPercentageToDP(2),
    marginRight: heightPercentageToDP(0.5),
    marginTop: heightPercentageToDP(1),
  },
});

export { BottomDraggable };
