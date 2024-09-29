import React from 'react';

import Icon from '@components/icons/Icon';
import {BottomTabBarOptions} from '@react-navigation/bottom-tabs';
import EStyleSheet from 'react-native-extended-stylesheet';

interface IIcon {
  focused: boolean;
  color: string;
  size: number;
}

export const DashboardIcon = ({focused, color, size}: IIcon) => (
  <Icon
    name={'dashboard'}
    size={size}
    color={focused ? '#02AFFB' : undefined}
  />
);

export const LoginIcon = ({color, size}: IIcon) => (
  <Icon name={'login'} size={size} color={color} />
);

export const TransferIcon = ({focused, size}: IIcon) => (
  <Icon name={'transfer'} size={size} color={focused ? '#02AFFB' : undefined} />
);

export const EcominingIcon = ({focused, size}: IIcon) => (
  <Icon
    name={'ecomining'}
    size={size}
    color={focused ? '#02AFFB' : '#00D89D'}
  />
);

export const WalletIcon = ({focused, size}: IIcon) => (
  <Icon name={'wallet'} size={size} color={focused ? '#02AFFB' : undefined} />
);

export const ProfileIcon = ({focused, size}: IIcon) => (
  <Icon
    name={'user-outline'}
    size={size}
    color={focused ? '#02AFFB' : undefined}
  />
);

export const ChartsIcon = ({focused, size}: IIcon) => (
  <Icon name={'chart'} size={size} color={focused ? '#02AFFB' : undefined} />
);

export const tabBarOptions: BottomTabBarOptions = {
  activeTintColor: EStyleSheet.value('$primaryMain'),
  inactiveTintColor: 'white',
};

export const sceneContainerStyle = {
  backgroundColor: EStyleSheet.value('$darkBackground'),
};
