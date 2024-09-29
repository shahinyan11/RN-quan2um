import React from 'react';
import {useDispatch} from 'react-redux';
import {Text, TouchableOpacity, View} from 'react-native';

import ButtonGradient from '@components/buttons/ButtonGradient';
import {hideModal} from '@store/modal/actions';
import {Close} from '@assets/svgs';
import st from './styles';
import {makeWithdrawal} from '@store/masterNodesX10';
import {onWithdrawal} from '@store/ecomining';
import {useTranslation} from 'react-i18next';

type Props = {
  id?: number;
};

export default function WithdrawConfirmModal({id}: Props) {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideModal());
  };

  const handleConfirm = () => {
    if (id) {
      dispatch(onWithdrawal(id));
      return;
    }

    dispatch(makeWithdrawal());
  };

  return (
    <View style={st.content}>
      <TouchableOpacity style={st.icon} onPress={handleClose}>
        <Close size={14} color={'white'} />
      </TouchableOpacity>
      <Text style={st.title}>{t('common.withdraw_process')}</Text>
      <Text style={st.text}>
        {t('invest_mn.do_you_really_want_to_withdraw')}
      </Text>
      <ButtonGradient
        disabled={false}
        title={t('common.confirm_withdraw')}
        onPress={handleConfirm}
        gradientColors={['#00FF75', '#0075FF']}
      />
    </View>
  );
}
