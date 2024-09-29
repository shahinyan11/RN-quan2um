import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';
import {IconsList} from '@components/icons/Icon/types';
import ModalBottom from '@components/modals/ModalBottom';

import {Currency} from '@store/tradeview/types';

import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  //OPeration InfoMatsernodModal
  itemLabelStyle: {
    color: '$white50',
  },
  itemContainerStyle: {
    height: scaledSize(24),
    marginVertical: scaledSize(8),
  },
  titleStyle: {
    marginBottom: scaledSize(10),
  },
});

const OperationModal = ({
  visible,
  mainCurrency,
  baseCurrency,
  onClose,
}: {
  visible: boolean;
  mainCurrency: Currency;
  baseCurrency: Currency;
  onClose: () => void;
}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const onPressItem =
    (operation: 'withdrawal' | 'refill', currencyId: number) => () => {
      onClose();
      if (operation === 'withdrawal') {
        navigation.navigate('Withdrawal', {
          currencyId,
        });
      } else {
        navigation.navigate('Refill', {
          currencyId,
        });
      }
    };

  const Item = ({
    operation,
    currency,
    icon,
    onPress,
  }: {
    operation: string;
    currency: string;
    icon: IconsList;
    onPress: () => void;
  }) => (
    <TouchableOpacity onPress={onPress}>
      <Row
        justifyContent="space-between"
        containerStyle={styles.itemContainerStyle}>
        <Row>
          <Text>{operation}</Text>
          <Text style={styles.itemLabelStyle}> ({currency})</Text>
        </Row>
        <Icon name={icon} size={scaledSize(16)} />
      </Row>
    </TouchableOpacity>
  );

  return (
    <ModalBottom visible={visible} onClose={onClose}>
      <Text type="t4" textAlign="center" style={styles.titleStyle}>
        {t('common.m_available_operations')}
      </Text>
      {mainCurrency.can_deposit && (
        <Item
          operation={t('common.deposit')}
          currency={mainCurrency.code}
          icon="put-in"
          onPress={onPressItem('refill', mainCurrency.id)}
        />
      )}
      {baseCurrency.can_deposit && (
        <Item
          operation={t('common.deposit')}
          currency={baseCurrency.code}
          icon="put-in"
          onPress={onPressItem('refill', baseCurrency.id)}
        />
      )}
      {mainCurrency.can_withdrawal && (
        <Item
          operation={t('common.withdraw')}
          currency={mainCurrency.code}
          onPress={onPressItem('withdrawal', mainCurrency.id)}
          icon="put-out"
        />
      )}
      {baseCurrency.can_withdrawal && (
        <Item
          operation={t('common.withdraw')}
          currency={baseCurrency.code}
          onPress={onPressItem('withdrawal', baseCurrency.id)}
          icon="put-out"
        />
      )}
    </ModalBottom>
  );
};

export default memo(OperationModal);
