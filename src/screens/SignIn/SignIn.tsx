import { gql } from '@apollo/client';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native';
import { apolloClient } from '../../apollo';
import StackHeader from '../../components/StackHeader';
import {
  UserCreateError,
  UserCreateInput,
  UserCreateResponse,
} from '../../generated/graphql';
import { useTheme } from '../../hooks';
import { SignInScreenProps } from '../../navigation/types';
import { hp, verifyUserCreateData, wp } from '../../utilities';

const SignIn: React.FC<SignInScreenProps> = props => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [userInputs, setUserInputs] = useState<UserCreateInput>({
    fullName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<UserCreateError>({});
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    themedStyles,
    theme: { colors },
  } = useTheme();

  const goBack = () => {
    props.navigation.goBack();
  };

  const handleInputChange = (target: keyof UserCreateInput, value: string) => {
    setUserInputs({ ...userInputs, [target]: value });
  };
  const handleSignUp = async () => {
    try {
      const { data } = await apolloClient.mutate<{
        createUser: UserCreateResponse;
      }>({
        mutation: gql`
          mutation ($fullName: String!, $email: String!, $password: String!) {
            createUser(
              data: { fullName: $fullName, email: $email, password: $password }
            ) {
              token
              errors {
                fullName
                email
                password
              }
            }
          }
        `,
        variables: {
          fullName: userInputs.fullName,
          email: userInputs.email,
          password: userInputs.password,
        },
      });
      if (data?.createUser.errors) {
        return setErrors({
          ...data.createUser.errors,
        });
      }
      setToken(data?.createUser.token || '');
    } catch (error) {}
  };

  const handleSubmit = async () => {
    const inputErrors = verifyUserCreateData(userInputs);
    if (inputErrors) return setErrors(inputErrors);
    setLoading(true);
    setErrors({});
    handleSignUp();
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };
  console.log('tokoen', token);
  return (
    <View style={[styles.root, themedStyles.bg]}>
      <StackHeader
        onLeftClick={goBack}
        title={isLoginMode ? 'Sign In' : 'SignUp'}
        titlePosition="left"
      />
      <View style={styles.container}>
        {!isLoginMode ? (
          <>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              onChangeText={text => handleInputChange('fullName', text)}
              value={userInputs.fullName}
              selectionColor="gray"
              style={styles.input}
              returnKeyType="next"
            />
            {errors.fullName ? (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            ) : null}
          </>
        ) : null}
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          onChangeText={text => handleInputChange('email', text)}
          value={userInputs.email}
          keyboardType="email-address"
          selectionColor="gray"
          style={styles.input}
          returnKeyType="next"
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          onChangeText={text => handleInputChange('password', text)}
          value={userInputs.password}
          selectionColor="gray"
          style={styles.input}
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.5}
          style={[styles.actionButton, { borderColor: colors.light }]}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={[themedStyles.textLight, styles.actionText]}>
              {isLoginMode ? 'Sign In' : 'Sign Up'}
            </Text>
          )}
        </TouchableOpacity>
        <Text style={styles.orText}>Or</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setIsLoginMode(!isLoginMode)}
          style={[styles.actionButton, themedStyles.bgSecondary]}>
          <Text style={[themedStyles.textLight, styles.actionText]}>
            {isLoginMode ? 'Sign Up' : 'Sign In'}
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
  errorText: {
    color: 'crimson',
    marginBottom: hp(2),
  },
});

export { SignIn };
