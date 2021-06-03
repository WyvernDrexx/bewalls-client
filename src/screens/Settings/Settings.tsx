import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import MountAnimatedView from '../../components/MountAnimatedView';

import StackHeader from '../../components/StackHeader';

import { useTheme } from '../../hooks';
import { SettingsScreenProps } from '../../navigation/types';

const Settings: React.FC<SettingsScreenProps> = function (props) {
  const [themeStyles, { colors }] = useTheme();
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  return (
    <MountAnimatedView>
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
    </MountAnimatedView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: widthPercentageToDP(4),
  },
  optionsView: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: heightPercentageToDP(4),
  },
  optionsText: {
    fontSize: heightPercentageToDP(2.3),
    fontWeight: 'bold',
  },
  subText: {
    width: widthPercentageToDP(60),
    fontSize: heightPercentageToDP(1.5),
    color: '#B2B2B2',
  },
  versionText: {
    fontSize: heightPercentageToDP(2.3),
    color: '#B2B2B2',
  },
  header: {
    paddingHorizontal: widthPercentageToDP(2),
  },
});

export { Settings };
