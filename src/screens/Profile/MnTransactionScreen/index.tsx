import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {FlatList, TouchableOpacity, View} from 'react-native';

import TransactionCardMN from '@components/TransactionCardMN';
import SafeContainer from '@components/containers/SafeContainer';
import Button from '@components/buttons/Button';
import Text from '@components/textes/Text';
import * as SVG from '@assets/svgs';
import {getMasterNodesWithRewardHistory} from '@store/masterNodesX10';
import st from './styles';

export default function MnTransactionScreen({
  navigation,
}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [kind, setKind] = useState(1);
  const {history} = useSelector(state => state.masterNodesX10);

  useEffect(() => {
    dispatch(getMasterNodesWithRewardHistory(kind));
  }, []);

  useEffect(() => {
    dispatch(getMasterNodesWithRewardHistory(kind));
  }, [kind]);

  return (
    <SafeContainer>
      <View style={st.buttonsContainer}>
        <Button
          title={t('common.refill')}
          containerStyle={st.buttonContainer}
          onPress={() => setKind(1)}
          buttonContainerStyle={kind === 1 ? st.buttonGray : st.button}
        />
        <Button
          title={t('common.withdraw')}
          containerStyle={st.buttonContainer}
          onPress={() => setKind(2)}
          buttonContainerStyle={kind === 2 ? st.buttonGray : st.button}
        />
      </View>
      <View style={st.row}>
        <Text style={st.text}>
          {t(`assets.history_${kind === 1 ? 'deposit' : 'withdraw'}`)}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate({
              name: 'TransactionFilter',
              params: {filters: ['currency', 'status', 'info']},
            })
          }>
          <SVG.Filter />
        </TouchableOpacity>
      </View>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <TransactionCardMN item={item} />}
      />
    </SafeContainer>
  );
}
