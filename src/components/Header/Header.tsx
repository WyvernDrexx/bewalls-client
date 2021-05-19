import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import Animated from 'react-native-reanimated';
import getColorScheme from '../../utilities/getColorScheme';

import ProfileImage from './profile.svg';
import MoonImage from './moon.svg';
import SunImage from './sun.svg';

type HeaderProps = {
  animatedStyle?: StyleProp<ViewStyle>;
  onMenuClick?: () => void;
};

const COLORS = getColorScheme();

const Header: React.FC<HeaderProps> = function (props) {
  const onMenuClickHandler = () => {
    if (typeof props.onMenuClick !== 'undefined') {
      props.onMenuClick();
    }
  };

  return (
    <Animated.View style={[props.animatedStyle, styles.root]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={onMenuClickHandler}
          activeOpacity={0.6}>
          <View>
            <ProfileImage
              fill="black"
              width={widthPercentageToDP(12)}
              height={widthPercentageToDP(12)}
            />
          </View>
          <View style={styles.welcomeView}>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.nameText}>John</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          {true ? (
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
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: heightPercentageToDP(9),
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: widthPercentageToDP('4%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: COLORS.secondary,
    width: widthPercentageToDP(100),
    paddingBottom: heightPercentageToDP(2),
  },
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
    color: COLORS.secondary,
    fontWeight: 'bold',
    fontSize: heightPercentageToDP(2.5),
  },
  welcomeView: {
    paddingLeft: widthPercentageToDP(2),
  },
});

export default Header;
