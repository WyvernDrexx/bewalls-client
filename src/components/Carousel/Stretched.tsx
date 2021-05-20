import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Card, { CardData } from '../Card/Card';

type StretchedProps = {
  items: CardData[];
};

const Stretched: React.FC<StretchedProps> = function (props) {
  return (
    <View style={styles.root}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props.items.map((item, index) => {
          return (
            <Card
              style={
                index === props.items.length - 1
                  ? {
                      marginRight: widthPercentageToDP(4),
                    }
                  : {}
              }
              key={index}
              cardData={item}
              height="15"
              width="55"
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingBottom: heightPercentageToDP(4),
  },
});

export { Stretched };
