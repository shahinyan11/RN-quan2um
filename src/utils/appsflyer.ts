import appsFlyer from 'react-native-appsflyer';
import {Platform} from 'react-native';
import appInfo from '@constants/appInfo';
import prettyLog from '@utils/prettyLog';

// Events
export const registration = 'af_complete_registration';
export const first_deposit_fiat = 'first_deposit_fiat';
export const re_deposit_fiat = 're_deposit_fiat';
export const first_deposit_crypto = 'first_deposit_crypto';
export const re_deposit_crypto = 're_deposit_crypto';
export const trade = 'trade';
export const ecomining = 'ecomining';
export const exchange_of_funds = 'exchange_of_funds';
export const withdraw_fiat = 'withdraw_fiat';
export const withdraw_crypto = 'withdraw_crypto';

const initOptions = {
  isDebug: __DEV__,
  devKey: appInfo.APPSFLYER_KEY,
  onInstallConversionDataListener: true,
  timeToWaitForATTUserAuthorization: 10,
  onDeepLinkListener: false,
  appId: Platform.OS === 'ios' ? appInfo.IOS_ID : appInfo.ANDROID_ID,
};

// AppsFlyer initialization flow. ends with initSdk.
export function AppsFlyerInit() {
  appsFlyer.initSdk(
    initOptions,
    () => console.log('AppsFlyer connected'),
    () => console.error('AppsFlyer connection error'),
  );
}

// Sends in-app events to AppsFlyer servers. name is the events name ('simple event') and the values are a JSON ({info: 'fff', size: 5})
export function AppsFlyerLogEvent(name, values) {
  appsFlyer.logEvent(
    name,
    values,
    () => prettyLog('AppsFlyerLogEvent', `${name} success`),
    null,
  );
}

export function AppsFlyerOnInstall() {
  let isFirstLaunch = null;

  appsFlyer.onInstallConversionData(res => {
    const is_first_launch = res?.data?.is_first_launch;

    isFirstLaunch = Boolean(
      is_first_launch && JSON.parse(is_first_launch) === true,
    );
  });

  return isFirstLaunch;
}
