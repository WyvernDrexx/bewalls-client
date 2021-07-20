import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import StackHeader from '../../components/StackHeader';
import {
  useUpdateUserMutation,
  useUploadProfileImageMutation,
} from '../../generated/graphql';
import { useAlerts, useTheme, useUser } from '../../hooks';
import { ProfileScreenProps } from '../../navigation/types';
import { useAppDispatch } from '../../store';
import { setToken } from '../../store/user';
import { hp, InputErrors, verifyInput, wp } from '../../utilities';
import ProfileSvg from './profile.svg';
import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid } from 'react-native';
import { ReactNativeFile } from 'apollo-upload-client';

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
  const [mutate, {}] = useUploadProfileImageMutation({
    onError: err => {
      console.log(err);
    },
  });
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleProfileImageChange = async () => {
    try {
      const pick = await DocumentPicker.pick({
        type: ['image/*'],
        copyTo: 'cachesDirectory',
      });
      const stat = await RNFetchBlob.fs.stat(pick.uri);
      const fileInfo = {
        uri: 'file://' + stat.path,
        type: stat.type,
        name: stat.filename,
      };
      const file = new ReactNativeFile(fileInfo);
      console.log('file', file);
      try {
        mutate({
          variables: {
            file,
          },
        });
      } catch (error) {}
    } catch (error) {
      console.log(...error);
    }
  };

  const uploadImage = async () => {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      console.log('res', result);
      const pick = await DocumentPicker.pick({
        type: ['image/jpeg'],
        copyTo: 'cachesDirectory',
      });
      const stat = await RNFetchBlob.fs.stat(pick.uri);
      const data = new FormData();
      const fileInfo = {
        uri: 'file://' + stat.path,
        type: 'image/jpeg',
        name: 'image.jpg',
      };
      data.append('name', 'image.jpg');
      data.append('file', fileInfo);
      console.log('fileInfo', fileInfo);
      let res = await fetch('http://localhost:4000/upload/user/profile/image', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data;',
          Accept: 'application/json',
        },
      });
      let responseJson = await res.json();
      console.log(responseJson);
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
        <View style={styles.profileImage}>
          <ProfileSvg
            height={wp(25)}
            width={wp(25)}
            fill={theme.colors.secondary}
          />
          <TouchableOpacity onPress={uploadImage}>
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
  profileImage: {
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
});
