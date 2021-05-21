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

import ProfileImage from './profile.svg';
import MoonImage from './moon.svg';
import SunImage from './sun.svg';

import { PADDING_SAFE } from '../../constants';
import { useAppDispatch } from '../../store';
import { changeTheme } from '../../store/theme';
import { useTheme, useThemeStyles } from '../../hooks';

type HeaderProps = {
  animatedStyle?: StyleProp<ViewStyle>;
  onMenuClick?: () => void;
};

const Header: React.FC<HeaderProps> = function (props) {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const themeStyles = useThemeStyles();

  const changeThemeHandler = () => {
    if (theme.mode === 'dark') {
      dispatch(changeTheme('light'));
    } else {
      dispatch(changeTheme('dark'));
    }
  };

  const onMenuClickHandler = () => {
    if (typeof props.onMenuClick !== 'undefined') {
      props.onMenuClick();
    }
  };

  return (
    <Animated.View
      style={[props.animatedStyle, styles.root, themeStyles.bgAndText]}>
      <TouchableOpacity onPress={onMenuClickHandler} activeOpacity={0.6}>
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
      <TouchableOpacity activeOpacity={0.5} onPress={changeThemeHandler}>
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
    paddingHorizontal: PADDING_SAFE,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: heightPercentageToDP(2),
  },
  headerContainer: {},
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'gray',
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
