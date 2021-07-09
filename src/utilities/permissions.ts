import { PermissionsAndroid } from 'react-native';

const permissions = {
  async askStorage() {
    try {
      const isGranted = await this.isReadWriteStorageGranted();

      if (!isGranted) {
        const write = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            message:
              'For downloading wallpaper, we need storage permissions. Please give us the permission.',
            buttonPositive: "Hmm, Let's go!",
            title: 'BeWalls Download',
            buttonNegative: 'Sorry, but no.',
            buttonNeutral: "I don't know.",
          },
        );
        const read = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            message:
              'For downloading wallpaper, we need storage permissions. Please give us the permission.',
            buttonPositive: "Hmm, Let's go!",
            title: 'BeWalls Download',
          },
        );
        return write === 'granted' && read === 'granted';
      }
      return true;
    } catch (error) {
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
