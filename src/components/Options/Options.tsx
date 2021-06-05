import React, { useEffect, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { hp, wp } from '../../utilities';
import Option, { OptionType } from './Option';

type OptionsProps = {
  options: OptionType[];
  initalSelection?: number | string;
  onClick?: (id: string | number) => void;
  style?: StyleProp<ViewStyle>;
  showOptions?: boolean;
  onUnderlayClick?: () => void;
};

function Options(props: OptionsProps) {
  const optionHeight = hp(8.8);
  const height = optionHeight * props.options?.length;
  const initalOffset = hp(100);
  const offsetY = useSharedValue(initalOffset);
  const [selectedOptionId, setSelectedOptionId] = useState<string | number>(
    props.initalSelection || -100,
  );

  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: offsetY.value,
        },
      ],
    };
  });

  const showOptions = () => {
    offsetY.value = Animated.withTiming(-height);
  };

  const hideOptions = () => {
    offsetY.value = Animated.withTiming(initalOffset, { duration: 800 });
  };

  const handleOptionClick = (id: string | number) => {
    setSelectedOptionId(id);
  };

  useEffect(() => {
    if (props.showOptions) showOptions();
    else hideOptions();
  }, [props.showOptions]);

  useEffect(() => {
    if (props.onClick) props.onClick(selectedOptionId);
  }, [selectedOptionId]);

  const renderOptions = () => {
    return props.options.map((item, index) => {
      return (
        <Option
          onClick={handleOptionClick}
          isSelected={item.id === selectedOptionId}
          key={index}
          option={item}
        />
      );
    });
  };

  return (
    <Animated.View style={[uas, styles.optionsView]}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (props.onUnderlayClick) props.onUnderlayClick();
        }}
        style={styles.underLay}
      />
      <View>{renderOptions()}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'red',
  },
  optionsView: {
    position: 'absolute',
    zIndex: 1000,
    width: wp(100),
    paddingTop: hp(2),
  },
  underLay: {
    height: hp(100),
    width: wp(100),
    opacity: 0,
  },
});

export default Options;
