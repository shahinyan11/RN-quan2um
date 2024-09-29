import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {deg} from 'react-native-linear-gradient-degree';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import WalletDashboard from '@components/other/WalletDashboard';
import Row from '@components/containers/Row';
import WalletsList from './WalletsList';
import {onChangeSecureMode, selectIsSecure} from '@store/app';
import {getAccountAssets, getAccountDashboard} from '@store/account';
import {selectAssets, selectDashboard} from '@store/account/selectors';
import Icon from '@components/icons/Icon';
import GradientContainer from '@components/containers/GradientContainer';
import Text from '@components/textes/Text';
import {Image, Pressable} from 'react-native';
import {coinFrame} from '@constants/images';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import styles from './styles';

function Wallet() {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const isSecure = useSelector(selectIsSecure);
  const assets = useSelector(selectAssets);
  const dashboard = useSelector(selectDashboard);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await Promise.all([
          dispatch(getAccountAssets()),
          dispatch(getAccountDashboard()),
        ]);

        setIsLoading(false);
      })();
    }, []),
  );

  const onChangeSecure = () => dispatch(onChangeSecureMode(!isSecure));

  const onPutIn = () => {
    navigation.navigate('Refill');
  };

  const onPutOut = () => {
    navigation.navigate('Withdrawal');
  };
  const onTransactions = () => {
    navigation.navigate('Transfer');
  };

  const handleExchangeClick = () => {
    navigation.navigate('Exchange');
  };

  return (
    <SafeScrollContainer loading={isLoading} containerStyle={{paddingTop: 20}}>
      <WalletDashboard {...dashboard} isSecure={isSecure} loading={isLoading} />

      <Row
        justifyContent="space-between"
        containerStyle={styles.controlPanelContainerStyle}>
        <GradientContainer
          containerStyle={styles.rowItemContainer}
          contentContainerStyle={styles.rowItemContentContainer}
          onPress={onPutIn}>
          <Icon name={'put-in'} size={16} />
          <Text type="btnMini" style={styles.buttonTitle}>
            {t('common.deposit')}
          </Text>
        </GradientContainer>

        <GradientContainer
          containerStyle={styles.rowItemContainer}
          contentContainerStyle={styles.rowItemContentContainer}
          onPress={onPutOut}>
          <Icon name={'put-out'} size={16} />
          <Text type="btnMini" style={styles.buttonTitle}>
            {t('common.withdraw')}
          </Text>
        </GradientContainer>

        <GradientContainer
          containerStyle={styles.rowItemContainer}
          contentContainerStyle={styles.rowItemContentContainer}
          onPress={onTransactions}>
          <Icon name={'credit-card'} size={16} />
          <Text type="btnMini" style={styles.buttonTitle}>
            {t('common.m_transfer')}
          </Text>
        </GradientContainer>

        <GradientContainer
          containerStyle={styles.eyeContainerStyle}
          contentContainerStyle={styles.rowItemContentContainer}
          onPress={onChangeSecure}>
          <Icon name={isSecure ? 'eye-closed' : 'eye'} size={16} />
        </GradientContainer>
      </Row>

      <Pressable onPress={handleExchangeClick}>
        <LinearGradient
          style={styles.gradientCard}
          colors={[
            'rgba(252, 194, 36, 0.15)',
            'rgba(252, 194, 36, 0)',
            'rgba(255, 255, 255, 0.1)',
          ]}
          {...deg(135)}>
          <Image source={coinFrame} style={styles.cardImage} />
          <Text type={'t4'}>{t('exchange.convenient_exchange')}</Text>
          <Text type={'t6'} style={styles.cardText}>
            {t('referral.exchange_top_coins')}
          </Text>
        </LinearGradient>
      </Pressable>

      <WalletsList isSecure={isSecure} data={assets?.currencies} />
    </SafeScrollContainer>
  );
}

export default Wallet;
