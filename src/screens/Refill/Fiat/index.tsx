import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {TouchableOpacity, BackHandler} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import {useTranslation} from 'react-i18next';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import SafeContainer from '@components/containers/SafeContainer';

import BankTransfer from './BankTransfer';
import StripeTransfer from './StripeTransfer';

import {PaymentSystem} from '@store/account/types';
import {selectWallet} from '@store/account/selectors';

import styles from './styles';

/**
 * Screen Refill fiat
 */
function RefillFiat() {
  const {t} = useTranslation();
  const walletData = useSelector(selectWallet);
  const {payment_systems, currency} = walletData;

  const [selectedPaymentSystem, setPaymentSystem] = useState(
    undefined as PaymentSystem | undefined,
  );

  const onClearSelectedPaymentSystem = useCallback(() => {
    setPaymentSystem(undefined);
  }, []);

  useEffect(() => {
    const backListener = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    return () => backListener.remove();
  }, []);

  const renderPaymentSystemItem = (item: PaymentSystem) => {
    const onPresPaymentItem = () => {
      setPaymentSystem(item);
    };

    /**
     * Disabled bank transfer
     * todo delete when will be allow
     */
    const bankTransfer = item.slug === 'bank-transfer';

    if (
      item.slug === 'payeer' ||
      item.slug === 'perfect-money' ||
      item.slug === 'piastrix'
    ) {
      return null;
    }

    return (
      <TouchableOpacity
        key={item.id.toString()}
        onPress={onPresPaymentItem}
        disabled={bankTransfer}>
        <Row
          justifyContent="space-between"
          containerStyle={styles.itemContainerStyle}>
          <Text type="t5" style={bankTransfer && {color: 'grey'}}>
            {item.name}
          </Text>
          <Text style={styles.feeStyle}>
            {t('common.fee')}:<Text> {item.fee_percent}%</Text>
          </Text>
          {bankTransfer && (
            <Row
              containerStyle={{
                position: 'absolute',
                left: '35%',
                opacity: 0.5,
              }}>
              <Text type="t2">{t('common.coming_soon')}</Text>
            </Row>
          )}
        </Row>
      </TouchableOpacity>
    );
  };

  return (
    <SafeContainer>
      <Text type="textMini" style={styles.amountDailyMaxStyle}>
        {`${t('deposit_cripto.deposit_limit')} `}
        <Text type="textMini" style={styles.amountDailyMaxAmountStyle}>
          {walletData.amount_daily_max_face} {currency.code}
        </Text>
      </Text>
      {selectedPaymentSystem?.slug === 'bank-transfer' ? (
        <BankTransfer
          onBack={onClearSelectedPaymentSystem}
          selectedPaymentSystem={selectedPaymentSystem}
        />
      ) : selectedPaymentSystem?.slug === 'stripe' ? (
        <StripeProvider publishableKey={selectedPaymentSystem.extra.pub_key}>
          <StripeTransfer
            onBack={onClearSelectedPaymentSystem}
            paymentSystemId={selectedPaymentSystem.id}
          />
        </StripeProvider>
      ) : (
        <>
          <Text style={styles.titleStyle}>{t('assets.payment_method')}</Text>
          {payment_systems?.map(renderPaymentSystemItem)}
        </>
      )}
    </SafeContainer>
  );
}

export default RefillFiat;
