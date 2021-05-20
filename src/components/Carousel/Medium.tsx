import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Card from '../Card';
import { CardData } from '../Card/Card';

type MediumSizeCarouselProps = {
  items: CardData[];
  style?: StyleProp<ViewStyle>;
};

const MediumSizeCarousel: React.FC<MediumSizeCarouselProps> = function (props) {
  return (
    <View style={styles.root}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={[props.style]}
        horizontal>
        {props.items.map((item, index) => {
          return (
            <Card
              key={index}
              cardData={item}
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

const styles = StyleSheet.create({
  root: {
    paddingBottom: heightPercentageToDP(1),
  },
});

export { MediumSizeCarousel };