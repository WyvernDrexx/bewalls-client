import { StyleSheet } from 'react-native';
import { useAppSelector } from '../store';

function useThemeStyles() {
  const colors = useAppSelector(state => state.theme.colors);
  return StyleSheet.create({
    bg: {
      backgroundColor: colors.primary,
    },
    text: {
      color: colors.secondary,
    },
    bgAndText: {
      backgroundColor: colors.primary,
      color: colors.secondary,
    },
    bgSecondary: {
      backgroundColor: colors.secondary,
    },
    textLight: {
      color: colors.light,
    },
    bgLight: {
      backgroundColor: colors.light,
    },
    textDark: {
      color: colors.dark,
    },
    bgDark: {
      backgroundColor: colors.dark,
    },
  });
}

export { useThemeStyles };
