import { useState } from 'react';
import { Wallpaper } from '../generated/graphql';

const useWallpaperView = () => {
  const [wallpaper, setWallpaper] = useState<null | Wallpaper>(null);
  return { wallpaper, setWallpaper };
};

export { useWallpaperView };
