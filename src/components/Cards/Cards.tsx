import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { WallpaperType } from '../../types';
import { isLastElement } from '../../utilities';
import { Card } from './Card';

type CardProps = {
  items: WallpaperType[];
  height: string | number;
  width: string | number;
  style?: StyleProp<ViewStyle>;
  disableLastMargin?: boolean;
  disableText?: boolean;
  onClick?: (select: WallpaperType, index: number) => void;
  useFlatList?: boolean;
};

const Cards: React.FC<CardProps> = function (props) {
  return (
    <>
      {props.items.map((item, index) => {
        const isLast = isLastElement(index, props.items.length);
        return (
          <Card
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
            disableText={props.disableText}
          />
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  marginRight: {
    marginRight: widthPercentageToDP(4),
  },
});

export { Cards };
