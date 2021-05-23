import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Card, { CardData } from './Card';

type CardProps = {
  items: CardData[];
  height: string | number;
  width: string | number;
  style?: StyleProp<ViewStyle>;
  disableLastMargin?: boolean;
  onClick?: (select: CardData, index: number) => void;
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
            cardData={item}
            height={props.height}
            width={props.width}
            index={index}
            onClick={props.onClick}
          />
        );
      })}
    </>
  );
};

export { Cards };
