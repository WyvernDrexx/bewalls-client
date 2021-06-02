import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import Animated from 'react-native-reanimated';

import { useTheme } from '../../hooks';
import { useAppDispatch } from '../../store';
import { changeTheme } from '../../store/theme';

import ProfileImage from './profile.svg';
import MoonImage from './moon.svg';
import SunImage from './sun.svg';

type HeaderProps = {
  animatedStyle?: StyleProp<ViewStyle>;
  onProfileClick?: () => void;
};

const Header: React.FC<HeaderProps> = function (props) {
  const dispatch = useAppDispatch();
  const [themeStyles, theme] = useTheme();

  const handleThemeChange = () => {
    dispatch(changeTheme(theme.isDark ? 'light' : 'dark'));
  };

  const handleProfileClick = () => {
    if (props.onProfileClick) {
      props.onProfileClick();
    }
  };

  return (
    <Animated.View
      style={[props.animatedStyle, styles.root, themeStyles.bgAndText]}>
      <TouchableOpacity onPress={handleProfileClick} activeOpacity={0.6}>
        <View style={styles.userInfo}>
          <ProfileImage
            fill={theme.colors.secondary}
            width={widthPercentageToDP(12)}
            height={widthPercentageToDP(12)}
          />
          <View style={styles.welcomeView}>
            <Text style={[styles.welcomeText, themeStyles.text]}>Welcome,</Text>
            <Text style={[styles.nameText, themeStyles.text]}>John</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} onPress={handleThemeChange}>
        {theme.mode === 'light' ? (
          <MoonImage
            fill="black"
            width={widthPercentageToDP(6)}
            height={widthPercentageToDP(6)}
          />
        ) : (
          <SunImage
            fill="#FFD347"
            width={widthPercentageToDP(7)}
            height={widthPercentageToDP(7)}
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: widthPercentageToDP(4),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: heightPercentageToDP(2),
  },
  headerContainer: {},
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: heightPercentageToDP(2),
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: heightPercentageToDP(2.5),
  },
  welcomeView: {
    paddingLeft: widthPercentageToDP(2),
  },
});

export default Header;
