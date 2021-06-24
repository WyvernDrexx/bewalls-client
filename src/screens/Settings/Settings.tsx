import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

import StackHeader from '../../components/StackHeader';

import { useTheme, useUser } from '../../hooks';
import { hp, wp } from '../../utilities';

import { SettingsScreenProps } from '../../navigation/types';
import { useAppDispatch } from '../../store';
import { userLogOut } from '../../store/user';
import tokenStorage from '../../utilities/tokenStorage';

const Settings: React.FC<SettingsScreenProps> = function (props) {
  const {
    themedStyles,
    theme: { colors },
  } = useTheme();
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const dispatch = useAppDispatch();
  const user = useUser();

  const handleUserLogout = async () => {
    await tokenStorage.deleteToken();
    dispatch(userLogOut());
    props.navigation.navigate('Home');
  };

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <StackHeader
        title="Settings"
        titlePosition="left"
        onLeftClick={props.navigation.goBack}
        viewStyle={styles.header}
      />
      <View style={styles.optionsView}>
        <Text style={[themedStyles.text, styles.optionsText]}>
          Enable Notification
        </Text>
        <Switch
          trackColor={{
            true: colors.light,
            false: colors.light,
          }}
          thumbColor={notificationEnabled ? '#0090FF' : colors.light}
          value={notificationEnabled}
          onValueChange={() => setNotificationEnabled(!notificationEnabled)}
        />
      </View>
      <Text style={[styles.subText]}>
        Receive updates whenever a new wallpaper is added.
      </Text>

      <View style={styles.optionsView}>
        <Text style={[themedStyles.text, styles.optionsText]}>Contact Us</Text>
      </View>
      <View style={styles.optionsView}>
        <Text style={[themedStyles.text, styles.optionsText]}>
          Privacy Policy
        </Text>
      </View>
      <View style={styles.optionsView}>
        <Text style={[themedStyles.text, styles.optionsText]}>
          Current Version
        </Text>
        <Text style={styles.versionText}>V1.2.8</Text>
      </View>
      {user.isVerified ? (
        <TouchableOpacity onPress={handleUserLogout} style={styles.optionsView}>
          <Text style={[styles.optionsText, styles.warningText]}>LogOut</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  optionsView: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: hp(4),
  },
  optionsText: {
    fontSize: hp(2.3),
    fontWeight: 'bold',
  },
  subText: {
    width: wp(60),
    fontSize: hp(1.5),
    color: '#B2B2B2',
  },
  versionText: {
    fontSize: hp(2.3),
    color: '#B2B2B2',
  },
  header: {
    paddingHorizontal: wp(2),
  },
  warningText: {
    color: 'crimson',
  },
});

export { Settings };
