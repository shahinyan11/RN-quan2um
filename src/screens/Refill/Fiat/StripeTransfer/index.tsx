import React, {useState, memo, useEffect} from 'react';
import {View, Modal} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CardField,
  handleCardAction,
  useStripe,
} from '@stripe/stripe-react-native';

import Button from '@components/buttons/Button';
import Input from '@components/inputs/Input';
import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import SafeContainer from '@components/containers/SafeContainer';
import KeyboardListener from '@components/listeners/KeyboardListener';
import Loader from '@components/other/Loader';

import {selectWallet} from '@store/account/selectors';
import {onErrorMessage, onSuccessMessage} from '@store/app';
import {onRefillDepositCreate} from '@store/account/actions';
import {StripeResponse} from '@store/account/types';

import fonts from '@constants/fonts';
import {scaledFontSize} from '@utils/scaledSize';

import styles from '../styles';

import {validateNumber} from '@utils/validation';
import {getMaxAmount} from '@utils/index';
import {
  AppsFlyerLogEvent,
  re_deposit_fiat,
  first_deposit_fiat,
} from '@utils/appsflyer';
import {useTranslation} from 'react-i18next';
import {selectMarketData} from '@store/market/selectors';

type PaymentScreenProps = {
  paymentSystemId: number;
  onBack: () => void;
};

const StripeTransfer = ({onBack, paymentSystemId}: PaymentScreenProps) => {
  const {createPaymentMethod} = useStripe();
  const [isModalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [isValid, setValid] = useState(false);
  const [email, setEmail] = useState('');
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const {
    currency,
    fee_percent = 0,
    amount_min_face,
    amount_max_face,
    amount_max,
    amount_min,
    balance,
    balance_face,
    payment_systems,
  } = useSelector(selectWallet);
  const marketData = useSelector(selectMarketData);
  const system = payment_systems.find(item => item.id === paymentSystemId);

  const commission = +amount * (+system.fee_percent / 100);
  const clearAmount = +amount - commission;

  const CARD_INPUT_STYLE = {
    textColor: '#FFFFFF',
    fontFamily: fonts.OSRegular,
    fontSize: scaledFontSize(14),
    backgroundColor: '#161524',
    placeholderColor: '#464652',
    borderWidth: 1,
    borderColor: '#272634',
  };

  const onSuccess = async (response: StripeResponse) => {
    try {
      const {processor_status, client_secret, payment} = response;

      if (processor_status === 'requires_action' && client_secret) {
        const {paymentIntent, error} = await handleCardAction(client_secret);

        if (paymentIntent && !error) {
          const config = {
            currency_id: currency.id,
            amount: +amount,
            payment_system_id: paymentSystemId,
            //operation_id: paymentMethod?.id,
            payment_intent_id: paymentIntent.id,
            transaction_id: response.transaction_id,
          };
          dispatch(
            onRefillDepositCreate(config, e => {
              setModalLoadingVisible(false);
              dispatch(
                onSuccessMessage(
                  `${e.payment?.message} ${e.payment?.deposit_amount} ${e.payment?.currency}`,
                ),
              );
              onBack();
            }),
          );
        } else {
          setModalLoadingVisible(false);
          dispatch(onErrorMessage(`${error?.localizedMessage}`));
        }
      } else if (processor_status === 'succeeded') {
        setModalLoadingVisible(false);
        dispatch(
          onSuccessMessage(
            `${payment?.message} ${payment?.deposit_amount} ${payment?.currency}`,
          ),
        );
        onBack();
      }
    } catch (e) {
      console.log(e);
      setModalLoadingVisible(false);
    }
  };

  const onSubmit = async () => {
    try {
      setModalLoadingVisible(true);

      //Crete payment
      const {error, paymentMethod} = await createPaymentMethod({
        type: 'Card',
        billingDetails: {
          email,
        },
      });

      if (error) {
        dispatch(
          onErrorMessage(
            error.localizedMessage ||
              'Ooopppss!! We have some problem, try again latter',
          ),
        );
        setModalLoadingVisible(false);
      } else {
        if (paymentMethod?.id) {
          const config = {
            currency_id: currency.id,
            amount: +amount,
            payment_system_id: paymentSystemId,
            operation_id: paymentMethod.id,
          };

          //Send request on server
          await dispatch(onRefillDepositCreate(config, onSuccess));

          if (marketData.first_deposit_fiat) {
            AppsFlyerLogEvent(first_deposit_fiat, config);
          } else {
            AppsFlyerLogEvent(re_deposit_fiat, config);
          }

          setModalLoadingVisible(false);
        }
      }
    } catch (e) {
      console.log('Stripe error', e);
      setModalLoadingVisible(false);
    }
  };

  const onEnterAmount = (value: string) => {
    try {
      if (validateNumber(value)) {
        const tempValue = value.replace(',', '.');
        setAmount(tempValue);
      }
    } catch (e) {
      console.log('Enter amount error');
    }
  };

  const onPressMax = () => {
    const tempMaxAmount = getMaxAmount({
      balance,
      feePercent: fee_percent,
      maxAmount: amount_max,
    });

    setAmount(tempMaxAmount);
  };

  useEffect(() => {
    const amountValid = +amount <= +amount_max && +amount >= +amount_min;

    setValid(amountValid && !!email);
  }, [amount, amount_max, amount_min, email]);

  return (
    <KeyboardListener>
      <SafeContainer containerStyle={styles.mainContainerStyle}>
        <View>
          <View style={styles.inpContainerStyle}>
            <Text type="tTiny" style={styles.cardInputLabelStyle}>
              {t('assets.bank_card')}
            </Text>
            <CardField
              postalCodeEnabled={false}
              style={styles.cardFieldContainerStyle}
              cardStyle={CARD_INPUT_STYLE}
            />
          </View>
          <Input
            label={t('input.label_amount')}
            value={amount}
            placeholder={`Min ${amount_min_face} ${currency.code} - Max ${amount_max_face} ${currency.code}`}
            onChangeText={onEnterAmount}
            keyboardType="numeric"
            containerStyle={styles.inpContainerStyle}
            withAction
            actionLabel={`${balance_face} ${currency.code}`}
            onPressAction={onPressMax}
          />
          <Input
            label={t('common.email')}
            placeholder={t('input.place_enter_email')}
            containerStyle={styles.inpContainerStyle}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View>
          <Row
            justifyContent="space-between"
            containerStyle={styles.hintContainerStyle}>
            <Text type="textSmall" style={styles.labelStyle}>
              {t('common.balance')}:
            </Text>
            <Text type="textSmall">{`${balance_face} ${currency.code}`}</Text>
          </Row>
          <Row
            justifyContent="space-between"
            containerStyle={styles.hintContainerStyle}>
            <Text type="textSmall" style={styles.labelStyle}>
              {`${t('common.fee')} ${system.fee_percent}%:`}
            </Text>
            <Text type="textSmall">{`${commission.toFixed(2)} ${
              currency.code
            }`}</Text>
          </Row>
          <Row
            justifyContent="space-between"
            containerStyle={styles.hintContainerStyle}>
            <Text type="textSmall" style={styles.labelStyle}>
              {t('bonus_covid.to_receive')}:
            </Text>
            <Text type="textSmall">{`${clearAmount} ${currency.code}`}</Text>
          </Row>
          <Button
            disabled={!isValid}
            title={t('common.next_step')}
            onPress={onSubmit}
            containerStyle={styles.btnContainerStyle}
          />
          <Button type="cancel" title={t('common.back')} onPress={onBack} />
        </View>

        <Modal visible={isModalLoadingVisible} transparent>
          <View style={styles.modalBackgroundStyle}>
            <Loader size="large" />
          </View>
        </Modal>
      </SafeContainer>
    </KeyboardListener>
  );
};

export default memo(StripeTransfer);
