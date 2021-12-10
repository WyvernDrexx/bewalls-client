import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import StackHeader from '../../components/StackHeader'
import { useCreateUserMutation, UserCreateError, UserCreateInput, useSignInMutation } from '../../generated/graphql'
import { useAlerts, useTheme, useUser } from '../../hooks'
import { SignInScreenProps } from '../../navigation/types'
import { useAppDispatch } from '../../store'
import { setToken } from '../../store/user'
import { hp, verifyUserCreateData, wp } from '../../utilities'
import tokenStorage from '../../utilities/tokenStorage'
import CheckSvg from './check.svg'
import EmailSvg from './envelope.svg'
import FullNameSvg from './full-name.svg'
import LockSvg from './locks.svg'
import IoniIcons from 'react-native-vector-icons/Ionicons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SignIn: React.FC<SignInScreenProps> = (props) => {
  const { themedStyles, theme } = useTheme()
  const [isLoginMode, setIsLoginMode] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [userInputs, setUserInputs] = useState<UserCreateInput>({
    fullName: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<UserCreateError>({})
  const [loading, setLoading] = useState(false)
  const { dispatchShowAlert } = useAlerts()
  const user = useUser()
  const dispatch = useAppDispatch()

  const [createUser] = useCreateUserMutation({
    onCompleted: async (data) => {
      if (data?.createUser?.errors) {
        return setErrors({
          ...data.createUser.errors
        })
      }
      if (data?.createUser?.token) {
        setIsSuccess(true)
        dispatch(setToken(data.createUser.token))
        dispatchShowAlert({
          success: 'Account successfully created!'
        })
        await tokenStorage.setToken(data.createUser.token)
      }
    },
    onError: () => {
      dispatchShowAlert({
        error: 'Unknown error encountered!'
      })
    }
  })

  const [signIn] = useSignInMutation({
    onCompleted: async (data) => {
      if (data?.signIn?.error) {
        dispatchShowAlert({
          error: 'Invalid email/password!'
        })
      } else {
        if (data?.signIn?.token) {
          setIsSuccess(true)
          dispatch(setToken(data!.signIn!.token!))
          dispatchShowAlert({
            success: 'Sign In successfull!'
          })
          await tokenStorage.setToken(data!.signIn!.token!)
        }
      }
    },
    onError: () => {
      dispatchShowAlert({
        error: 'Unknown error encountered!'
      })
    }
  })

  const handleInputChange = (target: keyof UserCreateInput, value: string) => {
    setUserInputs({ ...userInputs, [target]: value })
  }

  const handleSignUp = () => {
    const { fullName, email, password } = userInputs
    createUser({
      variables: {
        fullName,
        email,
        password
      }
    })
  }

  const handleSignIn = () => {
    const { email, password } = userInputs
    signIn({
      variables: {
        email,
        password
      }
    })
  }

  const HeaderRightButton = () => {
    return (
      <TouchableOpacity
        onPress={() => setIsLoginMode(!isLoginMode)}
        style={[styles.rightButton, { borderColor: theme.colors.secondary }]}
      >
        <Text style={[styles.rightButtonText, themedStyles.text]}>{isLoginMode ? 'Sign Up' : 'Sign In'}</Text>
      </TouchableOpacity>
    )
  }

  const handleSubmit = () => {
    Keyboard.dismiss()
    const inputErrors = verifyUserCreateData(userInputs)
    if (inputErrors && inputErrors.fullName && !isLoginMode) return setErrors(inputErrors)
    else if (inputErrors && !isLoginMode) return setErrors(inputErrors)
    setErrors({})
    setLoading(true)
    if (isLoginMode) handleSignIn()
    else handleSignUp()
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  useEffect(() => {
    if (user.isVerified) props.navigation.navigate('Home')
  }, [user.isVerified])

  return (
    <>
      <StackHeader title={isLoginMode ? 'Sign In' : 'Sign Up'} right={<HeaderRightButton />} />
      <View style={[styles.root, themedStyles.bg]}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.container, themedStyles.bg]}>
            {!isLoginMode ? (
              <>
                <Text style={[styles.inputLabel, themedStyles.text]}>Full Name</Text>
                <View style={styles.inputView}>
                  <View style={styles.inputIcon}>
                    <IoniIcons color={theme.colors.secondary} size={wp(5)} name='person' />
                  </View>
                  <TextInput
                    onChangeText={(text) => handleInputChange('fullName', text)}
                    value={userInputs.fullName}
                    selectionColor={theme.colors.secondary}
                    style={[styles.input, themedStyles.text]}
                    returnKeyType='next'
                    placeholder='John Doe'
                    placeholderTextColor='lightgray'
                  />
                </View>
                {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
              </>
            ) : null}
            <Text style={[styles.inputLabel, themedStyles.text]}>Email</Text>
            <View style={styles.inputView}>
              <View style={styles.inputIcon}>
                <IoniIcons color={theme.colors.secondary} size={wp(5)} name='mail' />
              </View>
              <TextInput
                onChangeText={(text) => handleInputChange('email', text)}
                value={userInputs.email}
                keyboardType='email-address'
                selectionColor={theme.colors.secondary}
                style={[styles.input, themedStyles.text]}
                returnKeyType='next'
                placeholder='email@example.com'
                placeholderTextColor='lightgray'
              />
            </View>

            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            <Text style={[styles.inputLabel, themedStyles.text]}>Password</Text>
            <View style={styles.inputView}>
              <View style={styles.inputIcon}>
                <IoniIcons color={theme.colors.secondary} size={wp(5)} name='lock-closed' />
              </View>
              <TextInput
                placeholder='Password'
                onChangeText={(text) => handleInputChange('password', text)}
                value={userInputs.password}
                selectionColor={theme.colors.secondary}
                placeholderTextColor='lightgray'
                style={[styles.input, themedStyles.text]}
              />
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.5}
              style={[
                styles.actionButton,
                { borderColor: theme.colors.light },
                themedStyles.bgSecondary,
                isSuccess ? styles.isSuccess : {}
              ]}
            >
              {loading ? (
                <ActivityIndicator color='white' />
              ) : isSuccess ? (
                <View style={styles.flex}>
                  <CheckSvg fill='white' height={hp(2)} width={hp(2)} />
                </View>
              ) : (
                <Text style={[themedStyles.textLight, styles.actionText]}>{isLoginMode ? 'Sign In' : 'Sign Up'}</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  bgImage: {
    height: hp(88.68),
    width: wp(100),
    resizeMode: 'cover'
  },
  container: {
    padding: hp(2),
    shadowColor: '#000',
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    zIndex: 100
  },
  inputLabel: {
    fontSize: wp(4),
    fontWeight: 'bold'
  },
  input: {
    padding: hp(2),
    color: 'black',
    width: wp(80)
  },
  inputView: {
    display: 'flex',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: hp(1),
    marginBottom: hp(1.5),
    marginTop: hp(2),
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputIcon: {
    width: wp(6),
    marginLeft: wp(2)
  },
  actionButton: {
    paddingVertical: hp(2),
    borderRadius: hp(30),
    marginTop: hp(2),
    borderWidth: 1,
    backgroundColor: 'black',
    width: wp(30),
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0
  },
  actionText: {
    display: 'flex',
    textAlign: 'center'
  },
  orText: {
    textAlign: 'center',
    marginTop: hp(2)
  },
  errorText: {
    color: 'crimson',
    marginBottom: hp(2)
  },
  isSuccess: {
    backgroundColor: '#84e152'
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightButton: {
    padding: wp(2),
    borderRadius: wp(2),
    borderColor: 'black',
    borderWidth: 1
  },
  rightButtonText: {}
})

export { SignIn }
