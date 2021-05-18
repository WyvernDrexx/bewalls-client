import React, { useEffect } from 'react';

import {
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  TouchableWithoutFeedback,
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

type SideBarProps = {
  isShown?: boolean;
  animatedStyle?: StyleProp<ViewStyle>;
  onMenuClose?: () => void;
};

const SideBar: React.FC<SideBarProps> = function (props) {
  const sideBarWidth = widthPercentageToDP(100);
  const sideBarShown = useSharedValue(props.isShown);

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
      <View style={styles.sideBarItemsView}>
        <Text>Entries</Text>
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
    backgroundColor: 'white',
    padding: heightPercentageToDP(3),
  },
  transparentView: {
    opacity: 0.1,
    width: widthPercentageToDP(22),
    height: heightPercentageToDP(100),
    backgroundColor: 'black',
  },
});

export default SideBar;
