import * as MediaLibrary from 'expo-media-library'
import RNFetchBlob from 'rn-fetch-blob'
import { WallpaperFile } from '../generated/graphql'

const resetProgress = (fn?: (progress: number) => void) => {
  if (typeof fn === 'function') {
    fn(0)
  }
}

const setProgress = (fn?: (progress: number) => void, progress?: number) => {
  if (typeof fn === 'function') {
    if (typeof progress === undefined) fn(100)
    else fn(progress!)
  }
}

const downloadManager = {
  async saveFileToAlbum(fileInfo: WallpaperFile, progressFn?: (progress: number) => void) {
    const { config, fs } = RNFetchBlob
    let PictureDir = fs.dirs.PictureDir
    const perm = await MediaLibrary.getPermissionsAsync()
    if (!perm.granted) {
      return {
        message: 'Please give us the required storage permission to download.'
      }
    }
    const path = PictureDir + '/BeWalls/' + fileInfo.filename
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path,
        description: 'Image'
      }
    }
    progressFn && progressFn(1)
    // downloadImage(fileInfo, progressFn)
    const res = await config(options).fetch('GET', fileInfo.uri)
    if (res.data) {
      try {
        resetProgress(progressFn)
        return {
          message: 'Wallpaper downloaded to Pictures/BeWalls.',
          fileUri: path
        }
      } catch (error) {
        resetProgress(progressFn)
        return { error: 'Unable to download the wallpaper!' }
      }
    } else {
      resetProgress(progressFn)
      return { error: 'Unable to download the wallpaper!' }
    }
  },

  async saveFileToCache(fileInfo: WallpaperFile, progressFn?: (progress: number) => void) {
    const { config, fs } = RNFetchBlob
    const perm = await MediaLibrary.getPermissionsAsync()
    if (!perm.granted) {
      return {
        message: 'Please give us the required storage permission to download.'
      }
    }
    const path = fs.dirs.CacheDir + '/' + fileInfo.filename + '.' + fileInfo.extension
    let options = {
      fileCache: true,
      appendExt: fileInfo.extension,
      path
    }
    const res = await config(options)
      .fetch('GET', fileInfo.uri)
      .progress({ interval: 2 }, (recvd, total) => {
        const progress = Math.round((recvd / total) * 100)
        setProgress(progressFn, progress)
      })
    if (res.data) {
      try {
        setProgress(progressFn, 100)
        return { cacheUri: res.path() }
      } catch (error) {
        resetProgress(progressFn)
        return { error: 'Unable to download the wallpaper!' }
      }
    } else {
      resetProgress(progressFn)
      return { error: 'Unable to download the wallpaper!' }
    }
  }
}

export { downloadManager }
