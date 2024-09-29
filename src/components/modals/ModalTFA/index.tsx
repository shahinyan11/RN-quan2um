import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Modal} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import Button from '@components/buttons/Button';
import InputCode from '@components/inputs/InputCode';
import Text from '@components/textes/Text';
import IconGradient from '@components/icons/IconGradient';
import KeyboardListener from '@components/listeners/KeyboardListener';
import {Header} from '@components/other/Header';

import styles from './styles';
import {stylesGlobal} from '@constants/globalStyles';

import {selectMessage} from '@store/app';

interface IModalTFA {
  visible: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
}

export default function GTFAConfirm({visible, onClose, onSubmit}: IModalTFA) {
  const {t} = useTranslation();
  const {type, message} = useSelector(selectMessage);
  const dispatch = useDispatch();

  const [code, setCode] = useState('');

  const onNext = () => {
    onSubmit(code);
  };

  const onBack = () => {
    onClose();
  };

  useEffect(() => {
    if (!visible) {
      setCode('');
    }
  }, [visible, dispatch]);

  if (visible) {
    return (
      <Modal visible={true} style={stylesGlobal.fullScale}>
        <SafeContainer>
          <KeyboardListener containerStyle={styles.containerStyle}>
            <Header onBack={onBack} />

            <View style={styles.mainContainerStyle}>
              <IconGradient
                name="quatum"
                containerStyle={styles.iconContainerStyle}
              />
              <Text type="t4" textAlign="center">
                {t('modal_tfa.title')}
              </Text>
              <Text textAlign="center" style={styles.subtitleStyle}>
                {t('modal_tfa.description')}
              </Text>

              <InputCode value={code} onChangeText={setCode} />

              {type === 'error' && (
                <Text
                  type="t5"
                  textAlign="center"
                  style={styles.errorMessageStyle}>
                  {message}
                </Text>
              )}
            </View>

            <Button
              title={t('common.next_step')}
              onPress={onNext}
              disabled={code.length !== 6}
            />
          </KeyboardListener>
        </SafeContainer>
      </Modal>
    );
  }

  return null;
}
