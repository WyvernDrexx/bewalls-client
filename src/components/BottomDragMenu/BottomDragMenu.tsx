import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import Fire from './fire.svg';
import Heart from './heart.svg';
import Download from './download.svg';

const iconSize = heightPercentageToDP(4);

const ACTION_BUTTONS = [
  {
    Icon: <Fire height={iconSize - 8} width={iconSize} />,
    action: () => console.log('Clicked!'),
  },
  {
    Icon: <Heart fill="#A434B2" height={iconSize} width={iconSize} />,
    action: () => console.log('Clicked!'),
  },
  {
    Icon: <Download fill="#4060FF" height={iconSize} width={iconSize} />,
    action: () => console.log('Clicked!'),
  },
];

const renderActionButtons = () => {
  return ACTION_BUTTONS.map((item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={item.action}
        style={[
          styles.button,
          {
            transform: [
              {
                translateX: widthPercentageToDP(index * 8 + (index + 1) * 17.5),
              },
            ],
          },
        ]}>
        {item.Icon}
      </TouchableOpacity>
    );
  });
};

const BottomDragMenu = function () {
  // const transX = index * 8 + (index + 1) * 17.5;
  return <View style={styles.root}>{renderActionButtons()}</View>;
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    width: widthPercentageToDP(100),
    backgroundColor: 'white',
    borderTopLeftRadius: heightPercentageToDP(4),
    borderTopRightRadius: heightPercentageToDP(4),
    paddingBottom: heightPercentageToDP(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.9,
    shadowRadius: 16.0,
    elevation: 24,
  },
  button: {
    borderRadius: heightPercentageToDP(50),
    backgroundColor: 'white',
    height: heightPercentageToDP(8),
    width: heightPercentageToDP(8),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: heightPercentageToDP(8) / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default BottomDragMenu;
