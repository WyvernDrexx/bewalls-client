import React from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';

type Props = {
  shown?: boolean;
  onClose?: () => void;
};

const GoogleSignIn = function (props: Props) {
  const height = hp(100);
  const offsetY = useSharedValue(0);
  const { themedStyles } = useTheme();
  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(offsetY.value),
        },
      ],
    };
  });

  const handleClose = () => {
    if (props.onClose) props.onClose();
  };

  useEffect(() => {
    if (props.shown) offsetY.value = 0;
    else offsetY.value = height;
  }, [props.shown]);

  const handleSignIn = () => {
    console.log('sign');
  };

  return (
    <Animated.View style={[uas, styles.root]}>
      <TouchableOpacity onPress={handleClose} style={styles.touchable} />
      <View style={[styles.container, themedStyles.bg]}>
        <View>
          <Text style={[styles.signInText, themedStyles.text]}>
            Sign In, It's Free!
          </Text>
          <Text style={[styles.signInSubText, themedStyles.text]}>
            Sign In, It's Free!
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={handleSignIn}
            activeOpacity={0.8}
            style={[styles.signInButton]}>
            <Text style={[styles.signInButtonText]}>Sign In with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClose} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip for Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: hp(100),
    width: wp(100),
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'rgba(18, 17, 19, 0.5)',
  },
  container: {
    height: hp(60),
    padding: hp(2),
    borderTopLeftRadius: hp(5),
    borderTopRightRadius: hp(5),
    width: wp(100),
    paddingTop: hp(4),
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },
  touchable: {
    height: hp(40),
    width: wp(100),
    position: 'absolute',
    top: 0,
  },
  signInText: {
    fontWeight: 'bold',
    fontSize: wp(6),
  },
  signInSubText: {
    marginTop: hp(3),
  },
  signInButton: {
    padding: hp(2),
    borderRadius: hp(4),
    backgroundColor: '#2E83E5',
  },
  signInButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp(2.5),
    color: 'white',
  },
  skipButton: {
    marginTop: hp(2),
  },
  skipText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp(2.2),
  },
});

export default GoogleSignIn;
