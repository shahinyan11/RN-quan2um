import React from 'react';
import {
  ChartIcon,
  ChartOutline,
  DashboardIcon,
  DashboardOutline,
  EcominingFilledTree,
  EcominingTreeIcon,
  Login,
  TransferIcon,
  TransferOutline,
  User,
  UserOutlineIcon,
  WalletIcon,
  WalletOutline,
} from '@assets/svgs/menu';

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Checkbox,
  Minus,
  Play,
  Refresh,
  Stop,
} from '@assets/svgs/actions';
import {Apple, Facebook, Google, Logo} from '@assets/svgs/social';
import {
  AccountType,
  Alert,
  BellNotificationIcon,
  BigWarningIcon,
  BlankLink,
  Box,
  ChartScreen,
  ChartVertical,
  Check,
  Close,
  CloseSmall,
  Comment,
  Copy,
  CreditCard,
  Crown,
  Delete,
  Devices,
  Dots,
  DriverLicense,
  Error,
  Eye,
  EyeClosed,
  Fees,
  File,
  Fingerprint,
  HandsIcon,
  Headphones,
  History,
  IDCard,
  IDPassport,
  Info,
  Lock,
  Logout,
  Monitors,
  News,
  NoNetwork,
  Passport,
  Pencil,
  Plus,
  PutIn,
  PutOut,
  QrScanner,
  Quatum,
  Questionmark,
  SearchIcon,
  Settings,
  Shield,
  TradeArrow,
} from '@assets/svgs/others';

import {
  CurrencyBitcoin,
  CurrencyEthereum,
  CurrencyEUR,
  CurrencyLitecoin,
  CurrencyRipple,
  CurrencyTether,
  CurrencyUSD,
} from '@assets/svgs/currency';
import {IconProps} from '@components/icons/Icon/types';

export default function BaseIcon(props: IconProps) {
  switch (props.name) {
    case 'dashboard-outline': {
      return <DashboardOutline {...props} />;
    }
    case 'chart-outline': {
      return <ChartOutline {...props} />;
    }
    case 'transfer-outline': {
      return <TransferOutline {...props} />;
    }
    case 'wallet-outline': {
      return <WalletOutline {...props} />;
    }
    case 'ecomining-filled': {
      return <EcominingFilledTree {...props} />;
    }
    case 'user-outline': {
      return <UserOutlineIcon {...props} />;
    }
    case 'dashboard': {
      return <DashboardIcon {...props} />;
    }
    case 'chart': {
      return <ChartIcon {...props} />;
    }
    case 'transfer': {
      return <TransferIcon {...props} />;
    }
    case 'wallet': {
      return <WalletIcon {...props} />;
    }
    case 'ecomining': {
      return <EcominingTreeIcon {...props} />;
    }
    case 'user': {
      return <User {...props} />;
    }
    case 'arrow-down': {
      return <ArrowDown {...props} />;
    }
    case 'arrow-up': {
      return <ArrowUp {...props} />;
    }
    case 'arrow-left': {
      return <ArrowLeft {...props} />;
    }
    case 'logo': {
      return <Logo size={props.size} />;
    }
    case 'facebook': {
      return <Facebook {...props} />;
    }
    case 'google': {
      return <Google {...props} />;
    }
    case 'apple': {
      return <Apple {...props} />;
    }
    case 'close': {
      return <Close {...props} />;
    }
    case 'close-small': {
      return <CloseSmall {...props} />;
    }
    case 'search': {
      return <SearchIcon {...props} />;
    }
    case 'check':
    case 'success': {
      return <Check {...props} />;
    }
    case 'shield': {
      return <Shield {...props} />;
    }
    case 'headphones': {
      return <Headphones {...props} />;
    }
    case 'bell': {
      return <BellNotificationIcon {...props} />;
    }
    case 'news': {
      return <News {...props} />;
    }
    case 'settings': {
      return <Settings {...props} />;
    }
    case 'crown': {
      return <Crown {...props} />;
    }
    case 'copy': {
      return <Copy {...props} />;
    }
    case 'lock': {
      return <Lock {...props} />;
    }
    case 'devices': {
      return <Devices {...props} />;
    }
    case 'monitors': {
      return <Monitors {...props} />;
    }
    case 'arrow-right': {
      return <ArrowRight {...props} />;
    }
    case 'alert': {
      return <Alert {...props} />;
    }
    case 'big-warning-icon': {
      return <BigWarningIcon {...props} />;
    }
    case 'questionmark': {
      return <Questionmark {...props} />;
    }
    case 'comment': {
      return <Comment {...props} />;
    }
    case 'eur': {
      return <CurrencyEUR {...props} />;
    }
    case 'usd': {
      return <CurrencyUSD {...props} />;
    }
    case 'pencil': {
      return <Pencil {...props} />;
    }
    case 'bitcoin': {
      return <CurrencyBitcoin {...props} />;
    }
    case 'litecoin': {
      return <CurrencyLitecoin {...props} />;
    }
    case 'ethereum': {
      return <CurrencyEthereum {...props} />;
    }
    case 'ripple': {
      return <CurrencyRipple {...props} />;
    }
    case 'tether': {
      return <CurrencyTether {...props} />;
    }
    case 'eye-closed': {
      return <EyeClosed {...props} />;
    }
    case 'eye': {
      return <Eye {...props} />;
    }
    case 'put-in': {
      return <PutIn {...props} />;
    }
    case 'put-out': {
      return <PutOut {...props} />;
    }
    case 'credit-card': {
      return <CreditCard {...props} />;
    }
    case 'logout': {
      return <Logout {...props} />;
    }
    case 'box': {
      return <Box {...props} />;
    }
    case 'qr-scanner': {
      return <QrScanner {...props} />;
    }
    case 'trade-arrow': {
      return <TradeArrow {...props} />;
    }
    case '_blank': {
      return <BlankLink {...props} />;
    }
    case 'info': {
      return <Info {...props} />;
    }
    case 'no-network': {
      return <NoNetwork {...props} />;
    }
    case 'login': {
      return <Login {...props} />;
    }
    case 'error': {
      return <Error {...props} />;
    }
    case 'quatum': {
      return <Quatum {...props} />;
    }
    case 'plus': {
      return <Plus {...props} />;
    }
    case 'idcard': {
      return <IDCard {...props} />;
    }
    case 'passport': {
      return <Passport {...props} />;
    }
    case 'drivers': {
      return <DriverLicense {...props} />;
    }
    case 'id_card': {
      return <IDPassport {...props} />;
    }
    case 'play': {
      return <Play {...props} />;
    }
    case 'stop': {
      return <Stop {...props} />;
    }
    case 'refresh': {
      return <Refresh {...props} />;
    }
    case 'file': {
      return <File {...props} />;
    }
    case 'minus': {
      return <Minus {...props} />;
    }
    case 'dots': {
      return <Dots {...props} />;
    }
    case 'chart-vertical': {
      return <ChartVertical {...props} />;
    }
    case 'chart-screen': {
      return <ChartScreen {...props} />;
    }
    case 'fingerprint': {
      return <Fingerprint {...props} />;
    }
    case 'delete': {
      return <Delete {...props} />;
    }
    case 'account-type': {
      return <AccountType {...props} />;
    }
    case 'fees': {
      return <Fees {...props} />;
    }
    case 'history': {
      return <History {...props} />;
    }
    case 'checkbox': {
      return <Checkbox {...props} />;
    }
    case 'hands': {
      return <HandsIcon {...props} />;
    }

    default:
      return null;
  }
}
