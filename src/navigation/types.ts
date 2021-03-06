import { StackScreenProps } from '@react-navigation/stack';
import { ItemGroup } from '../types';

type SelectionParams = {
  title: string;
  group: ItemGroup;
  groupId: string;
};

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Categories: undefined;
  Selection: SelectionParams;
  Settings: undefined;
  Bundles: undefined;
  SignIn: undefined;
  ContactUs: undefined;
  Favourites: undefined;
  Profile: undefined;
  Trending: undefined;
};

export type TrendingScreenProps = StackScreenProps<RootStackParamList, 'Trending'>
export type SearchScreenProps = StackScreenProps<RootStackParamList, 'Search'>;
export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type SignInScreenProps = StackScreenProps<RootStackParamList, 'SignIn'>;
export type FavouritesScreenProps = StackScreenProps<
  RootStackParamList,
  'Favourites'
>;
export type ContactUsScreenProps = StackScreenProps<
  RootStackParamList,
  'ContactUs'
>;
export type SelectionScreenProps = StackScreenProps<
  RootStackParamList,
  'Selection'
>;
export type CategoriesScreenProps = StackScreenProps<
  RootStackParamList,
  'Categories'
>;
export type SettingsScreenProps = StackScreenProps<
  RootStackParamList,
  'Settings'
>;
export type BundlesScreenProps = StackScreenProps<
  RootStackParamList,
  'Bundles'
>;
export type ProfileScreenProps = StackScreenProps<
  RootStackParamList,
  'Profile'
>;
