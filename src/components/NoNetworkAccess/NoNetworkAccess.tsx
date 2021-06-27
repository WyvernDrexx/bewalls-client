import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { hp } from '../../utilities';

type NoNetworkAceessProps = {};

const NoNetworkAceess: React.FC<NoNetworkAceessProps> = function (props) {
  const netInfo = useNetInfo();

  if (!netInfo.isInternetReachable || !netInfo.isConnected)
    return (
      <View style={styles.root}>
        <Text>No Network Access</Text>
      </View>
    );

  return <>{props.children}</>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    height: hp(90),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NoNetworkAceess;
