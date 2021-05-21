import { useAppSelector } from '../store';

function useTheme() {
  const theme = useAppSelector(state => state.theme);
  return theme;
}

export { useTheme };
