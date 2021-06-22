import { gql } from '@apollo/client';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Keyboard } from 'react-native';
import { Text } from 'react-native';
import { apolloClient } from '../../apollo';
import StackHeader from '../../components/StackHeader';
import {
  UserCreateError,
  UserCreateInput,
  UserCreateResponse,
  UserSignInResponse,
} from '../../generated/graphql';
import { useTheme, useUser } from '../../hooks';
import { SignInScreenProps } from '../../navigation/types';
import { useAppDispatch } from '../../store';
import { setUserToken } from '../../store/user';
import { hp, verifyUserCreateData, wp } from '../../utilities';
import CheckSvg from './check.svg';

const SignIn: React.FC<SignInScreenProps> = props => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userInputs, setUserInputs] = useState<UserCreateInput>({
    fullName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<UserCreateError>({});
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const {
    themedStyles,
    theme: { colors },
  } = useTheme();
  const dispatch = useAppDispatch();

  const goBack = () => {
    props.navigation.goBack();
  };

  const handleInputChange = (target: keyof UserCreateInput, value: string) => {
    setUserInputs({ ...userInputs, [target]: value });
  };
  const handleSignUp = async () => {
    try {
      const { data } = await apolloClient.mutate<{
        createUser?: UserCreateResponse;
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
      if (data?.createUser?.errors) {
        return setErrors({
          ...data.createUser.errors,
        });
      }
      if (data?.createUser?.token) {
        setIsSuccess(true);
        dispatch(setUserToken(data.createUser.token));
      }
    } catch (error) {}
  };

  const handleSignIn = async () => {
    try {
      const { data } = await apolloClient.mutate<{
        signIn?: UserSignInResponse;
      }>({
        mutation: gql`
          mutation ($email: String!, $password: String!) {
            signIn(email: $email, password: $password) {
              token
              error
            }
          }
        `,
        variables: {
          email: userInputs.email,
          password: userInputs.password,
        },
      });
      if (data?.signIn?.error) {
        console.log('Wrong email password!');
      } else {
        if (data?.signIn?.token) {
          setIsSuccess(true);
          dispatch(setUserToken(data!.signIn!.token!));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    const inputErrors = verifyUserCreateData(userInputs);
    if (inputErrors && inputErrors.fullName && !isLoginMode)
      return setErrors(inputErrors);
    else setErrors({});
    setLoading(true);
    if (isLoginMode) handleSignIn();
    else handleSignUp();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (user.isVerified) props.navigation.navigate('Home');
  }, [user.isVerified]);

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
            <Text style={[styles.inputLabel, themedStyles.text]}>
              Full Name
            </Text>
            <TextInput
              onChangeText={text => handleInputChange('fullName', text)}
              value={userInputs.fullName}
              selectionColor={colors.light}
              style={[styles.input]}
              returnKeyType="next"
              placeholder="John Doe"
              placeholderTextColor="lightgray"
            />
            {errors.fullName ? (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            ) : null}
          </>
        ) : null}
        <Text style={[styles.inputLabel, themedStyles.text]}>Email</Text>
        <TextInput
          onChangeText={text => handleInputChange('email', text)}
          value={userInputs.email}
          keyboardType="email-address"
          selectionColor="gray"
          style={styles.input}
          returnKeyType="next"
          placeholder="email@example.com"
          placeholderTextColor="lightgray"
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}
        <Text style={[styles.inputLabel, themedStyles.text]}>Password</Text>
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
          style={[
            styles.actionButton,
            { borderColor: colors.light },
            isSuccess ? styles.isSuccess : {},
          ]}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : isSuccess ? (
            <View style={styles.flex}>
              <CheckSvg fill="white" height={hp(2)} width={hp(2)} />
            </View>
          ) : (
            <Text style={[themedStyles.textLight, styles.actionText]}>
              {isLoginMode ? 'Sign In' : 'Sign Up'}
            </Text>
          )}
        </TouchableOpacity>
        <Text style={[styles.orText, themedStyles.text]}>Or</Text>
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
  isSuccess: {
    backgroundColor: '#84e152',
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { SignIn };
