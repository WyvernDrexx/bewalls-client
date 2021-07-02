import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StackHeader from '../../components/StackHeader';

const Favourites: React.FC = () => {
  return (
    <View style={styles.root}>
      <StackHeader />
      <Text>Favourites</Text>
    </View>
  );
};

export { Favourites };

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
