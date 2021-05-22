import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Card, { CardData } from './Card';

type CardProps = {
  items: CardData[];
  height: string | number;
  width: string | number;
  styles?: StyleProp<ViewStyle>;
};

const Cards: React.FC<CardProps> = function (props) {
  return (
    <>
      {props.items.map((item, index) => {
        return (
          <Card
            key={index}
            style={[
              props.styles,
              index === props.items.length - 1
                ? { marginRight: widthPercentageToDP(4) }
                : {},
            ]}
            cardData={item}
            height={props.height}
            width={props.width}
          />
        );
      })}
    </>
  );
};

export { Cards };
