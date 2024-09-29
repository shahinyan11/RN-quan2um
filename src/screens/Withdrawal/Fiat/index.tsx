import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import PaymentTransaction from '@components/other/PaymentTransaction';

import {selectWallet} from '@store/account/selectors';
import {PaymentSystem} from '@store/account/types';

import {stylesGlobal} from '@constants/globalStyles';

import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import Icon from '@components/icons/Icon';
import EStyleSheet from 'react-native-extended-stylesheet';

function Fiat({selectedWallet}: {selectedWallet: any}) {
  const [selectedPaymentSystem, setPaymentSystem] = useState(
    undefined as PaymentSystem | undefined,
  );
  const navigation = useNavigation();
  const {t} = useTranslation();
  const walletData = useSelector(selectWallet);

  const {payment_systems} = walletData;

  const onPaymentSystemClear = () => setPaymentSystem(undefined);

  const ButtonBackCustom = useCallback(() => {
    const white50 = EStyleSheet.value('$white50');

    const onPress = () => {
      if (selectedPaymentSystem?.slug) {
        setPaymentSystem(undefined);
      } else {
        navigation.goBack();
      }
    };
    return (
      <Pressable onPress={onPress}>
        <View style={styles.containerStyle}>
          <Icon name="arrow-left" color={white50} size={20} onPress={onPress} />
        </View>
      </Pressable>
    );
  }, [selectedPaymentSystem]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ButtonBackCustom,
    });
  }, [navigation, selectedPaymentSystem]);

  useEffect(() => {
    setPaymentSystem(undefined);
  }, [selectedWallet]);

  const renderPaymentSystemItem = (item: PaymentSystem) => {
    const onPresPaymentItem = () => {
      setPaymentSystem(item);
    };
    /** Disabled bank transfer
     * todo delete when will be allow
     */
    const bankTransfer = item.slug === 'bank-transfer';

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
    <View style={stylesGlobal.fullScale}>
      {selectedPaymentSystem?.slug ? (
        <PaymentTransaction
          walletId={selectedWallet.id}
          selectedPaymentSystem={selectedPaymentSystem}
          onPaymentSystemClear={onPaymentSystemClear}
        />
      ) : (
        <>
          <Text type="label" style={styles.titleStyle}>
            {t('assets.payment_method')}
          </Text>
          {payment_systems?.map(renderPaymentSystemItem)}
        </>
      )}
    </View>
  );
}

export default Fiat;
