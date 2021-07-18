import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.root}>
      <Text>Profile</Text>
    </View>
  );
};

export { Profile };

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
