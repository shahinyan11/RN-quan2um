import messaging from '@react-native-firebase/messaging';
import {isAndroid, isIos} from '@constants/deviceInfo';
import {requestNotifications, RESULTS} from 'react-native-permissions';

export async function requestUserPermission() {
  let enabled;

  if (isIos) {
    const authStatus = await messaging().requestPermission();
    enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  }

  if (isAndroid) {
    const res = await requestNotifications(['alert', 'badge', 'sound']);
    enabled = res.status === RESULTS.GRANTED;
  }

  return enabled;
}

export async function getFcmToken() {
  return messaging()
    .getToken()
    .then(token => token);
}
