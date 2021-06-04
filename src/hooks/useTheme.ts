import { StyleSheet } from 'react-native';
import { useAppSelector } from '../store';
import { ThemeState } from '../store/theme/themeSlice';

type ThemeStyle = {
  bg: {
    backgroundColor: string;
  };
  text: {
    color: string;
  };
  bgAndText: {
    backgroundColor: string;
    color: string;
  };
  bgSecondary: {
    backgroundColor: string;
  };
  textLight: {
    color: string;
  };
  bgLight: {
    backgroundColor: string;
  };
  textDark: {
    color: string;
  };
  bgDark: {
    backgroundColor: string;
  };
};

function useTheme(): { themedStyles: ThemeStyle; theme: ThemeState } {
  const theme = useAppSelector(state => state.theme);
  const themedStyles = StyleSheet.create({
    bg: {
      backgroundColor: theme.colors.primary,
    },
    text: {
      color: theme.colors.secondary,
    },
    bgAndText: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondary,
    },
    bgSecondary: {
      backgroundColor: theme.colors.secondary,
    },
    textLight: {
      color: theme.colors.light,
    },
    bgLight: {
      backgroundColor: theme.colors.light,
    },
    textDark: {
      color: theme.colors.dark,
    },
    bgDark: {
      backgroundColor: theme.colors.dark,
    },
  });

  return { themedStyles, theme };
}

export { useTheme };
