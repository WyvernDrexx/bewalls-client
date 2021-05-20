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
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { PADDING_SAFE } from '../../constants';
import getColorScheme from '../../utilities/getColorScheme';

type HeadingTitleProps = {
  title: string;
  more?: string;
  onMoreClick?: () => void;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const HeadingTitle: React.FC<HeadingTitleProps> = function (props) {
  const onClickHandler = () => {
    if (props.onMoreClick) {
      return props.onMoreClick();
    } else {
      console.log(props.title, 'MORE Clicked!');
    }
  };

  return (
    <View style={[styles.root, props.viewStyle]}>
      <Text style={[styles.headingText, props.textStyle]}>{props.title}</Text>
      <TouchableOpacity onPress={onClickHandler}>
        <Text style={[styles.moreText, props.textStyle]}>
          {props.more || 'MORE'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const COLORS = getColorScheme();

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingVertical: heightPercentageToDP(2),
    paddingHorizontal: PADDING_SAFE,
  },
  headingText: {
    color: COLORS.secondary,
    fontSize: heightPercentageToDP(3),
    fontWeight: 'bold',
  },
  moreText: {
    color: '#5079FF',
    fontSize: heightPercentageToDP(2.5),
  },
});

export default HeadingTitle;
