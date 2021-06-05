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
  style?: StyleProp<ViewStyle>;
  showOptions?: boolean;
  onChange?: (id: string | number) => void;
  onUnderlayClick?: () => void;
};

function Options(props: OptionsProps) {
  const optionHeight = hp(8.8);
  const initalOffset = hp(100);
  const optionsHeight = optionHeight * props.options?.length;

  const offsetY = useSharedValue(initalOffset);

  const [selectedOption, setSelectedOption] = useState<string | number>(
    props.initalSelection || props.options[0]?.id || '',
  );

  const handleOptionsShow = () => {
    offsetY.value = Animated.withTiming(-optionsHeight);
  };

  const handleOptionsHide = () => {
    offsetY.value = Animated.withTiming(initalOffset, { duration: 800 });
  };

  const handleOptionClick = (id: string | number) => {
    setSelectedOption(id);
  };

  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: offsetY.value,
        },
      ],
    };
  });

  useEffect(() => {
    if (props.showOptions) handleOptionsShow();
    else handleOptionsHide();
  }, [props.showOptions]);

  useEffect(() => {
    if (props.onChange) props.onChange(selectedOption);
  }, [selectedOption]);

  const renderOptions = () => {
    return props.options.map((item, index) => {
      return (
        <Option
          onClick={handleOptionClick}
          isSelected={item.id === selectedOption}
          key={index}
          option={item}
        />
      );
    });
  };

  if (!props.options) return null;

  return (
    <Animated.View style={[uas, styles.root]}>
      <TouchableWithoutFeedback
        onPress={props.onUnderlayClick}
        style={styles.underLay}
      />
      <View>{renderOptions()}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
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
