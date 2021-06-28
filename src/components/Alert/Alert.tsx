import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useAlerts, useTheme } from '../../hooks';
import { useAppDispatch } from '../../store';
import { Alert as AlertType, removeAlert } from '../../store/alerts';
import { hp, wp } from '../../utilities';

const Alert = () => {
  const height = hp(20);
  const translateY = useSharedValue(height);
  const [activeAlert, setActiveAlert] =
    useState<(AlertType & { color: string }) | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const dispatch = useAppDispatch();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>();
  const alerts = useAlerts();
  const { theme, themedStyles } = useTheme();

  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const COLORS = {
    normal: theme.colors.light,
    success: '#04aa6d',
    error: 'crimson',
    warning: '#ffd04f',
  };

  const getBackgroundColor = (alert: AlertType) => {
    return COLORS[alert.type];
  };

  useEffect(() => {
    if (alerts.length && !isRunning) {
      const alert = alerts[0];
      setIsRunning(true);
      translateY.value = Animated.withSpring(0, { damping: 15, velocity: 15 });
      setActiveAlert({ ...alert, color: getBackgroundColor(alert) });
      setTimeoutId(
        setTimeout(() => {
          dispatch(removeAlert());
          translateY.value = Animated.withTiming(height, {}, isFinished => {
            if (isFinished) runOnJS(setIsRunning)(false);
          });
        }, 3000),
      );
    }
  }, [alerts, isRunning]);

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (activeAlert === null) return null;

  return (
    <View style={styles.root}>
      <Animated.View
        style={[
          uas,
          styles.alertView,
          theme.isDark ? themedStyles.bgDark : themedStyles.bgSecondary,
        ]}>
        <View
          style={[styles.leftBar, { backgroundColor: activeAlert.color }]}
        />
        <Text
          style={[
            styles.alertText,
            theme.isDark ? themedStyles.text : themedStyles.textLight,
          ]}>
          {activeAlert.message}
        </Text>
        <View
          style={[styles.rightBar, { backgroundColor: activeAlert.color }]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: hp(1),
    zIndex: 1000,
  },
  alertView: {
    display: 'flex',
    width: wp(96),
    left: wp(2),
    padding: wp(4),
    borderRadius: hp(1.5),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  alertText: {
    textAlign: 'center',
    color: 'white',
    flex: 1,
  },
  leftBar: {
    backgroundColor: 'red',
    width: wp(1),
    height: hp(4),
    borderTopRightRadius: wp(30),
    borderBottomRightRadius: wp(30),
    position: 'absolute',
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  rightBar: {
    backgroundColor: 'red',
    width: wp(1),
    height: hp(4),
    right: 0,
    borderTopLeftRadius: wp(30),
    borderBottomLeftRadius: wp(30),
    position: 'absolute',
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

export default Alert;
