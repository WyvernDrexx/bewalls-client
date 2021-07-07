import { NativeModules } from 'react-native';

interface IWallpaperModule {
  setWallpaper: (
    uri: string,
    callback: (status: 'success' | 'failed') => void,
  ) => void;
}

const { WallpaperModule } = NativeModules;
export default WallpaperModule as IWallpaperModule;
