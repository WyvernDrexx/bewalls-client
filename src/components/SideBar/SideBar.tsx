import React, { useEffect } from 'react';

import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
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
  const [, theme] = useTheme();

  useEffect(() => {
    sideBarShown.value = props.isShown;
    if (props.isShown) {
      StatusBar.setBackgroundColor('#0E1E54');
      StatusBar.setBarStyle('light-content');
    } else {
      StatusBar.setBackgroundColor(theme.colors.primary);
      StatusBar.setBarStyle(
        theme.mode === 'light' ? 'dark-content' : 'light-content',
      );
    }
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
          translateX: Animated.withTiming(offsetX, {}, isFinished => {
            console.log(isFinished);
          }),
        },
      ],
    };
  });

  const onBarItemClick = (route: keyof RootStackParamList) => {
    props.onItemClick(route);
  };

  return (
    <Animated.View style={[sideBarStyle, styles.root]}>
      <View style={[styles.sideBarItemsView]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onMenuCloseHandler}>
          <BackSvg
            height={heightPercentageToDP(2)}
            width={heightPercentageToDP(2)}
            fill={'#505DAC'}
          />
        </TouchableOpacity>
        <View style={[styles.profile]}>
          <ProfileSvg
            height={heightPercentageToDP(8)}
            width={heightPercentageToDP(8)}
            fill={'white'}
          />
          <Text style={[styles.profileText]}>LP Sharma,</Text>
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
    backgroundColor: '#0E1E54',
  },
  backButton: {
    padding: widthPercentageToDP(4),
    borderColor: '#505DAC',
    borderWidth: widthPercentageToDP(0.5),
    borderRadius: widthPercentageToDP(50),
    position: 'absolute',
    right: widthPercentageToDP(5),
    top: heightPercentageToDP(5),
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
  },
  navigationBars: {},
});

export default SideBar;
