import React, {useCallback, useEffect, useState, useLayoutEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Text from '@components/textes/Text';
import PickerCurrency from '@components/pickers/PickerCurrency';
import SafeContainer from '@components/containers/SafeContainer';
import ButtonGradient from '@components/buttons/ButtonGradient';
import Crypto from './Crypto';
import Fiat from './Fiat';
import {getWithdrawal} from '@store/account';
import {getUserInfo, selectUser} from '@store/auth';
import {WithdrawalScreenProps} from '@navigation/config/types';
import {stylesGlobal} from '@constants/globalStyles';
import styles from './styles';
import {selectWallet} from '@store/account/selectors';

function Withdrawal({navigation, route}: WithdrawalScreenProps) {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const params = route.params;

  const [selectedWallet, setSelectedWallet] = useState(
    undefined as undefined | any,
  );
  const {is_verified} = useSelector(selectUser);
  const walletData = useSelector(selectWallet);

  const onVerification = () => navigation.navigate('VerificationProfile');

  useEffect(() => {
    if (selectedWallet) {
      dispatch(getWithdrawal({id: selectedWallet.id}));
    }
    if (!is_verified) {
      dispatch(getUserInfo());
    }
  }, [selectedWallet]);

  const HeaderRight = useCallback(() => {
    const onPress = () => {
      navigation.navigate('History', {
        screen: 'HistoryPutOut',
        params: {
          currencyId: walletData.currency.id,
        },
      });
    };
    return (
      <TouchableOpacity onPress={onPress} style={styles.btnRightContainer}>
        <Text type="textRegular" style={styles.btnRightTitleStyle}>
          {t('common.m_history')}
        </Text>
      </TouchableOpacity>
    );
  }, [walletData]);

  useLayoutEffect(() => {
    if (selectedWallet) {
      navigation.setOptions({
        headerRight: HeaderRight,
      });
    }
  }, [navigation, HeaderRight, selectedWallet]);

  return (
    <SafeContainer>
      <PickerCurrency
        initCurrencyId={params?.currencyId || walletData.currency.id}
        type="putOut"
        value={selectedWallet}
        onPress={setSelectedWallet}
      />
      {!selectedWallet?.is_fiat ? (
        <Crypto selectedWallet={selectedWallet} />
      ) : is_verified ? (
        <Fiat selectedWallet={selectedWallet} />
      ) : (
        <View style={stylesGlobal.emptyContainerStyle}>
          <Text type="t5" textAlign="center">
            {t('verify_user.m_identity')}
          </Text>
          <Text
            type="description"
            style={styles.subtitleStyle}
            textAlign="center">
            {t('verify_user.m_identity_description', {
              name: selectedWallet?.name,
            })}
          </Text>
          <ButtonGradient
            title={t('verify_user.m_identity')}
            onPress={onVerification}
          />
        </View>
      )}
    </SafeContainer>
  );
}

export default Withdrawal;
