import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';

type HeadingTitleProps = {
  title: string;
  more?: string;
  hideButton?: boolean;
  onClick?: () => void;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const HeadingTitle: React.FC<HeadingTitleProps> = function (props) {
  const handleClick = () => {
    if (props.onClick) return props.onClick();
  };
  const { themedStyles } = useTheme();
  return (
    <View style={[styles.root, props.viewStyle]}>
      <Text style={[styles.headingText, themedStyles.text, props.textStyle]}>
        {props.title}
      </Text>
      {!props.hideButton ? (
        <TouchableOpacity onPress={handleClick}>
          <Text style={[styles.moreText, props.textStyle]}>
            {props.more || 'MORE'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  headingText: {
    fontSize: hp(3),
    fontWeight: 'bold',
  },
  moreText: {
    color: '#5079FF',
    fontSize: hp(2.5),
  },
});

export default HeadingTitle;
