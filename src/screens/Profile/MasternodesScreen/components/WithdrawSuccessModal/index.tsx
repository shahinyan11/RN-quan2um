import React from 'react';
import {useDispatch} from 'react-redux';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {withdrawSuccess} from '@constants/images';
import {hideModal} from '@store/modal/actions';
import {Close} from '@assets/svgs';
import st from './styles';

export default function WithdrawSuccessModal() {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <View style={st.content}>
      <TouchableOpacity style={st.icon} onPress={handleClose}>
        <Close size={14} color={'white'} />
      </TouchableOpacity>
      <Image source={withdrawSuccess} style={st.image} />
      <Text style={st.title}>Вывод осуществляется</Text>
      <Text style={st.text}>
        На данный момент ваши средства замораживаются на срок 7 дней, после
        истечения этого срока будет выполнен вывод
      </Text>
    </View>
  );
}
