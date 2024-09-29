import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';

import styles from './styles';
import GradientContainer from '@components/containers/GradientContainer';
import BonusCard from '@screens/Dashboard/BonusCard';
import {useSelector} from 'react-redux';
import {selectBonusAccount} from '@store/bonusAccount/selectors';

interface IWalletDashboardProps {
  isSecure: boolean;
  total_usd?: number;
  available?: string;
  used?: string;
}

const WalletDashboard = ({
  total_usd,
  available,
  used,
  isSecure,
}: IWalletDashboardProps) => {
  const {t} = useTranslation();
  const {balance} = useSelector(selectBonusAccount);

  return (
    <View style={styles.containerStyle}>
      <GradientContainer contentContainerStyle={styles.cashContainerStyle}>
        <Text type="t2" style={styles.balanceText}>
          {t('invest_mn.main_balance')}
        </Text>
        <Text type="t2">{isSecure ? '****' : `$ ${total_usd}`}</Text>
      </GradientContainer>

      {balance && <BonusCard hideButton />}

      <Row justifyContent="space-between">
        <GradientContainer
          containerStyle={{flex: 1}}
          contentContainerStyle={styles.smallCashContainerStyle}>
          <Text type={'t6'} style={styles.textSecondary}>
            {t('common.available')}
          </Text>
          <Text type="t6">{isSecure ? '****' : available} BTCa</Text>
        </GradientContainer>
        <View style={{width: 15}} />
        <GradientContainer
          containerStyle={{flex: 1}}
          contentContainerStyle={styles.smallCashContainerStyle}>
          <Text type="t6" style={styles.textSecondary}>
            {t('assets.m_frozen')}
          </Text>
          <Text type="t6" style={styles.freezeValue}>
            {isSecure ? '****' : used} BTCa
          </Text>
        </GradientContainer>
      </Row>
    </View>
  );
};

export default memo(WalletDashboard);
