import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { WallpaperType } from '../../types';
import Card from './Card';

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
  // const renderItem = (item: CardData, index: number) => {
  //   return (
  //     <Card
  //       style={[
  //         props.style,
  //         index === props.items.length - 1 && !props.disableLastMargin
  //           ? { marginRight: widthPercentageToDP(4) }
  //           : {},
  //       ]}
  //       cardData={item}
  //       height={props.height}
  //       width={props.width}
  //       onClick={props.onClick}
  //     />
  //   );
  // };

  // if (props.useFlatList) {
  //   return <FlatList data={props.items} renderItem={renderItem} />;
  // }

  return (
    <>
      {props.items.map((item, index) => {
        return (
          <Card
            key={index}
            style={[
              props.style,
              index === props.items.length - 1 && !props.disableLastMargin
                ? { marginRight: widthPercentageToDP(4) }
                : {},
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

export { Cards };
