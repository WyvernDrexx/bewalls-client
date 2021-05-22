import { StackScreenProps } from '@react-navigation/stack';

type SelectionParams = {
  select: string;
};

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Categories: undefined;
  Selection: SelectionParams;
};

export type SearchScreenProps = StackScreenProps<RootStackParamList, 'Search'>;
export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type SelectionScreenProps = StackScreenProps<
  RootStackParamList,
  'Selection'
>;
export type CategoriesScreenProps = StackScreenProps<
  RootStackParamList,
  'Categories'
>;
