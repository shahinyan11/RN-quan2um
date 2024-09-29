import React from 'react';
import GoogleReCaptcha from 'react-native-google-recaptcha-v2/GoogleReCaptcha';
import Config from 'react-native-config';
import Modal from 'react-native-modal';
import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {selectLanguage} from '@store/app';

const {width, height} = Dimensions.get('window');

/**
 * InfoMatsernodModal window for google captcha
 * @param {boolean} isVisible - is visible bottomSheet
 * @param {function} onMessage - init captcha event
 */
const ModalCaptcha = ({isVisible, onMessage}: any) => {
  const marginTop = DeviceInfo.hasNotch() ? 50 : 0;
  const language = useSelector(selectLanguage);
  const {t} = useTranslation();

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver
      hideModalContentWhileAnimating
      deviceHeight={height}
      deviceWidth={width}
      style={{margin: 0, marginTop}}
      animationIn="fadeIn"
      animationOut="fadeOut">
      <GoogleReCaptcha
        siteKey={Config.CAPTCHA_KEY}
        url={Config.BASE_URL}
        languageCode={language.locale}
        onMessage={onMessage}
        cancelButtonText={t('common.cancel')}
      />
    </Modal>
  );
};

export default ModalCaptcha;
