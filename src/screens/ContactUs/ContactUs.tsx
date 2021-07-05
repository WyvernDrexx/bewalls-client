import React from 'react';
import { StyleSheet, View } from 'react-native';
import StackHeader from '../../components/StackHeader';
import { useTheme } from '../../hooks';
import { ContactUsScreenProps } from '../../navigation/types';

const ContactUs: React.FC<ContactUsScreenProps> = function () {
  const { themedStyles } = useTheme();

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <StackHeader title="Contact Us" titlePosition="left" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export { ContactUs };
