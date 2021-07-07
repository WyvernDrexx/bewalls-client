import RNFetchBlob from 'rn-fetch-blob';
import * as MediaLibrary from 'expo-media-library';
import { WallpaperFile } from '../generated/graphql';

const downloadManager = {
  async saveFileToAlbum(fileInfo: WallpaperFile) {
    const { config, fs } = RNFetchBlob;
    const perm = await MediaLibrary.getPermissionsAsync();
    if (!perm.granted) {
      return {
        message: 'Please give us the required storage permission to download.',
      };
    }
    const path =
      fs.dirs.CacheDir + '/' + fileInfo.filename + '.' + fileInfo.extension;
    let options = {
      fileCache: true,
      appendExt: fileInfo.extension,
      path,
    };
    const res = await config(options).fetch('GET', fileInfo.uri);
    if (res.data) {
      try {
        const asset = await MediaLibrary.createAssetAsync(res.path());
        let album = await MediaLibrary.getAlbumAsync('BeWalls');
        if (album == null) {
          await MediaLibrary.createAlbumAsync('BeWalls', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
        await fs.unlink(res.path());
        return {
          message: 'Wallpaper downloaded to Pictures/BeWalls.',
          fileUri:
            fs.dirs.PictureDir +
            '/BeWalls/' +
            fileInfo.filename +
            '.' +
            fileInfo.extension,
        };
      } catch (error) {
        return { error: 'Unable to download the wallpaper!' };
      }
    } else {
      return { error: 'Unable to download the wallpaper!' };
    }
  },

  async saveFileToCache(fileInfo: WallpaperFile) {
    const { config, fs } = RNFetchBlob;
    const perm = await MediaLibrary.getPermissionsAsync();
    if (!perm.granted) {
      return {
        message: 'Please give us the required storage permission to download.',
      };
    }
    const path =
      fs.dirs.CacheDir + '/' + fileInfo.filename + '.' + fileInfo.extension;
    let options = {
      fileCache: true,
      appendExt: fileInfo.extension,
      path,
    };
    const res = await config(options).fetch('GET', fileInfo.uri);
    if (res.data) {
      try {
        return { cacheUri: res.path() };
      } catch (error) {
        return { error: 'Unable to download the wallpaper!' };
      }
    } else {
      return { error: 'Unable to download the wallpaper!' };
    }
  },
};

export { downloadManager };
