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
import { Category } from '../../generated/graphql';
import { ItemGroup } from '../../types';

import { hp, wp, isLastElement } from '../../utilities';

type CategoriesProps = {
  items?: Category[];
  style?: StyleProp<ViewStyle>;
  onClick?: (select: Category, itemType: ItemGroup) => void;
  scrollEnabled?: boolean;
  disableClick?: boolean;
  itemType: ItemGroup;
};

type CategoryItemProps = {
  item: Category;
  style?: StyleProp<ViewStyle>;
  onClick?: (select: Category, itemType: ItemGroup) => void;
  disabled?: boolean;
  itemType: ItemGroup;
};

const CategoryItem: React.FC<CategoryItemProps> = function (props) {
  const handleClick = () => {
    if (props.onClick) props.onClick(props.item, props.itemType);
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
            backgroundColor: props.item.color,
          },
          props.style,
        ]}>
        <Text
          style={[
            boxStyles.text,
            { color: props.item.highlightColor || 'white' },
          ]}>
          {props.item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Categories: React.FC<CategoriesProps> = function (props) {
  if (!props.items) {
    return null;
  }
  return (
    <View style={[styles.root, props.style]}>
      <ScrollView
        scrollEnabled={props.scrollEnabled}
        horizontal
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}>
        {props.items.map((item, index) => {
          return (
            <CategoryItem
              itemType={props.itemType}
              disabled={props.disableClick}
              style={isLastElement(index, props.items!) ? styles.lastBox : {}}
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

export { Categories };
