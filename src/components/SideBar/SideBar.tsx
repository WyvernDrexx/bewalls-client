import React, { useEffect } from 'react';

import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useTheme } from '../../hooks';
import { RootStackParamList } from '../../navigation/types';
import BarItem from './BarItem';

import ProfileSvg from './profile.svg';

type SideBarProps = {
  isShown?: boolean;
  animatedStyle?: StyleProp<ViewStyle>;
  onMenuClose?: () => void;
  onItemClick: (route: keyof RootStackParamList) => void;
  activeRoute: keyof RootStackParamList;
};

type BarItemType = {
  route: keyof RootStackParamList;
  title: string;
};

const SIDEBAR_ITEMS: BarItemType[] = [
  {
    route: 'Home',
    title: 'Home',
  },
  {
    route: 'Categories',
    title: 'Categories',
  },
  {
    route: 'Settings',
    title: 'Settings',
  },
];

const SideBar: React.FC<SideBarProps> = function (props) {
  const sideBarWidth = widthPercentageToDP(100);
  const sideBarShown = useSharedValue(props.isShown);
  const [themeStyles, theme] = useTheme();

  useEffect(() => {
    sideBarShown.value = props.isShown;
  }, [props.isShown, sideBarShown]);

  const onMenuCloseHandler = () => {
    if (typeof props.onMenuClose !== 'undefined') {
      props.onMenuClose();
    }
  };

  const sideBarStyle = useAnimatedStyle(() => {
    const offsetX = interpolate(
      Number(sideBarShown.value),
      [0, 1],
      [-sideBarWidth, 0],
    );

    return {
      transform: [
        {
          translateX: Animated.withTiming(offsetX),
        },
      ],
    };
  });

  const transparentViewStyle = useAnimatedStyle(() => {
    const opacity = interpolate(Number(sideBarShown.value), [0, 1], [0, 0.1]);
    return { opacity: Animated.withTiming(opacity, { duration: 200 }) };
  });

  const onBarItemClick = (route: keyof RootStackParamList) => {
    props.onItemClick(route);
  };

  return (
    <Animated.View style={[sideBarStyle, styles.root]}>
      <View style={[styles.sideBarItemsView, themeStyles.bg]}>
        <View
          style={[styles.profile, { borderBottomColor: theme.colors.light }]}>
          <ProfileSvg
            height={heightPercentageToDP(8)}
            width={heightPercentageToDP(8)}
            fill={theme.colors.secondary}
          />
          <Text style={[styles.profileText, themeStyles.text]}>LP Sharma</Text>
        </View>
        <View style={styles.navigationBars}>
          {SIDEBAR_ITEMS.map((item, index) => {
            return (
              <BarItem
                isActive={props.activeRoute === item.route}
                key={index}
                onClick={onBarItemClick}
                route={item.route}
                title={item.title}
              />
            );
          })}
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onMenuCloseHandler}>
        <Animated.View style={[transparentViewStyle, styles.transparentView]} />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  sideBarItemsView: {
    width: widthPercentageToDP(78),
  },
  transparentView: {
    opacity: 0.1,
    width: widthPercentageToDP(22),
    height: heightPercentageToDP(100),
    backgroundColor: 'black',
  },
  profile: {
    marginTop: heightPercentageToDP(8),
    padding: heightPercentageToDP(2),
    paddingBottom: heightPercentageToDP(4),
    borderBottomWidth: 1,
  },
  profileText: {
    fontSize: heightPercentageToDP(2.5),
    fontWeight: 'bold',
    marginTop: heightPercentageToDP(2),
  },
  navigationBars: {},
});

export default SideBar;
