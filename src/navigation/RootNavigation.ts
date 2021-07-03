import { NavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef>();

const navigation = navigationRef.current;
export { navigation };
