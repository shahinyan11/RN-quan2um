import React from 'react';
import {Text, View} from 'react-native';

import st from './styles';
import ButtonGradient from '@components/buttons/ButtonGradient';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {hideModal} from '@store/modal';
import {onWithdrawal} from '@store/ecomining';

export type WithdrawalProps = {
  id: number;
  canWithdrawal: boolean;
};

export default function Withdrawal({id, canWithdrawal}: WithdrawalProps) {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const closeModal = () => dispatch(hideModal());

  const handleConfirm = () => {
    if (canWithdrawal) {
      dispatch(onWithdrawal(id));
    }

    closeModal();
  };

  return (
    <View style={st.container}>
      <View style={st.sheet}>
        <View style={{flex: 1}}>
          <View style={st.indicator} />
          <Text style={st.title}>{t('common.withdrawal_process')}</Text>
          <Text style={st.text}>
            {canWithdrawal
              ? t('invest_mn.you_are_going_to_withdraw', {
                  name: 'Monika Vendredi #0005',
                })
              : t('invest_mn.to_withdraw_funds_and_close')}
          </Text>
        </View>
        <View style={st.row}>
          <ButtonGradient
            containerStyle={st.buttonContainer}
            title={t('common.confirm')}
            onPress={handleConfirm}
            gradientColors={['#00FF75', '#0075FF']}
          />
          {canWithdrawal && (
            <ButtonGradient
              containerStyle={st.buttonContainer}
              title={t('common.cancel')}
              onPress={handleConfirm}
              gradientColors={['#FF9595', '#FF0A0A']}
            />
          )}
        </View>
      </View>
    </View>
  );
}
