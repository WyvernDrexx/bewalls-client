import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import StackHeader from '../../components/StackHeader';
import { useUpdateUserMutation } from '../../generated/graphql';
import { useAlerts, useLocal, useTheme, useUser } from '../../hooks';
import { ProfileScreenProps } from '../../navigation/types';
import { useAppDispatch } from '../../store';
import { updateProfileImageUri } from '../../store/local';
import { setToken } from '../../store/user';
import { hp, InputErrors, verifyInput, wp } from '../../utilities';
import ProfileSvg from './profile.svg';

type ProfileForm = {
  fullName: string;
  email: string;
};

const Profile: React.FC<ProfileScreenProps> = props => {
  const { themedStyles, theme } = useTheme();
  const user = useUser();
  const [form, setForm] = useState<ProfileForm>({ fullName: '', email: '' });
  const [formErrors, setFormErrors] = useState<InputErrors>({});
  const [hasInfoChanged, setHasInfoChanged] = useState(false);
  const { dispatchShowAlert } = useAlerts();
  const dispatch = useAppDispatch();
  const localState = useLocal();
  console.log(localState);
  const [updateUser] = useUpdateUserMutation({
    onCompleted: data => {
      if (data && data.updateUser && data.updateUser) {
        dispatch(setToken(data.updateUser));
        dispatchShowAlert({ success: 'Profile successfully updated!' });
        props.navigation.goBack();
      }
    },
    onError: () => {
      dispatchShowAlert({ error: 'Unknown error encountered!' });
    },
  });
  const handleSave = async () => {
    Keyboard.dismiss();
    const err = verifyInput(form);
    if (err) {
      return setFormErrors(err);
    }
    await updateUser({
      variables: {
        data: form,
      },
    });
  };

  const handleProfileImageChange = async () => {
    try {
      const pick = await DocumentPicker.pick({
        type: ['image/*'],
        copyTo: 'documentDirectory',
      });
      dispatch(updateProfileImageUri(pick.fileCopyUri));
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (target: keyof ProfileForm, value: string) => {
    setForm({ ...form, [target]: value });
  };

  useEffect(() => {
    if (user.info) {
      setForm({ fullName: user.info.fullName, email: user.info.email });
    }
  }, [user.info]);

  useEffect(() => {
    if (form.email !== user.info?.email) {
      return setHasInfoChanged(true);
    }
    if (form.fullName !== user.info?.fullName) {
      return setHasInfoChanged(true);
    }
    setHasInfoChanged(false);
  }, [form.email, form.fullName]);

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <StackHeader
        title="Profile"
        right={
          hasInfoChanged ? (
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />
      <View style={styles.container}>
        <View style={styles.profile}>
          {localState.profileImageUri ? (
            <Image
              style={styles.profileImage}
              source={{ uri: localState.profileImageUri }}
            />
          ) : (
            <ProfileSvg
              height={wp(25)}
              width={wp(25)}
              fill={theme.colors.secondary}
            />
          )}
          <TouchableOpacity onPress={handleProfileImageChange}>
            <Text style={[styles.text, styles.profileChangeText]}>
              Change Profile Picture
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileForm}>
          <Text style={[styles.inputLabel, themedStyles.text]}>Full Name</Text>
          <View style={styles.inputView}>
            <TextInput
              onChangeText={text => handleInputChange('fullName', text)}
              value={form.fullName}
              selectionColor="gray"
              style={styles.input}
              returnKeyType="next"
              placeholderTextColor="lightgray"
            />
          </View>

          {formErrors.fullName ? (
            <Text style={styles.errorText}>{formErrors.fullName}</Text>
          ) : null}
          <Text style={[styles.inputLabel, themedStyles.text]}>Email</Text>
          <View style={styles.inputView}>
            <TextInput
              onChangeText={text => handleInputChange('email', text)}
              value={form.email}
              keyboardType="email-address"
              selectionColor="gray"
              style={styles.input}
              returnKeyType="next"
              placeholderTextColor="lightgray"
            />
          </View>

          {formErrors.email ? (
            <Text style={styles.errorText}>{formErrors.email}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export { Profile };

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: wp(2),
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(6),
  },
  profileChangeText: {
    marginTop: hp(2),
  },
  text: {
    color: '#4babff',
    fontWeight: 'bold',
    fontSize: wp(4),
  },
  blue: {
    color: '#4babff',
  },
  profileForm: {},
  inputLabel: {
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  input: {
    padding: hp(2),
    color: 'black',
    width: wp(80),
  },
  inputView: {
    display: 'flex',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: hp(1),
    marginBottom: hp(1.5),
    marginTop: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: 'crimson',
    marginBottom: hp(2),
  },
  profileImage: {
    height: wp(25),
    width: wp(25),
    borderRadius: wp(50),
    backgroundColor: 'black',
  },
});
