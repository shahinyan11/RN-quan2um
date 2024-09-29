import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import BottomTabBar from './components/BottomTabBar';
import ButtonLogout from '@components/buttons/ButtonLogout';
import {
  ChartsIcon,
  DashboardIcon,
  EcominingIcon,
  ProfileIcon,
  sceneContainerStyle,
  tabBarOptions,
  TransferIcon,
  WalletIcon,
} from './components/BottomTabBar/config';

import {
  charityStackOption,
  charityTabOptions,
  defaultScreenOptions,
  mainScreenOptions,
  ProfileOptions,
  transactionsOptions,
} from './config';

import ProfileNavigation from './ProfileNavigation';
import HistoryNavigation from './HistoryNavigation';
import WithdrawalNavigation from './WithdrawalNavigation';
import TransferNavigation from './TransferNavigation';
import WalletNavigation from './WalletNavigation';
import DashboardNavigation from './DashboardNavigation';

import GTFACode from '@screens/Auth/SignUp/GoogleTFA';
import GTFAEnterCode from '@screens/Auth/SignUp/GoogleTFA/GTFAEnterCode';
import GTFAOneTimeCodes from '@screens/Auth/SignUp/GoogleTFA/GTFAOneTimeCodes';
import Notifications from '@screens/Notifications';
// import Verifications from '@screens/Auth/Verifications';
import {scaledSize} from '@utils/scaledSize';
import RefillNavigation from './RefillNavigation';
import VerificationNavigation from './VerificationNavigation';
import SecurityNavigation from './SecurityNavigation';
import EcominingNavigation from './EcominingNavigation';
import BonusAccountScreen from '@screens/BonusAccountScreen';
import ReferralProgramScreen from '@screens/Profile/ReferralProgramScreen';
import MasternodesScreen from '@screens/Profile/MasternodesScreen';
import ExchangeScreen from '@screens/ExchangeScreen';
import MnTransactionScreen from '@screens/Profile/MnTransactionScreen';
import ExchangeTransactionScreen from '@screens/ExchangeTransactionScreen';
import TransactionFilterScreen from '@screens/Profile/TransactionFilterScreen';
import CharityNav from '@navigation/CharityNav';
import FeesFundsStack from '@navigation/CharityNav/FeesFundsStack';
import FeesPersonalAssistanceStack from '@navigation/CharityNav/FeesPersonalAssistanceStack';
import FeesZakatStack from '@navigation/CharityNav/FeesZakatStack';
import FeesSadakaStack from '@navigation/CharityNav/FeesSadakaStack';
import ProfileFunds from '@screens/Charity/CharityProfile/ProfileFunds';
import ProfilePersonalAssistance from '@screens/Charity/CharityProfile/ProfilePersonalAssistance';
import ProfileZakat from '@screens/Charity/CharityProfile/ProfileZakat';
import ProfileSadaka from '@screens/Charity/CharityProfile/ProfileSadaka';
import MainNavigationIncognito from '@navigation/MainNavigationIncognito';
import {useSelector} from 'react-redux';
import {selectIsAuth} from '@store/auth';
import Market from '@screens/Market';
import TradeViewStack from '@navigation/TradeViewNavigation';

const BottomTab = createBottomTabNavigator();
export const Stack = createStackNavigator();
const TFAStack = createStackNavigator();

const BottomNavigation = () => {
  const {t} = useTranslation();
  return (
    <BottomTab.Navigator
      tabBar={BottomTabBar}
      sceneContainerStyle={sceneContainerStyle}
      tabBarOptions={tabBarOptions}>
      <BottomTab.Screen
        name="Dashboard"
        component={DashboardNavigation}
        options={({route}: any) => {
          const screenName = getFocusedRouteNameFromRoute(route);
          const tabBarVisible = screenName === 'Dashboard' || !screenName;
          return {
            title: t('common.home'),
            tabBarIcon: DashboardIcon,
            tabBarVisible,
          };
        }}
      />

      <BottomTab.Screen
        name="Market"
        component={Market}
        options={{
          title: t('common.market'),
          tabBarIcon: ChartsIcon,
        }}
      />

      <BottomTab.Screen
        name="Ecomining"
        component={EcominingNavigation}
        options={{
          title: 'Ecomining',
          tabBarIcon: EcominingIcon,
        }}
      />
      <BottomTab.Screen
        name="Wallet"
        component={WalletNavigation}
        options={({route}: any) => {
          const screenName = getFocusedRouteNameFromRoute(route);
          const tabBarVisible = screenName === 'Wallet' || !screenName;
          return {
            title: t('common.wallet'),
            tabBarIcon: WalletIcon,
            tabBarVisible,
          };
        }}
      />
      <BottomTab.Screen
        name="Exchange"
        component={ExchangeScreen}
        options={{
          title: t('common.exchange'),
          tabBarIcon: TransferIcon,
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigation}
        options={({route}: any) => {
          const screenName = getFocusedRouteNameFromRoute(route);
          const tabBarVisible = screenName === 'Profile' || !screenName;
          return {
            title: t('common.account'),
            tabBarIcon: ProfileIcon,
            tabBarVisible,
          };
        }}
      />
    </BottomTab.Navigator>
  );
};

const GTFANavigation = () => {
  const defaultOptions = defaultScreenOptions();
  const {t} = useTranslation();

  return (
    <TFAStack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen
        name="GTFACode"
        component={GTFACode}
        options={{
          title: t('cabinet_general.title_2fa'),
          headerRight: ButtonLogout,
          headerRightContainerStyle: {
            marginRight: scaledSize(20),
          },
        }}
      />
      <Stack.Screen
        name="GTFAEnterCode"
        component={GTFAEnterCode}
        options={{
          title: t('cabinet_general.title_2fa'),
        }}
      />
      <Stack.Screen
        name="GTFAOneTimeCodes"
        component={GTFAOneTimeCodes}
        options={{
          title: t('cabinet_general.title_2fa'),
        }}
      />
    </TFAStack.Navigator>
  );
};

export default function MainNavigation({initialScreen = 'Main'}) {
  const {t} = useTranslation();
  const defaultOptions = defaultScreenOptions();
  const isAuth = useSelector(selectIsAuth);

  const {cardStyle} = ProfileOptions();

  return (
    <Stack.Navigator
      screenOptions={mainScreenOptions}
      initialRouteName={initialScreen}>
      <Stack.Screen
        name="Main"
        component={isAuth ? BottomNavigation : MainNavigationIncognito}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="GTFANavigation"
        component={GTFANavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Refill"
        component={RefillNavigation}
        options={{
          ...defaultOptions,
          title: t('common.deposit'),
        }}
      />

      <Stack.Screen
        name="History"
        component={HistoryNavigation}
        options={{
          ...defaultOptions,
          cardStyle: {
            ...defaultOptions.cardStyle,
            paddingHorizontal: 0,
          },
          title: t('common.m_history'),
        }}
      />
      <Stack.Screen
        name="Withdrawal"
        component={WithdrawalNavigation}
        options={{
          ...defaultOptions,
          headerShown: false,
          cardStyle: {
            ...defaultOptions.cardStyle,
            paddingHorizontal: 0,
          },
        }}
      />
      <Stack.Screen
        name="VerificationProfile"
        component={VerificationNavigation}
        options={{
          //title: 'Подтверждение личности',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Transfer"
        component={TransferNavigation}
        options={{
          ...defaultOptions,
          cardStyle: {
            ...defaultOptions.cardStyle,
            paddingHorizontal: 0,
          },

          title: t('common.m_transfer'),
        }}
      />
      <Stack.Screen
        name="Security"
        component={SecurityNavigation}
        options={{
          headerShown: false,
          cardStyle: {
            ...cardStyle,
            paddingHorizontal: 0,
          },
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{...defaultOptions, title: t('header.notifications')}}
      />
      <Stack.Screen
        name="BonusAccountScreen"
        component={BonusAccountScreen}
        options={{...defaultOptions, title: t('common.bonus_account')}}
      />
      <Stack.Screen
        name="ReferralProgramScreen"
        component={ReferralProgramScreen}
        options={{
          ...defaultScreenOptions(),
          title: t('page_meta_tags.referral_title'),
        }}
      />
      <Stack.Screen
        name="MasternodesScreen"
        component={MasternodesScreen}
        options={{
          title: t('common.master_nodes_x10'),
          ...transactionsOptions(),
        }}
      />

      <Stack.Screen
        name="MnTransactionScreen"
        component={MnTransactionScreen}
        options={{
          title: t('common.history_transactions'),
          ...transactionsOptions(),
        }}
      />

      <Stack.Screen
        name="ExchangeTransactionScreen"
        component={ExchangeTransactionScreen}
        options={{
          title: t('common.history_transactions'),
          ...transactionsOptions(),
        }}
      />
      <Stack.Screen
        name="TransactionFilter"
        component={TransactionFilterScreen}
        options={{
          title: t('common.m_filter'),
          headerTitleAlign: 'left',
          ...transactionsOptions(),
        }}
      />

      <Stack.Screen
        name="Charity"
        component={CharityNav}
        options={charityTabOptions}
      />

      <Stack.Screen
        name="FeesFunds"
        component={FeesFundsStack}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="FeesPersonalAssistance"
        component={FeesPersonalAssistanceStack}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="FeesZakat"
        component={FeesZakatStack}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="FeesSadaka"
        component={FeesSadakaStack}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ProfileFunds"
        component={ProfileFunds}
        options={{
          ...charityStackOption,
          headerTitle: t('charity.funds_title'),
        }}
      />
      <Stack.Screen
        name="ProfilePersonalAssistance"
        component={ProfilePersonalAssistance}
        options={{
          ...charityStackOption,
          headerTitle: t('common.personal_assistance'),
        }}
      />
      <Stack.Screen
        name="ProfileZakat"
        component={ProfileZakat}
        options={{
          ...charityStackOption,
          headerTitle: t('common.zakat'),
        }}
      />
      <Stack.Screen
        name="ProfileSadaka"
        component={ProfileSadaka}
        options={{
          ...charityStackOption,
          headerTitle: t('common.sadaka'),
        }}
      />
      <Stack.Screen
        name="TradeViewStack"
        component={TradeViewStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
