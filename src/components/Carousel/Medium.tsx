import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Card from '../Card';
import { CardData } from '../Card/Card';

type MediumSizeCarouselProps = {
  items: CardData[];
  style?: StyleProp<ViewStyle>;
};

const MediumSizeCarousel: React.FC<MediumSizeCarouselProps> = function (props) {
  return (
    <View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={[props.style]}
        horizontal>
        {props.items.map((item, index) => {
          const { image, title, subTitle } = item;
          return (
            <Card
              key={index}
              cardData={{ image, title, subTitle }}
              height="35"
              width="42"
              style={
                index === props.items.length - 1
                  ? {
                      marginRight: widthPercentageToDP(4),
                    }
                  : {}
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export { MediumSizeCarousel };
