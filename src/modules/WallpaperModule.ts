import { NativeModules } from 'react-native';

interface IWallpaperModule {
  setWallpaper: (
    uri: string,
    destination: number,
    width: number,
    height: number,
    callback: (status: 'success' | 'failed') => void,
  ) => void;
}

const { WallpaperModule } = NativeModules;
export default WallpaperModule as IWallpaperModule;
