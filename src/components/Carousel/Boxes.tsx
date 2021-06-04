import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  ScrollView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { hp, wp, isLastElement } from '../../utilities';

export type Box = {
  title: string;
  backgroundColor: string;
  textColor?: string;
};

type BoxesProps = {
  items: Box[];
  style?: StyleProp<ViewStyle>;
  onClick?: (select: string) => void;
  scrollEnabled?: boolean;
  disableClick?: boolean;
};

type BoxProps = {
  item: Box;
  style?: StyleProp<ViewStyle>;
  onClick?: (select: string) => void;
  disabled?: boolean;
};

const Box: React.FC<BoxProps> = function (props) {
  const handleClick = () => {
    if (props.onClick) props.onClick(props.item.title);
  };

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={handleClick}
      activeOpacity={0.8}>
      <View
        style={[
          boxStyles.box,
          {
            backgroundColor: props.item.backgroundColor,
          },
          props.style,
        ]}>
        <Text
          style={[boxStyles.text, { color: props.item.textColor || 'white' }]}>
          {props.item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Boxes: React.FC<BoxesProps> = function (props) {
  return (
    <View style={[styles.root, props.style]}>
      <ScrollView
        scrollEnabled={props.scrollEnabled}
        horizontal
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}>
        {props.items.map((item, index) => {
          return (
            <Box
              disabled={props.disableClick}
              style={isLastElement(index, props.items) ? styles.lastBox : {}}
              key={index}
              onClick={props.onClick}
              item={item}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const boxStyles = StyleSheet.create({
  box: {
    paddingVertical: hp(4),
    backgroundColor: 'black',
    borderRadius: hp(2),
    marginLeft: wp(4),
    width: wp(22),
  },
  text: {
    color: 'white',
    fontSize: hp(2),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  root: {},
  lastBox: {
    marginRight: wp(4),
  },
});

export { Boxes };
