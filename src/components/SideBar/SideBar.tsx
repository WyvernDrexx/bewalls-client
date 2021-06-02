import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
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
import BackSvg from './back.svg';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
  const [closingMode, setClosingMode] =
    useState<'normal' | 'route' | null>(null);
  const [themeStyles, theme] = useTheme();
  const [activeRoute, setActiveRoute] = useState<keyof RootStackParamList>();

  useEffect(() => {
    sideBarShown.value = props.isShown;
  }, [props.isShown, sideBarShown]);

  const onMenuCloseHandler = () => {
    setClosingMode('normal');
    sideBarShown.value = false;
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
          translateX: Animated.withTiming(offsetX, {}, isFin => {
            if (isFin && closingMode) {
              if (
                typeof props.onMenuClose !== 'undefined' &&
                closingMode === 'normal'
              ) {
                runOnJS(props.onMenuClose)();
              }
              if (closingMode === 'route' && activeRoute) {
                runOnJS(props.onItemClick)(activeRoute);
              }
              runOnJS(setClosingMode)(null);
            }
          }),
        },
      ],
    };
  });

  const onBarItemClick = (route: keyof RootStackParamList) => {
    setClosingMode('route');
    setActiveRoute(route);
    sideBarShown.value = false;
  };

  return (
    <Animated.View style={[sideBarStyle, styles.root, themeStyles.bg]}>
      <View style={[styles.sideBarItemsView]}>
        <TouchableOpacity
          style={[styles.backButton, { borderColor: theme.colors.secondary }]}
          onPress={onMenuCloseHandler}>
          <BackSvg
            height={heightPercentageToDP(2)}
            width={heightPercentageToDP(2)}
            fill={theme.colors.secondary}
          />
        </TouchableOpacity>
        <View style={[styles.profile]}>
          <ProfileSvg
            height={heightPercentageToDP(8)}
            width={heightPercentageToDP(8)}
            fill={theme.colors.secondary}
          />
          <Text style={[styles.profileText, themeStyles.text]}>LP Sharma,</Text>
        </View>
        <View
          style={[styles.navigationBars, { borderColor: theme.colors.light }]}>
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
      <View>
        <TouchableWithoutFeedback onPress={onMenuCloseHandler}>
          <Animated.View style={[styles.transparentView]} />
        </TouchableWithoutFeedback>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: widthPercentageToDP(75),
    height: heightPercentageToDP(100),
    position: 'absolute',
    top: 0,
    zIndex: 100,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  backButton: {
    padding: widthPercentageToDP(4),
    borderWidth: widthPercentageToDP(0.5),
    borderRadius: widthPercentageToDP(50),
    position: 'absolute',
    right: widthPercentageToDP(5),
    top: heightPercentageToDP(3),
  },
  sideBarItemsView: {
    width: widthPercentageToDP(75),
  },
  transparentView: {
    opacity: 0,
    width: widthPercentageToDP(25),
    height: heightPercentageToDP(100),
    backgroundColor: 'black',
  },
  profile: {
    padding: heightPercentageToDP(2),
    paddingBottom: heightPercentageToDP(2),
    marginTop: heightPercentageToDP(10),
  },
  profileText: {
    fontSize: heightPercentageToDP(4),
    fontWeight: 'bold',
    marginTop: heightPercentageToDP(3),
    color: 'white',
    marginHorizontal: widthPercentageToDP(-4),
    paddingHorizontal: widthPercentageToDP(4),
    paddingBottom: heightPercentageToDP(1),
  },
  navigationBars: {
    borderTopWidth: 1,
  },
});

export default SideBar;
