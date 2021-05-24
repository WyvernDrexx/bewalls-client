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

import ProfileSvg from './profile.svg';

type SideBarProps = {
  isShown?: boolean;
  animatedStyle?: StyleProp<ViewStyle>;
  onMenuClose?: () => void;
};

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

  return (
    <Animated.View style={[sideBarStyle, styles.root]}>
      <View style={[styles.sideBarItemsView, themeStyles.bg]}>
        <View style={styles.profile}>
          <ProfileSvg
            height={heightPercentageToDP(8)}
            width={heightPercentageToDP(8)}
            fill={theme.colors.secondary}
          />
          <Text style={[styles.profileText, themeStyles.text]}>LP Sharma</Text>
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
    padding: heightPercentageToDP(2),
  },
  transparentView: {
    opacity: 0.1,
    width: widthPercentageToDP(22),
    height: heightPercentageToDP(100),
    backgroundColor: 'black',
  },
  profile: {
    marginTop: heightPercentageToDP(8),
  },
  profileText: {
    fontSize: heightPercentageToDP(2.5),
    fontWeight: 'bold',
    marginTop: heightPercentageToDP(2),
  },
});

export default SideBar;
