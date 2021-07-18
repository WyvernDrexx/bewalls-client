import RNFetchBlob from 'rn-fetch-blob';
import * as MediaLibrary from 'expo-media-library';
import { WallpaperFile } from '../generated/graphql';

const resetProgress = (fn?: (progress: number) => void) => {
  if (typeof fn === 'function') {
    fn(0);
  }
};

const setProgress = (fn?: (progress: number) => void, progress?: number) => {
  if (typeof fn === 'function') {
    if (typeof progress === undefined) fn(100);
    else fn(progress!);
  }
};

const downloadManager = {
  async saveFileToAlbum(
    fileInfo: WallpaperFile,
    progressFn?: (progress: number) => void,
  ) {
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
    const res = await config(options)
      .fetch('GET', fileInfo.uri)
      .progress({ interval: 10 }, (recvd, total) => {
        const progress = Math.round((recvd / total) * 100.0);
        setProgress(progressFn, progress);
      });
    if (res.data) {
      try {
        setProgress(progressFn, 100);
        const asset = await MediaLibrary.createAssetAsync(res.path());
        let album = await MediaLibrary.getAlbumAsync('BeWalls');
        if (album == null) {
          await MediaLibrary.createAlbumAsync('BeWalls', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
        await fs.unlink(res.path());
        resetProgress(progressFn);
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
        resetProgress(progressFn);
        return { error: 'Unable to download the wallpaper!' };
      }
    } else {
      resetProgress(progressFn);
      return { error: 'Unable to download the wallpaper!' };
    }
  },

  async saveFileToCache(
    fileInfo: WallpaperFile,
    progressFn?: (progress: number) => void,
  ) {
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
    const res = await config(options)
      .fetch('GET', fileInfo.uri)
      .progress({ interval: 2 }, (recvd, total) => {
        const progress = Math.round((recvd / total) * 100);
        setProgress(progressFn, progress);
      });
    if (res.data) {
      try {
        setProgress(progressFn, 100);
        return { cacheUri: res.path() };
      } catch (error) {
        resetProgress(progressFn);
        return { error: 'Unable to download the wallpaper!' };
      }
    } else {
      resetProgress(progressFn);
      return { error: 'Unable to download the wallpaper!' };
    }
  },
};

export { downloadManager };
