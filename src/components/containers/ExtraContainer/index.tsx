import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import Loader from '@components/other/Loader';
import Input from '@components/inputs/Input';
import ButtonLink from '@components/buttons/ButtonLink';

import {
  BankRequisite,
  PaymentSystem,
  PaymentSystemSlug,
} from '@store/account/types';
import {selectLoading} from '@store/account/selectors';
import {getWithdrawal, onDeleteBankScore} from '@store/account/actions';

import styles from './styles';

interface IItemExtraProps extends BankRequisite {
  onPress: () => void;
  onDelete: () => void;
  isSelected: boolean;
}

const ItemExtra = ({
  id,
  is_verified,
  iban,
  onPress,
  onDelete,
  isSelected,
}: IItemExtraProps) => {
  const primaryMain = EStyleSheet.value('$primaryMain');
  const {t} = useTranslation();

  const onRenderDeleteView = () => {
    return (
      <TouchableOpacity onPress={onDelete} style={styles.trashContainerStyle}>
        <Text type="btnSmall">{t('common.m_delete')}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable key={id.toString()} renderRightActions={onRenderDeleteView}>
      <TouchableOpacity disabled={!is_verified} onPress={onPress}>
        <Row
          justifyContent="space-between"
          containerStyle={[
            styles.itemContainerStyle,
            isSelected && {backgroundColor: primaryMain},
          ]}>
          <Text type="t5">{t('withdrawal_to_bank.bank_account')}:</Text>
          <Row>
            <Text style={styles.ibanStyle}>{iban}</Text>
            {!is_verified && (
              <Text type="label" style={styles.verifiedStyle}>
                {t('verification.verify_none')}
              </Text>
            )}
          </Row>
        </Row>
      </TouchableOpacity>
    </Swipeable>
  );
};

const ExtraContainer = ({
  slug,
  requisites,
  setRequisites,
  selectedPaymentSystem,
  onAddScore,
  setSelectedRequisite,
  selectedRequisite,
  walletId,
}: {
  walletId: number;
  slug: PaymentSystemSlug;
  requisites: string;
  selectedPaymentSystem: PaymentSystem;
  selectedRequisite: BankRequisite;
  onAddScore: () => void;
  setRequisites: (value: string) => void;
  setSelectedRequisite: (item: BankRequisite) => void;
}) => {
  const primaryMain = EStyleSheet.value('$primaryMain');
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const renderExtraItem = (item: BankRequisite) => {
    const isSelected = item.id === selectedRequisite?.id;

    const onPress = () => {
      setSelectedRequisite(item);
    };

    const onDelete = () => {
      dispatch(onDeleteBankScore([item.id]));

      dispatch(getWithdrawal({id: walletId}));
    };

    return (
      <ItemExtra
        key={item.id}
        {...item}
        isSelected={isSelected}
        onPress={onPress}
        onDelete={onDelete}
      />
    );
  };

  if (slug === 'bank-transfer') {
    return (
      <View>
        <Text type="label" style={styles.titleStyle}>
          {t('withdrawal_to_bank.withdraw_to')}
        </Text>
        <>
          {loading && <Loader size="small" />}
          {selectedPaymentSystem.extra.requisites?.map(renderExtraItem)}
        </>
        {(selectedPaymentSystem.extra.requisites?.length || 0) < 3 && (
          <ButtonLink
            withIcon
            type="label"
            icon={{name: 'plus', color: primaryMain}}
            title={t('withdrawal_to_bank.m_add_invoice')}
            onPress={onAddScore}
          />
        )}
      </View>
    );
  } else {
    return (
      <Input
        label={t('input.label_requisites')}
        placeholder={t('input.place_requisites')}
        value={requisites}
        onChangeText={setRequisites}
        containerStyle={styles.inpContainerStyle}
        maxLength={256}
      />
    );
  }
};

export default memo(ExtraContainer);
