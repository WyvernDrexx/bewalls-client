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
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useTheme } from '../../hooks';

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
    console.log(props.title, 'MORE Clicked!');
  };
  const [themeStyles] = useTheme();
  return (
    <View style={[styles.root, props.viewStyle]}>
      <Text style={[styles.headingText, themeStyles.text, props.textStyle]}>
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
    paddingVertical: heightPercentageToDP(2),
    paddingHorizontal: widthPercentageToDP(4),
    paddingTop: heightPercentageToDP(4),
  },
  headingText: {
    fontSize: heightPercentageToDP(3),
    fontWeight: 'bold',
  },
  moreText: {
    color: '#5079FF',
    fontSize: heightPercentageToDP(2.5),
  },
});

export default HeadingTitle;
