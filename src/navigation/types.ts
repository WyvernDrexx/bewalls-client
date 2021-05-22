import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Categories: undefined;
};

export type CategoriesScreenProps = StackScreenProps<
  RootStackParamList,
  'Categories'
>;
export type SearchScreenProps = StackScreenProps<RootStackParamList, 'Search'>;
export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
