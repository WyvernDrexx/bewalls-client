import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { isLastElement, wp } from '../../utilities';
import { Card } from './Card';
import { Wallpaper } from '../../generated/graphql';
import { ItemGroup } from '../../types';

type CardProps = {
  items?: Wallpaper[] | null;
  height: string | number;
  width: string | number;
  style?: StyleProp<ViewStyle>;
  disableLastMargin?: boolean;
  disableText?: boolean;
  onClick?: (wallpaper: Wallpaper, group: ItemGroup) => void;
  useFlatList?: boolean;
  group: ItemGroup;
};

const Cards: React.FC<CardProps> = function (props) {
  if (!props.items || !props.items.length) {
    return null;
  }

  return (
    <>
      {props.items.map((item, index) => {
        const isLast = isLastElement(index, props.items!.length);
        return (
          <Card
            group={props.group}
            key={item.id}
            style={[
              props.style,
              isLast && !props.disableLastMargin ? styles.marginRight : {},
            ]}
            wallpaper={item}
            height={props.height}
            width={props.width}
            index={index}
            onClick={props.onClick}
            hideText={props.disableText}
          />
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  marginRight: {
    marginRight: wp(4),
  },
});

export { Cards };
