import React from 'react';
import {useDispatch} from 'react-redux';
import {Text, TouchableOpacity, View} from 'react-native';
import {hideModal} from '@store/modal/actions';
import {Close} from '@assets/svgs';
import st from './styles';
import {useTranslation} from 'react-i18next';

export default function InfoCharity() {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <View style={st.content}>
      <TouchableOpacity style={st.icon} onPress={handleClose}>
        <Close size={14} color={'#373737'} />
      </TouchableOpacity>
      <Text style={st.title}>{t('common.charity')}</Text>
      <Text style={st.text}>
        {/*{t('charity.support_charities_and_people')}*/}
        Поддержите благотворительные фонды и людей, отправив пожертвование в
        криптовалюте. Каждый фонд и нуждающийся проходят экспертную и
        юридическую оценку, а блокчейн гарантирует, что всё дойдёт до получателя
        и не попадёт в руки мошенников
      </Text>
    </View>
  );
}
