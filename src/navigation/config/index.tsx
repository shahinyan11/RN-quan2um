import React from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';
import EStyleSheet, {ViewStyle} from 'react-native-extended-stylesheet';
import {StyleProp, Text, TouchableOpacity} from 'react-native';
import i18n from 'i18next';

import ButtonBack from '../components/ButtonBack';
import {t4, Ub_reg_24} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';
import {isIos} from '@constants/deviceInfo';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Info} from '@assets/svgs';
import {showModal} from '@store/modal';
import {store} from '@store/index';

export const tabSceneContainerStyle = {
  padding: scaledSize(16),
  backgroundColor: EStyleSheet.value('$darkBackground'),
};

export const defaultScreenOptions = (): StackNavigationOptions => {
  const $blackBackground = EStyleSheet.value('$blackBackground');
  return {
    cardStyle: {
      backgroundColor: $blackBackground,
      paddingHorizontal: scaledSize(16),
    },
    headerStyle: {
      backgroundColor: $blackBackground,
      shadowRadius: 0,
      elevation: 0,
      shadowColor: 'transparent',
    },
    headerRightContainerStyle: {
      paddingRight: isIos ? scaledSize(16) : 0,
    },
    headerLeftContainerStyle: {
      paddingLeft: isIos ? scaledSize(16) : 0,
    },
    headerTitleAlign: 'center',
    headerTitleStyle: {
      ...t4,
      color: 'white',
    },
    headerLeft: props => <ButtonBack {...props} />,
  };
};

export const TransferTabOptions = (): StyleProp<ViewStyle> => {
  const $darkBackground = EStyleSheet.value('$darkBackground');

  return {
    backgroundColor: $darkBackground,
  };
};

export const authScreenOptions = (): StackNavigationOptions => {
  const defaultOptions = defaultScreenOptions();
  return {
    ...defaultOptions,
    title: '',
    cardStyle: {
      ...defaultOptions.cardStyle,
    },
  };
};

export const mainScreenOptions = (): StackNavigationOptions => {
  const $darkBackground = EStyleSheet.value('$darkBackground');
  return {
    cardStyle: {
      backgroundColor: $darkBackground,
    },
  };
};

export const refillScreenOptions = (): StackNavigationOptions => {
  const defaultOptions = defaultScreenOptions();
  return {
    ...defaultOptions,
  };
};

export const walletScreenOptions = (): StackNavigationOptions => {
  const defaultOptions = defaultScreenOptions();
  return {
    ...defaultOptions,
    title: '',
    cardStyle: {
      ...defaultOptions.cardStyle,
    },
  };
};

export const AuthOptions = (): StackNavigationOptions => {
  const $darkBackground = EStyleSheet.value('$darkBackground');
  return {
    headerShown: false,
    cardStyle: {
      backgroundColor: $darkBackground,
    },
  };
};

export const withdrawalScreenOptions = (): StackNavigationOptions => {
  const $darkBackground = EStyleSheet.value('$darkBackground');
  return {
    cardStyle: {
      backgroundColor: $darkBackground,
    },
  };
};

export const ProfileOptions = (): StackNavigationOptions => {
  const options = defaultScreenOptions();

  return {
    ...options,
  };
};

export const DepositOptions = (): StackNavigationOptions => {
  const options = defaultScreenOptions();

  return {
    ...options,
  };
};

export const SecurityOptions = (): StackNavigationOptions => {
  const options = defaultScreenOptions();

  return {
    ...options,
  };
};

export const VerificationOptions = (): StackNavigationOptions => {
  const options = defaultScreenOptions();

  return {
    ...options,
    title: i18n.t('cabinet_general.title_verify'),
  };
};

export const RefillFiatOptions = (): StackNavigationOptions => {
  const options = defaultScreenOptions();

  return {
    ...options,
    headerShown: false,
    cardStyle: {
      ...options.cardStyle,
      paddingHorizontal: 0,
    },
  };
};

export const RefillFiatMainOptions = (): StackNavigationOptions => {
  const options = defaultScreenOptions();

  return {
    ...options,
    headerShown: false,
    cardStyle: {
      ...options.cardStyle,
      paddingHorizontal: 0,
    },
    gestureEnabled: false,
    animationEnabled: false,
  };
};

export const EcominingOptions = (): StackNavigationOptions => {
  const options = defaultScreenOptions();

  return {
    ...options,
    headerShown: true,
    cardStyle: {
      ...options.cardStyle,
      paddingHorizontal: 0,
    },
    gestureEnabled: true,
    animationEnabled: true,
  };
};

export const TradeViewOptions = (): StackNavigationOptions => {
  const options = defaultScreenOptions();

  return {
    ...options,
  };
};

export const transactionsOptions = (): StackNavigationOptions => {
  const $darkBackground = EStyleSheet.value('$darkBackground');
  return {
    cardStyle: {
      backgroundColor: $darkBackground,
      paddingBottom: scaledSize(16),
      paddingHorizontal: scaledSize(20),
    },
    headerStyle: {
      elevation: 0,
      shadowRadius: 0,
      shadowColor: 'transparent',
      backgroundColor: $darkBackground,
    },
    headerRightContainerStyle: {
      paddingRight: isIos ? scaledSize(20) : 0,
    },
    headerLeftContainerStyle: {
      paddingLeft: isIos ? scaledSize(20) : 0,
    },
    headerTitleAlign: 'left',
    headerTitleStyle: {
      ...t4,
      color: 'white',
    },
    headerLeft: props => <ButtonBack {...props} />,
  };
};

export const ordersOptions = {
  backgroundColor: EStyleSheet.value('$darkBackground'),
};

export const charityTabOptions = ({route}: any): StackNavigationOptions => {
  const getHeader = (_route: any): any => {
    const routeName = getFocusedRouteNameFromRoute(_route) ?? 'CharityFees';

    const onFeesIconPress = () => {
      store.dispatch(
        showModal({
          modalType: 'INFO_CHARITY',
        }),
      );
    };

    const onProfileIconPress = () => {};

    switch (routeName) {
      case 'CharityFees':
        return {
          headerTitle: i18n.t('common.charity'),
          headerRight: () => (
            <TouchableOpacity onPress={onFeesIconPress}>
              <Info size={20} color={'black'} />
            </TouchableOpacity>
          ),
        };
      case 'CharityProfile':
        return {
          headerTitle: '',
          headerLeft: () => (
            <Text
              style={{
                ...Ub_reg_24,
                fontWeight: '500',
              }}>
              {i18n.t('common.profile')}
            </Text>
          ),
          // headerRight: () => (
          //   <TouchableOpacity onPress={onProfileIconPress}>
          //     <Info size={20} color={'black'} />
          //   </TouchableOpacity>
          // ),
        };
    }
  };

  return {
    headerStyle: {
      elevation: 0,
      shadowRadius: 0,
      shadowColor: 'transparent',
    },
    headerRightContainerStyle: {
      paddingRight: scaledSize(16),
    },
    headerLeftContainerStyle: {
      paddingLeft: scaledSize(16),
    },
    headerTitleAlign: 'center',
    headerTitleStyle: {
      ...t4,
      color: 'black',
    },
    headerLeft: props => <ButtonBack {...props} iconColor={'black'} />,
    ...getHeader(route),
  };
};

export const charityStackOption: StackNavigationOptions = {
  headerStyle: {
    shadowColor: 'transparent',
  },
  headerTitle: '',

  headerRightContainerStyle: {
    paddingRight: isIos ? scaledSize(16) : 0,
  },
  headerLeftContainerStyle: {
    paddingLeft: scaledSize(20),
  },
  cardStyle: {
    backgroundColor: 'white',
  },

  headerLeft: props => <ButtonBack {...props} iconColor={'black'} />,
};

export const dashboardOptions = (): StackNavigationOptions => {
  const $darkBackground = EStyleSheet.value('$darkBackground');

  return {
    headerShown: false,
    cardStyle: {
      backgroundColor: $darkBackground,
    },
  };
};
