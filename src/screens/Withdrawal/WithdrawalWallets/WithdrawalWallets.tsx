import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';

import Input from '@components/inputs/Input';
import SafeContainer from '@components/containers/SafeContainer';
import ButtonGradient from '@components/buttons/ButtonGradient';
import KeyboardListener from '@components/listeners/KeyboardListener';

import {scaledSize} from '@utils/scaledSize';

import {onWithdrawWalletCreate, onWithdrawWalletUpdate} from '@store/account';
import {WithdrawalWalletsOperationsProps} from '@navigation/config/types';
import {selectLoading} from '@store/account/selectors';
import {useTranslation} from 'react-i18next';

const styles = EStyleSheet.create({
  inputContainerStyle: {
    marginTop: scaledSize(24),
  },
  containerStyle: {
    justifyContent: 'space-between',
  },
});

export default function WithdrawalWallets({
  navigation,
  route,
}: WithdrawalWalletsOperationsProps) {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {currencyId, item, type} = route.params;
  const loading = useSelector(selectLoading);

  const [name, setName] = useState(item?.name || '');
  const [address, setAddress] = useState(item?.address);

  const [isValid, setValid] = useState(false);

  const callbackSetData = (data: string) => {
    setAddress(data);
  };

  const onPressScanner = () => {
    navigation.navigate('Scanner', {callbackSetData});
  };

  const onSuccess = () => navigation.goBack();

  const onSubmit = () => {
    if (type === 'create') {
      dispatch(
        onWithdrawWalletCreate({currencyId, data: {name, address}, onSuccess}),
      );
    } else if (type === 'update') {
      dispatch(
        onWithdrawWalletUpdate(
          {
            id: item?.id,
            name,
            address,
          },
          onSuccess,
        ),
      );
    }
  };

  useEffect(() => {
    setValid(name?.length > 3 && address?.length > 20);
  }, [name, address]);

  return (
    <SafeContainer loading={loading}>
      <KeyboardListener containerStyle={styles.containerStyle}>
        <View>
          <Input
            label={t('common.m_wallet-name')}
            placeholder={t('common.m_enter-name')}
            containerStyle={styles.inputContainerStyle}
            value={name}
            onChangeText={setName}
            maxLength={16}
          />

          <Input
            withIcon={true}
            icon={{name: 'qr-scanner'}}
            onPressIcon={onPressScanner}
            label={t('common.wallet')}
            placeholder={t('common.m_wallet-address')}
            containerStyle={styles.inputContainerStyle}
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <ButtonGradient
          disabled={!isValid}
          title={t('common.m_done')}
          onPress={onSubmit}
        />
      </KeyboardListener>
    </SafeContainer>
  );
}
