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
import StackHeader from '../../components/StackHeader';
import {
  useCreateUserMutation,
  UserCreateError,
  UserCreateInput,
  useSignInMutation,
} from '../../generated/graphql';
import { useTheme, useUser } from '../../hooks';
import { SignInScreenProps } from '../../navigation/types';
import { useAppDispatch } from '../../store';
import { setUserToken } from '../../store/user';
import { hp, verifyUserCreateData, wp } from '../../utilities';
import tokenStorage from '../../utilities/tokenStorage';
import CheckSvg from './check.svg';

const SignIn: React.FC<SignInScreenProps> = props => {
  const { themedStyles, theme } = useTheme();
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
  const dispatch = useAppDispatch();

  const [createUser] = useCreateUserMutation({
    onCompleted: async data => {
      if (data?.createUser?.errors) {
        return setErrors({
          ...data.createUser.errors,
        });
      }
      if (data?.createUser?.token) {
        console.log('signup', data.createUser.token);
        setIsSuccess(true);
        dispatch(setUserToken(data.createUser.token));
        await tokenStorage.setToken(data.createUser.token);
      }
    },
  });

  const [signIn] = useSignInMutation({
    onCompleted: async data => {
      if (data?.signIn?.error) {
        console.log('Wrong email password!');
      } else {
        if (data?.signIn?.token) {
          setIsSuccess(true);
          dispatch(setUserToken(data!.signIn!.token!));
          await tokenStorage.setToken(data!.signIn!.token!);
        }
      }
    },
  });

  const goBack = () => {
    props.navigation.goBack();
  };

  const handleInputChange = (target: keyof UserCreateInput, value: string) => {
    setUserInputs({ ...userInputs, [target]: value });
  };

  const handleSignUp = () => {
    const { fullName, email, password } = userInputs;
    createUser({
      variables: {
        fullName,
        email,
        password,
      },
    });
  };

  const handleSignIn = () => {
    const { email, password } = userInputs;
    signIn({
      variables: {
        email,
        password,
      },
    });
  };

  const handleSubmit = () => {
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
              selectionColor={theme.colors.light}
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
            { borderColor: theme.colors.light },
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
