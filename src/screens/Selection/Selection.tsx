import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeStyles } from '../../hooks';
import { SelectionScreenProps } from '../../navigation/types';

const Selection: React.FC<SelectionScreenProps> = function (props) {
  const themeStyles = useThemeStyles();
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerTitle: props.route.params.select,
      headerTitleAlign: 'center',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.route.params.select]);

  return <View style={[styles.root, themeStyles.bg]}></View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export { Selection };
