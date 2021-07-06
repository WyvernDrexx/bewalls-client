import { NativeModules } from 'react-native';

interface IWallpaperModule {
  setWallpaper: () => void;
}

const { WallpaperModule } = NativeModules;
export default WallpaperModule as IWallpaperModule;
