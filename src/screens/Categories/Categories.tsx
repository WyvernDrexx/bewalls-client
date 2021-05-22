import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeStyles } from '../../hooks';
import { CategoriesScreenProps } from '../../navigation/types';

const Categories: React.FC<CategoriesScreenProps> = function () {
  const themeStyles = useThemeStyles();

  return (
    <View style={[styles.root, themeStyles.bg]}>
      <Text>Categories</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export { Categories };
