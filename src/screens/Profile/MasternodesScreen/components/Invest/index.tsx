import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';

import st from './styles';
import ButtonGradient from '@components/buttons/ButtonGradient';
import {useTranslation} from 'react-i18next';
import InputText from '@components/inputs/InputText';
import {makeInvestment} from '@store/masterNodesX10';
import {useDispatch, useSelector} from 'react-redux';
import {hideModal} from '@store/modal';
import {selectMasterNodes} from '@store/masterNodesX10/selectors';

export default function Invest() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const {balance_face} = useSelector(selectMasterNodes);

  const handleSubmit = () => {
    dispatch(
      makeInvestment({
        amount: +amount,
        multipleReward: true,
      }),
    );
  };

  const handleChange = (val: string) => {
    setAmount(val.replace(/(\.|,)+/g, '.'));
  };

  const closeModal = () => dispatch(hideModal());

  return (
    <KeyboardAvoidingView
      style={{flex: 1, width: '100%'}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View style={st.container}>
        <Pressable style={{flex: 1}} onPress={closeModal} />
        <View style={st.sheet}>
          <View style={st.indicator} />
          <Text style={st.title}>{t('common.investing')}</Text>
          <Text style={st.textDarkSmall}>{t('invest_mn.want_to_invest')}</Text>
          <InputText
            value={amount}
            onChangeText={handleChange}
            keyboardType="numeric"
            addAfter={
              <View style={st.after}>
                <Pressable
                  onPress={() => {
                    setAmount(balance_face);
                  }}>
                  <Text style={st.textActive}>{t('common.all')}</Text>
                </Pressable>
                <View style={st.line} />
                <Text style={st.textDark}>BTCa</Text>
              </View>
            }
          />
          <Text>
            <Text style={st.textDarkSmall}>
              {t('common.available_balance')}{' '}
            </Text>
            <Text style={st.textSmall}> {balance_face} BTCa</Text>
          </Text>
          <View style={st.buttonContainer}>
            <ButtonGradient
              disabled={false}
              title={t('common.to_invest')}
              onPress={handleSubmit}
              gradientColors={['#00FF75', '#0075FF']}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
