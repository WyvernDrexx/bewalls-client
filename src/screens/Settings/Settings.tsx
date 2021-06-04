import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import StackHeader from '../../components/StackHeader';

import { useTheme } from '../../hooks';
import { SettingsScreenProps } from '../../navigation/types';
import { hp, wp } from '../../utilities';

const Settings: React.FC<SettingsScreenProps> = function (props) {
  const [themeStyles, { colors }] = useTheme();
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  return (
    <View style={[styles.root, themeStyles.bg]}>
      <StackHeader
        title="Settings"
        onLeftClick={props.navigation.goBack}
        viewStyle={styles.header}
      />
      <View style={styles.optionsView}>
        <Text style={[themeStyles.text, styles.optionsText]}>
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
        <Text style={[themeStyles.text, styles.optionsText]}>Contact Us</Text>
      </View>
      <View style={styles.optionsView}>
        <Text style={[themeStyles.text, styles.optionsText]}>
          Privacy Policy
        </Text>
      </View>
      <View style={styles.optionsView}>
        <Text style={[themeStyles.text, styles.optionsText]}>
          Current Version
        </Text>
        <Text style={styles.versionText}>V1.2.8</Text>
      </View>
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
});

export { Settings };
