import React from 'react';
import { View } from 'react-native';
import StackHeader from '../../components/StackHeader';
import { ContactUsScreenProps } from '../../navigation/types';

const ContactUs: React.FC<ContactUsScreenProps> = function (props) {
  const onBackClick = () => {
    props.navigation.goBack();
  };

  return (
    <View>
      <StackHeader
        onLeftClick={onBackClick}
        title="Contact Us"
        titlePosition="left"
      />
    </View>
  );
};

export { ContactUs };
