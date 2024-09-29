import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {getVersion} from 'react-native-device-info';
import {getAppstoreAppMetadata} from 'react-native-appstore-version-checker';
import appInfo from '@constants/appInfo';

/**
 * Checking if needed to update app
 * @returns {[boolean]}
 */
const useCheckAppVersion = () => {
  const [isNeedUpdate, setIsNeedUpdate] = useState(false);

  const storeSpecificId =
    Platform.OS === 'ios' ? appInfo.IOS_ID : appInfo.ANDROID_ID;

  useEffect(() => {
    (async () => {
      try {
        const metadata = await getAppstoreAppMetadata(storeSpecificId);
        const currentVersion = getVersion();

        if (metadata.version !== currentVersion) {
          setIsNeedUpdate(true);
        }
      } catch (err) {
        console.log('[useCheckAppVersion]: ', err.message);
      }
    })();
  });

  return [isNeedUpdate];
};

export default useCheckAppVersion;
