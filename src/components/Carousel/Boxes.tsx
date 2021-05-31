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
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

type BoxesProps = {
  items: Box[];
  style?: StyleProp<ViewStyle>;
  onClick?: (select: string) => void;
  scrollEnabled?: boolean;
  disabled?: boolean;
};

export type Box = {
  title: string;
  backgroundColor: string;
  textColor?: string;
};

type BoxProps = {
  data: Box;
  style?: StyleProp<ViewStyle>;
  onClick?: (select: string) => void;
  disabled?: boolean;
};

const Box: React.FC<BoxProps> = function (props) {
  const onClickHandler = () => {
    if (props.onClick) props.onClick(props.data.title);
  };

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={onClickHandler}
      activeOpacity={0.8}>
      <View
        style={[
          boxStyles.box,
          {
            backgroundColor: props.data.backgroundColor,
          },
          props.style,
        ]}>
        <Text style={boxStyles.text}>{props.data.title}</Text>
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
              disabled={props.disabled}
              style={index === props.items.length - 1 ? styles.lastBox : {}}
              key={index}
              onClick={props.onClick}
              data={item}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const boxStyles = StyleSheet.create({
  box: {
    paddingVertical: heightPercentageToDP(4),
    backgroundColor: 'black',
    borderRadius: heightPercentageToDP(2),
    marginLeft: widthPercentageToDP(4),
    width: widthPercentageToDP(22),
  },
  text: {
    color: 'white',
    fontSize: heightPercentageToDP(2),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  root: {},
  lastBox: {
    marginRight: widthPercentageToDP(4),
  },
});

export { Boxes };
