import React from 'react';
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { hp, isLastElement, wp } from '../../utilities';
import { Card } from './Card';
import { Wallpaper } from '../../generated/graphql';
import { ItemGroup } from '../../types';

type CardProps = {
  items?: Wallpaper[];
  height: string | number;
  width: string | number;
  style?: StyleProp<ViewStyle>;
  disableLastMargin?: boolean;
  disableText?: boolean;
  onClick?: (wallpaper: Wallpaper, group: ItemGroup) => void;
  useFlatList?: boolean;
  group: ItemGroup;
  loading?: boolean;
};

const Cards: React.FC<CardProps> = function (props) {
  if (props.loading || typeof props.items === 'undefined') {
    return (
      <View
        style={[
          styles.loadingView,
          { height: hp(props.height), width: wp(100) },
        ]}>
        <ActivityIndicator color="black" />
      </View>
    );
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
  loadingView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { Cards };
