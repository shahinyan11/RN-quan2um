import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import Clipboard from '@react-native-community/clipboard';

import Text from '@components/textes/Text';
import ContainerItem from '@components/containers/ContainerItem';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import SafeContainer from '@components/containers/SafeContainer';
import Link from '@components/textes/Link';
import HtmlReader from '@components/other/HtmlReader';
import Row from '@components/containers/Row';

import styles from './styles';

import {onSuccessMessage} from '@store/app';

import {selectWallet} from '@store/account/selectors';
import NetworkModal from '@screens/Refill/NetworkModal';

function Refill() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [network, setNetwork] = useState(null);

  const walletData = useSelector(selectWallet);

  useEffect(() => {
    setNetwork(walletData?.crypto_params?.addresses[0]);
  }, [walletData]);

  const onCopy = () => {
    try {
      if (network) {
        Clipboard.setString(network?.address);

        dispatch(onSuccessMessage(t('common.copy_clipboard')));
      }
    } catch (e) {
      console.log(
        "[ERROR]: This currency don't have field crypto_params.address",
      );
    }
  };

  const {currency, crypto_params, advice, amount_daily_max_face, is_fiat} =
    walletData;

  if (is_fiat) {
    return null;
  }

  return (
    <SafeScrollContainer>
      <SafeContainer>
        <Text type="textMini" style={styles.amountDailyMaxStyle}>
          {t('deposit_cripto.deposit_limit')}{' '}
          <Text type="textMini" style={styles.amountDailyMaxAmountStyle}>
            {amount_daily_max_face} {currency.code}
          </Text>
        </Text>
        <Row>
          <Text type="textMini" style={styles.amountDailyMaxStyle}>
            {t('common.fee')}:
          </Text>
          <Text type="textMini" style={styles.amountDailyMaxAmountStyle}>
            {' '}
            {network?.fee_value}
          </Text>
        </Row>
        {!is_fiat && crypto_params?.addresses.length > 1 && (
          <NetworkModal
            data={crypto_params}
            value={network}
            onPress={setNetwork}
          />
        )}
        <ContainerItem>
          <Text type="t6" textAlign="center">
            {t('common.address')}
          </Text>
          <View style={styles.qrCodeContainerStyle}>
            <Image
              source={{uri: network?.qr_code}}
              style={styles.qrCodeStyle}
            />
          </View>
        </ContainerItem>

        <ContainerItem containerStyle={styles.addressContainerStyle}>
          <Text type="t6">{t('common.address')}</Text>
          <Text type="btnSmall" style={styles.addressStyle}>
            {network?.address}
          </Text>
          <Link title={t('common.copy')} onPress={onCopy} />
        </ContainerItem>

        <Text type="t5">{advice?.header}</Text>
        <HtmlReader data={advice?.content} />
      </SafeContainer>
    </SafeScrollContainer>
  );
}

export default Refill;
