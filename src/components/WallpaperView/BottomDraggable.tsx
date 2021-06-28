import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Wallpaper } from '../../generated/graphql';
import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';
import CheckSvg from './check.svg';
import DownloadSvg from './download.svg';
import EditSvg from './edit.svg';
import HeartSvg from './heart.svg';
import ShareSvg from './share.svg';

type BottomDraggableProps = {
  wallpaper: Wallpaper;
  onFavourite?: (wallpaperId: string) => void;
};

const BottomDraggable = function (props: BottomDraggableProps) {
  const startPosition = hp(80);
  const maxOffset = hp(40);
  const offsetY = useSharedValue(startPosition);
  const driftOffset = hp(75);
  const actionIconSize = hp(3);
  const { themedStyles, theme } = useTheme();

  const eventHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startY: number }) => {
      ctx.startY = offsetY.value;
    },
    onActive: (event, ctx) => {
      offsetY.value = ctx.startY + event.translationY;
    },
    onEnd: event => {
      if (event.absoluteY < driftOffset) {
        offsetY.value = Animated.withTiming(maxOffset);
      } else {
        offsetY.value = Animated.withTiming(startPosition);
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

  const handleHeartClick = () => {
    if (props.onFavourite) props.onFavourite(props.wallpaper.id);
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
      backgroundColor: theme.colors.light,
    },
    {
      icon: (
        <ShareSvg
          fill={'white'}
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
      backgroundColor: theme.colors.light,
    },
  ];

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={[uas, styles.root, themedStyles.bg]}>
        <View style={styles.flexView}>
          <View style={[styles.topBar, themedStyles.bgSecondary]} />
        </View>
        <View>
          <View style={styles.headerView}>
            <View>
              <Text style={[styles.mainText, themedStyles.text]}>
                {props.wallpaper.name}
              </Text>
              <Text style={[styles.subText, themedStyles.text]}>
                {props.wallpaper.category?.name}
              </Text>
            </View>
            <TouchableOpacity onPress={handleHeartClick}>
              <HeartSvg
                fill={
                  props.wallpaper.isUsersFavourite
                    ? '#fc2679'
                    : theme.colors.dark
                }
                height={hp(5)}
                width={hp(5)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.tagView}>
            {props.wallpaper.tags.map(item => {
              return (
                <TouchableOpacity key={item?.id}>
                  <Text
                    style={[
                      styles.tagText,
                      themedStyles.bgSecondary,
                      themedStyles.textLight,
                    ]}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
          <Text
            style={[
              styles.detailsText,
              themedStyles.bgLight,
              themedStyles.text,
            ]}>
            {props.wallpaper.downloads} Downloads
          </Text>
          <Text
            style={[
              styles.detailsText,
              themedStyles.bgLight,
              themedStyles.text,
            ]}>
            {100} Views
          </Text>
          <Text
            style={[
              styles.detailsText,
              themedStyles.bgLight,
              themedStyles.text,
            ]}>
            {100} Shares
          </Text>
          <Text
            style={[
              styles.detailsText,
              themedStyles.bgLight,
              themedStyles.text,
            ]}>
            {props.wallpaper.height} x {props.wallpaper.width}
          </Text>
          <Text
            style={[
              styles.detailsText,
              themedStyles.bgLight,
              themedStyles.text,
            ]}>
            {props.wallpaper.sizeInKB} KB
          </Text>
          <Text
            style={[
              styles.detailsText,
              themedStyles.bgLight,
              themedStyles.text,
            ]}>
            {props.wallpaper.createdAt}
          </Text>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  root: {
    width: wp(100),
    height: hp(60),
    paddingHorizontal: wp(2),
    borderTopLeftRadius: hp(4),
    borderTopRightRadius: hp(4),
    paddingTop: hp(4),
  },
  topBar: {
    padding: hp(0.5),
    width: wp(40),
    borderRadius: wp(2),
    marginTop: hp(-5),
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
    fontSize: hp(3),
    fontWeight: 'bold',
  },
  subText: {
    fontSize: hp(2.5),
    marginTop: hp(1),
    color: 'gray',
  },
  tagText: {
    padding: hp(1),
    borderRadius: hp(1),
    marginRight: wp(2),
  },
  tagView: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: hp(1),
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp(4),
  },
  actionView: {
    width: wp(22),
    height: hp(10),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: wp(2),
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
    marginTop: hp(5),
    flexWrap: 'wrap',
  },
  detailsText: {
    padding: hp(1),
    width: wp(45),
    borderRadius: wp(2),
    marginRight: hp(0.5),
    marginTop: hp(1),
  },
});

export { BottomDraggable };
