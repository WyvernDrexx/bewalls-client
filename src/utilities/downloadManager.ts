import RNFetchBlob from 'rn-fetch-blob';

const downloadManager = {
  async downloadFile() {
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
    };
    config(options)
      .fetch(
        'GET',
        'https://images.pexels.com/photos/863963/pexels-photo-863963.jpeg',
      )
      .then(res => {
        if (res.data) {
          console.log('downloaded');
        } else {
          console.log('failed!');
        }
      });
  },
};

export { downloadManager };
