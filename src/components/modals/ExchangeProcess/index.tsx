import React, {useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import Progress from '@components/modals/ExchangeProcess/Progress';
import ButtonGradient from '@components/buttons/ButtonGradient';
import ModalWrapper from '@components/ModalWrapper';
import {createExchange} from '@store/exchange';
import st from './styles';
import {selectCurrentExchange} from '@store/exchange/selectors';
import {EXCHANGE_TYPES} from '@constants/index';
import {MaskedText} from 'react-native-mask-text';
import {hideModal} from '@store/modal';

export type ExchangeProcessProps = {
  paymentMethod: any;
  receiptAmount: number;
  exchangeAmount: number;
  from: string;
};

export default function ExchangeProcess({
  paymentMethod,
  from,
  receiptAmount,
  exchangeAmount,
}: ExchangeProcessProps) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const currentExchange = useSelector(selectCurrentExchange);
  const expire = currentExchange?.expire;
  const {mask} = EXCHANGE_TYPES.card;

  const handleConfirm = () => {
    dispatch(
      createExchange({
        amount: receiptAmount,
        method: paymentMethod.method,
        from,
      }),
    );
  };

  const cancel = () => {
    dispatch(hideModal());
  };

  const step = useMemo(() => {
    let _step = 2;

    if (currentExchange?.step) {
      _step = currentExchange?.step <= 3 ? 3 : 4;
    }

    return _step;
  }, [currentExchange?.step]);

  return (
    <ModalWrapper contentStyle={st.content}>
      <Progress currentStep={step} expire={expire} />
      <Text style={st.title}>
        {t('exchange.check_accuracy_of_data_and_confirm')}
      </Text>
      <View style={st.row}>
        <View style={st.m_r_50}>
          <View>
            <Text style={st.label}>Метод</Text>
            <Text style={st.value}>{paymentMethod.title}</Text>
          </View>
          <View>
            <Text style={st.label}>Сумма обмена</Text>
            <Text style={[st.value, st.greenText]}>
              {exchangeAmount} {paymentMethod.currencyFrom.code}
            </Text>
          </View>
        </View>
        <View>
          <View>
            <Text style={st.label}>Номер карты</Text>
            <MaskedText mask={mask} style={st.value}>
              {from}
            </MaskedText>
          </View>
          <View>
            <Text style={st.label}>Сумма поступления</Text>
            <Text style={[st.value, st.blueText]}>
              {paymentMethod.currencyTo.code} {receiptAmount}
            </Text>
          </View>
        </View>
      </View>
      {step < 3 && (
        <View>
          <ButtonGradient
            containerStyle={st.buttonContainer}
            title={t('common.confirm')}
            onPress={handleConfirm}
            gradientColors={['#19D6ED', '#0288FD']}
          />
          <TouchableOpacity onPress={cancel}>
            <Text style={st.cancelText}>{t('common.cancel')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ModalWrapper>
  );
}
