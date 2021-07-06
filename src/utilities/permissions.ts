import { PermissionsAndroid } from 'react-native';

const permissions = {
  async askStorage(): Promise<'GRANTED' | 'NOT_GRANTED' | null> {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
      const write =
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted';
      const read =
        granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted';
      return write && read ? 'GRANTED' : 'NOT_GRANTED';
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async isReadWriteStorageGranted() {
    try {
      const read = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      const write = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      return read && write;
    } catch (error) {
      return null;
    }
  },
};

export { permissions };
