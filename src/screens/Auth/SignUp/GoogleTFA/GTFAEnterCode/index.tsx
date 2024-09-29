import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import {useDispatch} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import Button from '@components/buttons/Button';
import InputCode from '@components/inputs/InputCode';
import Text from '@components/textes/Text';

import styles from './styles';
import {onDisableTFA, onEnableTFA} from '@store/auth/actions';
import {GTFAEnterCodeProps} from '@navigation/config/types';

export default function GTFAEnterCode({navigation, route}: GTFAEnterCodeProps) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const secret = route.params?.secret;

  const onSuccess = (reserve_codes: string[]) => {
    navigation.navigate('GTFAOneTimeCodes', {
      reserve_codes,
    });
  };

  const onSubmit = () => {
    if (!secret) {
      dispatch(onDisableTFA({tfa_code: code}));
      return;
    }

    dispatch(
      onEnableTFA(
        {
          secret,
          code,
        },
        onSuccess,
      ),
    );
  };

  const onInsert = async () => {
    const value = await Clipboard.getString();
    setCode(value);
  };

  return (
    <SafeContainer containerStyle={styles.containerStyle}>
      <View>
        <Text textAlign="center" style={styles.titleStyle}>
          {t('tfa_on_off.send_code_desc')}
        </Text>
        <InputCode value={code} onChangeText={setCode} />
        <TouchableOpacity style={{marginTop: 15}} onPress={onInsert}>
          <Text style={styles.insert}>{t('common.insert')}</Text>
        </TouchableOpacity>
      </View>

      <Button
        title={t(secret ? 'common.next_step' : 'common.disable')}
        onPress={onSubmit}
        disabled={code.length !== 6}
      />
    </SafeContainer>
  );
}
