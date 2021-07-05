import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StackHeader from '../../components/StackHeader';
import { useTheme } from '../../hooks';
import { ContactUsScreenProps } from '../../navigation/types';
import { hp, wp } from '../../utilities';

const ContactUs: React.FC<ContactUsScreenProps> = function () {
  const { themedStyles } = useTheme();

  return (
    <>
      <StackHeader title="Contact Us" />

      <View style={[styles.root, themedStyles.bg]}>
        <View style={styles.container}>
          <Text style={[styles.heading, themedStyles.text]}>
            Content Manager
          </Text>
          <Text style={[styles.text, themedStyles.text]}>
            If you have any queries related with our contents you can contact us
            at
          </Text>
          <Text style={[styles.contactEmail]}>deepanjan@androcrunch.com</Text>
          <Text
            style={[
              styles.heading,
              styles.devContactHeader,
              themedStyles.text,
            ]}>
            Developer Contact
          </Text>
          <Text style={[styles.text, themedStyles.text]}>
            For any technical guidance realted to this app, you can contact the
            developer at
          </Text>
          <Text style={[styles.contactEmail]}>lp@androcrunch.com</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    paddingHorizontal: wp(2),
    height: hp(20),
  },
  contactEmail: {
    backgroundColor: 'black',
    width: wp(50),
    borderRadius: wp(1),
    color: 'white',
    padding: wp(2),
    marginLeft: wp(25),
    textAlign: 'center',
  },
  heading: {
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  text: {
    marginVertical: hp(2),
  },
  devContactHeader: {
    marginTop: hp(2),
  },
});

export { ContactUs };
