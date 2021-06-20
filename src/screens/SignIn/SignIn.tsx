import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import StackHeader from '../../components/StackHeader';
import { useTheme } from '../../hooks';
import { SignInScreenProps } from '../../navigation/types';
import { hp, wp } from '../../utilities';

const SignIn: React.FC<SignInScreenProps> = props => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    themedStyles,
    theme: { colors },
  } = useTheme();

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <StackHeader
        onLeftClick={goBack}
        title={isLogin ? 'Sign In' : 'SignUp'}
        titlePosition="left"
      />
      <View style={styles.container}>
        {!isLogin ? (
          <>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              selectionColor="gray"
              style={styles.input}
              returnKeyType="next"
            />
          </>
        ) : null}
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          keyboardType="email-address"
          selectionColor="gray"
          style={styles.input}
          returnKeyType="next"
        />
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput selectionColor="gray" style={styles.input} />
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.actionButton, { borderColor: colors.light }]}>
          <Text style={[themedStyles.textLight, styles.actionText]}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.orText}>Or</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setIsLogin(!isLogin)}
          style={[styles.actionButton, themedStyles.bgSecondary]}>
          <Text style={[themedStyles.textLight, styles.actionText]}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: hp(2),
  },
  inputLabel: {
    fontSize: hp(2.3),
    fontWeight: 'bold',
  },
  input: {
    padding: hp(2),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: hp(1.5),
    marginBottom: hp(1.5),
    marginTop: hp(2),
    color: 'black',
  },
  actionButton: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
    borderRadius: hp(1.5),
    marginTop: hp(2),
    borderWidth: 1,
    backgroundColor: '#0a74ed',
  },
  actionText: {
    display: 'flex',
    textAlign: 'center',
    fontSize: hp(2.3),
  },
  orText: {
    textAlign: 'center',
    marginVertical: hp(3),
  },
});

export { SignIn };
