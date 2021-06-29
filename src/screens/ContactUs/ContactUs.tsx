import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import StackHeader from '../../components/StackHeader';
import { useTheme } from '../../hooks';
import { ContactUsScreenProps } from '../../navigation/types';

const ContactUs: React.FC<ContactUsScreenProps> = function (props) {
  const { themedStyles } = useTheme();
  const onBackClick = () => {
    props.navigation.goBack();
  };

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <StackHeader
        onLeftClick={onBackClick}
        title="Contact Us"
        titlePosition="left"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export { ContactUs };
