import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
};

export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
