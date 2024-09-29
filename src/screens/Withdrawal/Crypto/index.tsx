import React, {memo, useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Input from '@components/inputs/Input';
import ContainerItem from '@components/containers/ContainerItem';
import ContainerWithLoader from '@components/containers/ContainerWithLoader';
import Text from '@components/textes/Text';
import KeyboardListener from '@components/listeners/KeyboardListener';

import {
  selectLoading,
  selectWallet,
  selectWithdrawForm,
} from '@store/account/selectors';
import {
  onWithdrawalConfirm,
  onWithdrawCreate,
  setWithdrawForm,
} from '@store/account/actions';

import styles from './styles';

import {stylesGlobal} from '@constants/globalStyles';

import {getMaxAmount} from '@utils/index';
import {validateAmount, validateNumber} from '@utils/validation';
import InfoBalanceFee from '@screens/Withdrawal/Crypto/InfoBalanceFee';
import NetworkWithdrawModal from './NetworkWithdrawModal';
import {AppsFlyerLogEvent, withdraw_crypto} from '@utils/appsflyer';
import {showModal} from '@store/modal';

function Crypto({selectedWallet}: {selectedWallet: any}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector(selectLoading);
  const {t} = useTranslation();
  const walletData = useSelector(selectWallet);
  const withdrawForm = useSelector(selectWithdrawForm);

  const [isValid, setValid] = useState(false);
  const [network, setNetwork] = useState(null);
  const [commission, setCommission] = useState();

  useEffect(() => {
    if (network) {
      setCommission(network.fee_value);
    } else {
      setCommission(walletData.fee_value);
    }
  }, [network]);

  const amountValid = validateAmount({
    amount: withdrawForm.amount,
    maxAmount: +walletData.amount_max,
    minAmount: +walletData.amount_min,
    balance: +walletData.balance,
  });

  useEffect(() => {
    if (+walletData.amount_daily_max === 0) {
      setValid(Boolean(amountValid) && withdrawForm.requisites.length > 5);
    } else {
      const maxValid = +withdrawForm.amount <= +walletData.amount_daily_max;
      setValid(
        Boolean(amountValid) && withdrawForm.requisites.length > 5 && maxValid,
      );
    }
  }, [withdrawForm, amountValid]);

  useEffect(() => {
    if (walletData.networks) {
      setNetwork(walletData.networks[0]);
    }
  }, [walletData]);

  const onPressMax = () => {
    const tempMaxAmount = getMaxAmount({
      balance: walletData.balance,
      feePercent: walletData.fee_percent,
      maxAmount: walletData.amount_max,
    });
    dispatch(setWithdrawForm({amount: tempMaxAmount}));
  };

  const onChangeWallet = (wallet: string) => {
    dispatch(setWithdrawForm({requisites: wallet.trim()}));
  };

  const onSuccess = useCallback(() => {
    // navigation.navigate('WithdrawalVerification');

    dispatch(
      showModal({
        modalType: 'IDENTIFICATION_CHECK',
        modalProps: {
          showTfa: true,
          showEmail: true,
          onConfirm: ({tfa_code, email_code}: any) => {
            dispatch(onWithdrawalConfirm({tfa_code, token: email_code}));
          },
        },
      }),
    );
  }, [navigation]);

  const callbackSetData = (requisites: string) => {
    dispatch(setWithdrawForm({requisites}));
  };

  const onPressScanner = () => {
    navigation.navigate('Scanner', {callbackSetData});
  };

  const onPressSimpleWallets = () => {
    navigation.navigate('WithdrawalWallets', {
      currencyId: walletData.currency.id,
    });
  };

  const onSubmit = useCallback(() => {
    const params = {
      currency_id: walletData.currency.id,
      amount: +withdrawForm.amount,
      payment_system_id: walletData.payment_systems[0].id,
      is_mobile: 1,
      requisites: withdrawForm.requisites,
    };

    if (network) {
      params.network = network.value;
    }

    dispatch(onWithdrawCreate(params, onSuccess));

    AppsFlyerLogEvent(withdraw_crypto, params);
  }, [walletData, withdrawForm, onSuccess]);

  const onEnterAmount = (value: string) => {
    try {
      if (validateNumber(value)) {
        const tempValue = value.replace(',', '.');

        dispatch(setWithdrawForm({amount: tempValue}));
      }
    } catch (e) {
      console.error('[VALIDATION]: Enter amount', e);
    }
  };

  useEffect(() => {
    setNetwork(null);
  }, [selectedWallet]);

  return (
    <>
      <ContainerWithLoader
        loading={loading}
        containerStyle={stylesGlobal.fullScale}>
        <KeyboardListener>
          <View style={stylesGlobal.fullScale}>
            {walletData.networks && (
              <NetworkWithdrawModal
                data={walletData}
                value={network}
                onPress={setNetwork}
              />
            )}
            <Input
              withIcon={true}
              icon={{name: 'qr-scanner'}}
              onPressIcon={onPressScanner}
              label={t('common.wallet')}
              placeholder={t('common.wallet')}
              containerStyle={styles.inpContainerStyle}
              value={withdrawForm.requisites}
              onChangeText={onChangeWallet}
              withAction
              actionLabel={t('common.address')}
              onPressAction={onPressSimpleWallets}
            />
            <Input
              withAction
              actionLabel={`
                ${walletData.balance_face || 0} ${
                walletData.currency.code || 'BTC'
              }`}
              onPressAction={onPressMax}
              label={t('input.label_amount')}
              placeholder={`Min ${walletData.amount_min_face} ${walletData.currency.code} - Max ${walletData.amount_max_face} ${walletData.currency.code}`}
              containerStyle={styles.inpContainerStyle}
              value={withdrawForm.amount}
              onChangeText={onEnterAmount}
              keyboardType="numeric"
            />

            <Text type="textMini" style={styles.amountDailyMaxStyle}>
              {t('withdrawal_cripto.withdrawal_limit')}{' '}
              <Text type="textMini" style={styles.amountDailyMaxAmountStyle}>
                {walletData.amount_daily_max_face} {walletData.currency.code}
              </Text>
            </Text>

            <ContainerItem>
              <Text type="textSmall" style={styles.hintStyle}>
                {t('withdrawal_cripto.advice_1')}
              </Text>
              <Text type="textSmall" style={styles.hintStyle}>
                {t('withdrawal_cripto.advice_2')}
              </Text>
            </ContainerItem>
          </View>
          <InfoBalanceFee
            walletData={walletData}
            isValid={isValid}
            commission={commission}
            onConfirm={onSubmit}
          />
        </KeyboardListener>
      </ContainerWithLoader>
    </>
  );
}

export default memo(Crypto);
