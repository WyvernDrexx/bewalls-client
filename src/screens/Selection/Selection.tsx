import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeStyles } from '../../hooks';
import { SelectionScreenProps } from '../../navigation/types';

const Selection: React.FC<SelectionScreenProps> = function (props) {
  const themeStyles = useThemeStyles();
  console.log(props.route.params.select);
  return (
    <View style={[styles.root, themeStyles.bg]}>
      <Text>Selection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export { Selection };
