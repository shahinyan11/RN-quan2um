import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';
import ContainerItem from '@components/containers/ContainerItem';
import HtmlReader from '@components/other/HtmlReader';
import Button from '@components/buttons/Button';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';

import {selectWallet} from '@store/account/selectors';
import {PaymentSystem} from '@store/account/types';

import {stylesGlobal} from '@constants/globalStyles';

import {scaledSize} from '@utils/scaledSize';

import styles from './styles';
import ButtonGradient from '@components/buttons/ButtonGradient';
import {onRefillDepositCreate} from '@store/account';
import {onSuccessMessage} from '@store/app';

type Requisite = {
  label: string;
  value: string;
};

type Faq = {
  title: string;
  text: string;
};

type RefillNavigation = {
  ConfirmRefill: {
    paymentSystem: PaymentSystem;
    amount: any;
  };
};

const Faq = ({faq = []}: {faq?: any[]}) => {
  const [selectedFaq, setSelectedFaq] = useState(undefined as Faq | undefined);
  const renderFaqItem = (item: Faq, index: number) => {
    const isSelected = selectedFaq?.title === item.title;
    const onPressFaq = () => setSelectedFaq(isSelected ? undefined : item);
    return (
      <TouchableOpacity
        key={index.toString()}
        style={styles.faqItemContainerStyle}
        onPress={onPressFaq}>
        <Row justifyContent="space-between">
          <Text type="t5" style={stylesGlobal.flexOne}>
            {item.title}
          </Text>
          <Icon name="plus" size={scaledSize(20)} />
        </Row>
        {isSelected && <HtmlReader data={item.title} />}
      </TouchableOpacity>
    );
  };
  return <>{faq?.map(renderFaqItem)}</>;
};

const Requisites = ({
  requisites = [],
  amount,
  currencyCode,
  feePercent,
}: {
  requisites?: any[];
  amount: any;
  currencyCode: string;
  feePercent: any;
}) => {
  return (
    <>
      {requisites?.map((item: Requisite, index: number) => (
        <Row
          key={index.toString()}
          justifyContent="space-between"
          containerStyle={styles.requisiteContainerStyle}>
          <Text type="textSmall" style={styles.labelStyle}>
            {item.label}
          </Text>
          <Text type="textSmall">{item.value}</Text>
        </Row>
      ))}
      <Row
        justifyContent="space-between"
        containerStyle={styles.requisiteContainerStyle}>
        <Text type="textSmall" style={styles.labelStyle}>
          Amount
        </Text>
        <Text type="textSmall">
          {amount} {currencyCode}
        </Text>
      </Row>
      <Row
        justifyContent="space-between"
        containerStyle={styles.requisiteContainerStyle}>
        <Text type="textSmall" style={styles.labelStyle}>
          Commission
        </Text>
        <Text type="textSmall">{feePercent}%</Text>
      </Row>
    </>
  );
};

type ConfirmRefillProps = StackScreenProps<RefillNavigation, 'ConfirmRefill'>;

export default function ConfirmRefill({navigation, route}: ConfirmRefillProps) {
  const {paymentSystem, amount} = route.params;
  const walletData = useSelector(selectWallet);
  const dispatch = useDispatch();

  const {slug: transferPlatform, extra} = paymentSystem;
  const {fee_percent, currency, advice} = walletData;

  const onCancel = () => navigation.goBack();

  const onSuccess = () => {
    dispatch(onSuccessMessage(`To enrollment ${amount} ${currency.code}`));
    navigation.goBack();
  };

  const onSubmit = () => {
    dispatch(
      onRefillDepositCreate(
        {
          currency_id: currency.id,
          amount,
          payment_system_id: paymentSystem.id,
        },
        onSuccess,
      ),
    );
  };

  switch (transferPlatform) {
    case 'bank-transfer': {
      return (
        <SafeScrollContainer>
          <Text type="t3">
            Теперь отправьте нам деньги с Вашего банковского счета
          </Text>
          <Text style={styles.subtitleStyle}>
            Вам необходимо осуществить платеж самостоятельно, отправив деньги на
            указанные ниже реквизиты Quan2um OU с Вашего банковского счета.
          </Text>

          <ContainerItem>
            <Text type="t4">
              Наши банковские реквизиты для платежей в {currency.code}:
            </Text>
            <Requisites
              requisites={extra?.requisites}
              amount={amount}
              feePercent={fee_percent}
              currencyCode={currency.code}
            />
          </ContainerItem>

          <Faq faq={extra?.faq} />

          <ContainerItem>
            <HtmlReader data={advice?.content} />
          </ContainerItem>

          <ButtonGradient
            title={'Отправить запрос на трансфер'}
            onPress={onSubmit}
            containerStyle={styles.submitBtnContainerStyle}
          />
          <Button type="cancel" title="Отмена" onPress={onCancel} />
        </SafeScrollContainer>
      );
    }
    default: {
      return <View />;
    }
  }
}
