export type ScreenProps = {
  id: string | number;
};

export type WallpaperType = {
  title: string;
  imageUri?: string;
  imageSource?: object;
  id: string;
  brand: string;
  height: number;
  width: number;
  sizeInKB: number;
  tags: string[];
  publisher: string;
  createdAt: object | number;
  likes: number;
  downloads: number;
};

export type ItemGroup = 'bundle' | 'category' | 'color' | 'none' | 'tag';

/*

myWallpaper:WallpaperType = {
  title: "Flames",
  imageUri: 'https://image.uri.com/image.jpg',
  id: '1ecdaf-dfee34',
  brand: 'OnePlus 7',
  height: 3890,
  width: 1080,
  sizeInKB: 3200,
  tags: ['OnePlus', 'Dark', 'Fire'],
  author: 'AndroCrunch',
  createdAt: object
}
*/
