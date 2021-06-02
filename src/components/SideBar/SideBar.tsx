import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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

import BarItem from './BarItem';
import ProfileSvg from './profile.svg';
import BackSvg from './back.svg';

import { RootStackParamList } from '../../navigation/types';

type SideBarProps = {
  isShown?: boolean;
  animatedStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
  onItemClick: (route: keyof RootStackParamList) => void;
  currentRoute: keyof RootStackParamList;
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
  const width = widthPercentageToDP(100);
  const isShown = useSharedValue(props.isShown);
  const [toCall, setToCall] = useState<'close' | 'barItem' | null>(null);
  const [themeStyles, { colors }] = useTheme();
  const [activeRoute, setActiveRoute] = useState<keyof RootStackParamList>();

  useEffect(() => {
    isShown.value = props.isShown;
  }, [props.isShown, isShown]);

  const handleClose = () => {
    setToCall('close');
    isShown.value = false;
  };

  const handleBarItemClick = (route: keyof RootStackParamList) => {
    setToCall('barItem');
    setActiveRoute(route);
    isShown.value = false;
  };

  const handleAnimationComplete = (isFinished: boolean) => {
    // Handles the callback when the slide animation gets completed after close button is clicked

    if (isFinished && toCall) {
      if (props.onClose && toCall === 'close') {
        props.onClose();
      }
      if (toCall === 'barItem' && activeRoute) {
        props.onItemClick(activeRoute);
      }
      setToCall(null);
    }
  };

  const sideBarStyle = useAnimatedStyle(() => {
    const offsetX = interpolate(
      isShown.value === true ? 1 : 0, //Fastest way to convert boolean into int
      [0, 1],
      [-width, 0],
    );

    return {
      transform: [
        {
          translateX: Animated.withTiming(offsetX, {}, isFin =>
            runOnJS(handleAnimationComplete)(isFin),
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[sideBarStyle, styles.root, themeStyles.bg]}>
      <View style={[styles.sideBarItemsView]}>
        <TouchableOpacity
          style={[styles.backButton, { borderColor: colors.secondary }]}
          onPress={handleClose}>
          <BackSvg
            height={heightPercentageToDP(2)}
            width={heightPercentageToDP(2)}
            fill={colors.secondary}
          />
        </TouchableOpacity>
        <View style={[styles.profile]}>
          <ProfileSvg
            height={heightPercentageToDP(8)}
            width={heightPercentageToDP(8)}
            fill={colors.secondary}
          />
          <Text style={[styles.profileText, themeStyles.text]}>LP Sharma,</Text>
        </View>
        <View style={[styles.barItems, { borderColor: colors.light }]}>
          {SIDEBAR_ITEMS.map((item, index) => {
            return (
              <BarItem
                isActive={props.currentRoute === item.route}
                key={index}
                onClick={handleBarItemClick}
                route={item.route}
                title={item.title}
              />
            );
          })}
        </View>
      </View>
      <View>
        <TouchableWithoutFeedback onPress={handleClose}>
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
  barItems: {
    borderTopWidth: 1,
  },
});

export default SideBar;
