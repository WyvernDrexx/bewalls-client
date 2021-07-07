import React, { useEffect, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks';
import { hp, wp } from '../../utilities';
import Option, { OptionType } from './Option';

type OptionsProps = {
  options: OptionType[];
  initalSelection?: number;
  style?: StyleProp<ViewStyle>;
  showOptions?: boolean;
  onChange?: (id: number) => void;
  onUnderlayClick?: () => void;
};

function Options(props: OptionsProps) {
  const initalOffset = hp(100);
  const { theme } = useTheme();
  const offsetY = useSharedValue(initalOffset);

  const [selectedOption, setSelectedOption] = useState<number>(
    props.initalSelection || props.options[0]?.id || -100,
  );

  const handleOptionsShow = () => {
    offsetY.value = Animated.withTiming(0);
  };

  const handleOptionsHide = () => {
    offsetY.value = Animated.withTiming(initalOffset);
  };

  const handleOptionClick = (id: number) => {
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
    if (props.onChange && selectedOption !== props.initalSelection)
      props.onChange(selectedOption);
  }, [selectedOption]);

  const renderOptions = () => {
    return props.options.map((item, index) => {
      return (
        <Option
          isFirstElement={index === 0}
          isLastElement={index === props.options.length - 1}
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
      <View style={[styles.container, { borderColor: theme.colors.light }]}>
        {renderOptions()}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    zIndex: 1000,
    width: wp(100),
  },
  container: {
    margin: wp(5),
    position: 'absolute',
    bottom: hp(10),
    borderRadius: wp(2),
  },
  underLay: {
    height: hp(100),
    width: wp(100),
  },
});

export default Options;
