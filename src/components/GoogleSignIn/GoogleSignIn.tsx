import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks';
import useUser from '../../hooks/useUser';
import { useAppDispatch } from '../../store';
import { userSignIn } from '../../store/user';
import { hp, wp } from '../../utilities';

type Props = {
  shown?: boolean;
  onClose?: () => void;
};

const GoogleSignInView = function (props: Props) {
  const [signInProgress, setSignInProgress] = useState(false);
  const user = useUser();
  const height = hp(100);
  const dispatch = useAppDispatch();
  const offsetY = useSharedValue(height);
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

  const handleSignIn = async () => {
    try {
      setSignInProgress(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setSignInProgress(false);
      // dispatch(userSignIn(userInfo));
    } catch (error) {
      setSignInProgress(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
    handleClose();
  };

  useEffect(function () {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '995701163305-cjgpdg03mlg7p65lfhib67kpacen5vof.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

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
            {signInProgress ? <ActivityIndicator color="white" /> : null}
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
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  signInButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp(2.5),
    color: 'white',
    width: wp(80),
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

export default GoogleSignInView;
