import React, {useReducer, useEffect, useState, useCallback} from 'react';
import {View, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import ButtonGradient from '@components/buttons/ButtonGradient';
import Input from '@components/inputs/Input';
import SafeContainer from '@components/containers/SafeContainer';
import ModalConfirmBankScore from '@components/modals/ModalConfirmBankScore';
import CountryPicker from '@components/inputs/InputCountry';

import {stylesGlobal} from '@constants/globalStyles';

import {reducer, initState, IBankAccount} from './reducer';

import {BankAccountAddProps} from '@navigation/config/types';
import {
  getWithdrawal,
  onCreateBankScore,
  onVerificationBankScore,
} from '@store/account';

import styles from './styles';

export default function BankAccountAdd({
  navigation,
  route,
}: BankAccountAddProps) {
  const {currencyId, walletId} = route.params;
  const [state, rDispatch] = useReducer(reducer, initState);
  const [isValid, setValid] = useState(false);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [verifiaction, setVerification] = useState([] as any[]);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

  const {
    currency_id,
    bank_name,
    address,
    country,
    city,
    pos_code,
    iban,
    swift,
    correspondent_bank,
  } = state;

  useEffect(() => {
    rDispatch({
      type: '@bank/set_value',
      payload: {
        field: 'currency_id',
        value: currencyId,
      },
    });
  }, [currencyId]);

  const onEnterText = useCallback(
    (field: keyof IBankAccount) => (value: string) => {
      rDispatch({
        type: '@bank/set_value',
        payload: {
          field,
          value,
        },
      });
    },
    [],
  );

  const onSetCountry = useCallback(value => {
    rDispatch({
      type: '@bank/set_value',
      payload: {
        field: 'country',
        value,
      },
    });
  }, []);

  const onHideModal = () => setConfirmModalVisible(false);

  const onSuccess = (data: {label: string; value: string}[]) => {
    setConfirmModalVisible(true);
    setVerification(data);
  };

  const onPressAddScore = () => {
    dispatch(onVerificationBankScore(state, onSuccess));
  };

  const onSuccessCreateScore = () => {
    const onBack = () => {
      onHideModal();
      navigation.goBack();
    };
    dispatch(getWithdrawal({id: walletId}, onBack));
  };

  const onSubmit = () => {
    dispatch(onCreateBankScore(state, onSuccessCreateScore));
  };

  useEffect(() => {
    setValid(
      !!currency_id &&
        !!bank_name &&
        !!address &&
        !!pos_code &&
        !!iban &&
        !!swift &&
        !!correspondent_bank,
    );
  }, [
    bank_name,
    address,
    pos_code,
    iban,
    swift,
    correspondent_bank,
    currency_id,
  ]);

  return (
    <SafeContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={stylesGlobal.contentContainerStyle}>
        <Input
          label={t('input.label_bank_name')}
          placeholder={t('input.place_enter_bank')}
          value={bank_name}
          onChangeText={onEnterText('bank_name')}
          containerStyle={styles.inputContainerStyle}
        />
        <Input
          label={t('input.label_registration_address')}
          placeholder={t('input.place_enter_registration_address')}
          value={address}
          onChangeText={onEnterText('address')}
          containerStyle={styles.inputContainerStyle}
        />
        <CountryPicker selectedCountry={country} onSetCountry={onSetCountry} />
        <Input
          label={t('input.label_city')}
          placeholder={t('input.place_enter_city')}
          value={city}
          onChangeText={onEnterText('city')}
          containerStyle={styles.inputContainerStyle}
        />
        <Input
          label={t('input.label_pos_code')}
          placeholder={t('input.place_enter_pos_code')}
          value={pos_code}
          onChangeText={onEnterText('pos_code')}
          containerStyle={styles.inputContainerStyle}
        />
        <Input
          label={t('input.label_iban')}
          placeholder={t('input.place_enter_iban')}
          value={iban}
          onChangeText={onEnterText('iban')}
          containerStyle={styles.inputContainerStyle}
        />
        <Input
          label={t('input.label_swift')}
          placeholder={t('input.place_enter_swift')}
          value={swift}
          onChangeText={onEnterText('swift')}
          containerStyle={styles.inputContainerStyle}
        />
        <Input
          label={t('input.label_cores_bank')}
          placeholder={t('input.place_cores_bank')}
          value={correspondent_bank}
          onChangeText={onEnterText('correspondent_bank')}
          containerStyle={styles.inputContainerStyle}
        />
      </ScrollView>
      <ButtonGradient
        disabled={!isValid}
        title={t('withdrawal_to_bank.m_add_invoice')}
        onPress={onPressAddScore}
      />
      <ModalConfirmBankScore
        data={verifiaction}
        onSubmit={onSubmit}
        visible={isConfirmModalVisible}
        onClose={onHideModal}
      />
    </SafeContainer>
  );
}
