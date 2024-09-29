import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import PickerTransferCurrency from '@components/pickers/PickerTranferCurrency';
import Input from '@components/inputs/Input';
import ButtonGradient from '@components/buttons/ButtonGradient';
import SafeContainer from '@components/containers/SafeContainer';
import ContainerWithLoader from '@components/containers/ContainerWithLoader';
import InputPhone from '@components/inputs/InputPhone';
import KeyboardListener from '@components/listeners/KeyboardListener';
import InfoBalance from './InfoBalance';

import {
  getAccountTransfer,
  onTransferCreate,
  setTransferForm,
} from '@store/account';
import {
  selectAccountTransfer,
  selectLoading,
  selectTransferForm,
} from '@store/account/selectors';
import {onErrorMessage, onSuccessMessage} from '@store/app';

import styles from './styles';

import {getCommission, getMaxAmount} from '@utils/index';
import {phoneValid, validateAmount, validateNumber} from '@utils/validation';
import {showModal} from '@store/modal';

function TransferPutOut({navigation}: any) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const accountTransfer = useSelector(selectAccountTransfer);
  const transferForm = useSelector(selectTransferForm);

  const [isValid, setValid] = useState(false);
  const [isPhoneNumberSelected, setIsPhoneNumberSelected] = useState(false);
  const [amountValid, setAmountValid] = useState(false);
  const [errorPhone, setErrorPhone] = useState(' ');

  useEffect(() => {
    dispatch(getAccountTransfer());
  }, []);

  useEffect(() => {
    const {selectedCurrency} = transferForm;
    const valid = validateAmount({
      amount: transferForm.amount,
      maxAmount: +selectedCurrency?.transfer_max,
      minAmount: +selectedCurrency?.transfer_min,
      balance: +selectedCurrency?.current_balance,
    });

    setAmountValid(valid);
  }, [
    transferForm.amount,
    isPhoneNumberSelected,
    transferForm.selectedCurrency?.id,
  ]);

  const commission = getCommission({
    amount: transferForm.amount,
    feePercent: transferForm.selectedCurrency?.transfer_fee,
  });

  const setUserId = (userId: string) => {
    if (userId.length > 8) {
      return;
    }
    dispatch(setTransferForm({...transferForm, userId}));
  };

  const setSelectedCurrency = (currency: any) => {
    dispatch(setTransferForm({...transferForm, selectedCurrency: currency}));
  };

  const onChangeTypeOfField = useCallback(
    () => setIsPhoneNumberSelected(!isPhoneNumberSelected),
    [isPhoneNumberSelected],
  );

  const setPhoneNumber = (number: string) => {
    dispatch(setTransferForm({...transferForm, phoneNumber: number}));
  };

  const setComment = (comment: string) => {
    dispatch(setTransferForm({...transferForm, comment}));
  };

  const onPressMax = () => {
    const {selectedCurrency} = transferForm;
    const tempMaxAmount = getMaxAmount({
      balance: selectedCurrency?.current_balance,
      feePercent: selectedCurrency?.transfer_fee,
      maxAmount: selectedCurrency?.transfer_max,
    });

    dispatch(setTransferForm({...transferForm, amount: tempMaxAmount}));
  };

  const onSuccess = useCallback(() => {
    dispatch(
      onSuccessMessage(
        t('common.m_success_transaction_end', {
          amount: transferForm.amount,
          currency: transferForm.selectedCurrency?.code,
          user: isPhoneNumberSelected
            ? `+${transferForm.phoneNumber.code}${transferForm.phoneNumber.phone}`
            : `ID ${transferForm.userId}`,
        }),
      ),
    );
  }, [transferForm, dispatch]);

  const onSubmit = useCallback(
    ({tfa_code}: any) => {
      dispatch(
        onTransferCreate(
          {
            account_id: isPhoneNumberSelected
              ? `${transferForm.phoneNumber.code}${transferForm.phoneNumber.phone}`
              : transferForm.userId,
            currency_id: transferForm.selectedCurrency?.id,
            amount: transferForm.amount,
            comment: transferForm.comment,
            tfa_code,
          },
          onSuccess,
        ),
      );
    },
    [transferForm, isPhoneNumberSelected, onSuccess, dispatch],
  );

  const onConfirm = () => {
    dispatch(
      showModal({
        modalType: 'IDENTIFICATION_CHECK',
        modalProps: {
          showTfa: true,
          onConfirm: onSubmit,
        },
      }),
    );
  };

  const onEnterAmount = (value: string) => {
    try {
      if (validateNumber(value)) {
        const tempValue = value.replace(',', '.');

        dispatch(setTransferForm({...transferForm, amount: tempValue}));
      }
    } catch (e) {
      console.log('Validation error');
    }
  };

  useEffect(() => {
    try {
      if (isPhoneNumberSelected) {
        setValid(Boolean(transferForm.phoneNumber.phone) && amountValid);
        return;
      }

      setValid(
        Boolean(transferForm.userId && transferForm.userId.length <= 8) &&
          amountValid,
      );
    } catch (e) {
      console.log('Problem with validation');
    }
  }, [amountValid, isPhoneNumberSelected, transferForm]);

  const setAmountPlaceholder = (() => {
    const {selectedCurrency} = transferForm;

    return selectedCurrency
      ? `Min ${selectedCurrency.transfer_min_face} ${selectedCurrency?.code}  - Max ${selectedCurrency.transfer_max_face} ${selectedCurrency.code}`
      : '';
  })();

  const onPressScanner = () => {
    navigation.navigate('Withdrawal', {
      screen: 'Scanner',
      params: {callbackSetData},
    });
  };

  const callbackSetData = (userId: string) => {
    if (userId.length !== 6) {
      dispatch(onErrorMessage(t('common.m_wrong-id')));
      dispatch(setTransferForm({...transferForm, userId: ''}));
      return;
    }
    dispatch(setTransferForm({...transferForm, userId}));
  };

  const handleOnBlurPhone = () => {
    const valid = phoneValid(transferForm.phoneNumber);
    if (valid) {
      setErrorPhone(' ');
    } else {
      setErrorPhone(t('validation.m_wrong-phone'));
    }
  };

  return (
    <SafeContainer loading={loading} containerStyle={styles.mainContainerStyle}>
      <PickerTransferCurrency
        value={transferForm.selectedCurrency}
        data={accountTransfer.currencies}
        onPress={setSelectedCurrency}
        refreshing={loading}
        onRefresh={() => {}}
      />
      <KeyboardListener>
        <ContainerWithLoader
          loading={loading}
          containerStyle={styles.transferContainerStyle}>
          <View>
            {isPhoneNumberSelected ? (
              <InputPhone
                label={t('common.phone')}
                placeholder={t('registration.button_enter_phone')}
                containerStyle={styles.inpContainerStyle}
                value={transferForm.phoneNumber}
                onChangeText={setPhoneNumber}
                withAction={true}
                actionLabel={t('input.label_recipient_id')}
                onPressAction={onChangeTypeOfField}
                keyboardType="numeric"
                isErrorVisible={true}
                errorMessage={errorPhone}
                handleOnBlur={handleOnBlurPhone}
              />
            ) : (
              <Input
                withIcon={true}
                icon={{name: 'qr-scanner'}}
                onPressIcon={onPressScanner}
                label={t('input.label_recipient_id')}
                placeholder={t('input.place_recipient_id')}
                containerStyle={styles.inpContainerStyle}
                value={transferForm.userId}
                onChangeText={setUserId}
                withAction={true}
                actionLabel={t('common.phone')}
                onPressAction={onChangeTypeOfField}
                keyboardType="numeric"
              />
            )}

            <Input
              label={t('input.label_amount')}
              placeholder={setAmountPlaceholder}
              withAction
              actionLabel={`${
                transferForm.selectedCurrency?.current_balance_face || 0
              } ${transferForm.selectedCurrency?.code || ''}`}
              onPressAction={onPressMax}
              containerStyle={styles.inpContainerStyle}
              value={transferForm.amount}
              onChangeText={onEnterAmount}
              keyboardType="numeric"
            />
            <Input
              multiline={true}
              label={t('common.comment')}
              maxLength={128}
              placeholder={t('common.comment')}
              value={transferForm.comment}
              onChangeText={setComment}
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputMessageStyle}
            />
          </View>
          <View>
            <InfoBalance commission={commission} transferForm={transferForm} />
            <ButtonGradient
              disabled={!isValid}
              title={t('common.confirm')}
              onPress={onConfirm}
            />
          </View>
        </ContainerWithLoader>
      </KeyboardListener>
    </SafeContainer>
  );
}

export default TransferPutOut;
