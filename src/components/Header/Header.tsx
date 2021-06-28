import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
} from 'react-native';

import Animated from 'react-native-reanimated';

import { hp, wp } from '../../utilities';
import { useAlerts, useTheme, useUser } from '../../hooks';
import { useAppDispatch } from '../../store';
import { changeTheme } from '../../store/theme';

import ProfileImage from './profile.svg';
import MoonImage from './moon.svg';

type HeaderProps = {
  animatedStyle?: StyleProp<ViewStyle>;
  onProfileClick?: () => void;
};

const Header: React.FC<HeaderProps> = function (props) {
  const dispatch = useAppDispatch();
  const { themedStyles, theme } = useTheme();
  const { dispatchAlert } = useAlerts();
  const user = useUser();
  const handleThemeChange = () => {
    dispatch(changeTheme(theme.isDark ? 'light' : 'dark'));
    dispatchAlert({
      message: 'This is a test!' + String(Math.random() * 1000),
      type: 'warning',
    });
  };

  const handleProfileClick = () => {
    if (props.onProfileClick) {
      props.onProfileClick();
    }
  };

  return (
    <Animated.View
      style={[props.animatedStyle, styles.root, themedStyles.bgAndText]}>
      <TouchableOpacity onPress={handleProfileClick} activeOpacity={0.6}>
        <View style={styles.userInfo}>
          <ProfileImage
            fill={theme.colors.secondary}
            width={wp(12)}
            height={wp(12)}
          />
          <View style={styles.welcomeView}>
            <Text style={[styles.welcomeText, themedStyles.text]}>
              Welcome,
            </Text>
            <Text style={[styles.nameText, themedStyles.text]}>
              {user.info ? user.info.fullName : 'You'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} onPress={handleThemeChange}>
        {theme.mode === 'light' ? (
          <MoonImage fill="black" width={wp(6)} height={wp(6)} />
        ) : (
          <MoonImage fill="#FFD347" width={wp(6)} height={wp(6)} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: wp(4),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(2),
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: hp(2),
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: hp(2.5),
  },
  welcomeView: {
    paddingLeft: wp(2),
  },
});

export default Header;
