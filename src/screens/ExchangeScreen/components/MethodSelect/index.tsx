import React from 'react';
import {
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';

import {Checkbox} from '@assets/svgs/actions';
import {scaledSize} from '@utils/scaledSize';
import {setSelectedMethod} from '@store/exchange';
import {
  selectExchangeStore,
  selectSelectedMethod,
} from '@store/exchange/selectors';
import Text from '@components/textes/Text';
import st from './styles';

export default function MethodSelect() {
  const dispatch = useDispatch();
  const {list} = useSelector(selectExchangeStore);
  const selectedMethod = useSelector(selectSelectedMethod);

  const handleCheck = (item: any) => {
    dispatch(setSelectedMethod(item));
  };

  return (
    <View style={st.container}>
      <View style={st.sheet}>
        <View style={st.indicator} />
        <Text type={'t3'} style={st.title}>
          Выберите статус
        </Text>
        <FlatList
          data={list}
          style={st.flatListContainer}
          showsVerticalScrollIndicator={true}
          renderItem={({item}) => (
            <TouchableWithoutFeedback>
              <View style={st.optionItem}>
                <View style={st.row}>
                  <SvgUri
                    width={scaledSize(30)}
                    height={scaledSize(30)}
                    uri={item?.bank_logo}
                  />
                  <Text
                    style={st.text}
                    numberOfLines={1}
                    ellipsizeMode={'clip'}
                    type={'t4'}>
                    {item.title}
                  </Text>
                </View>
                <Pressable onPress={() => handleCheck(item)}>
                  <Checkbox checked={item.method === selectedMethod.method} />
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          )}
          indicatorStyle={'white'}
          persistentScrollbar={true}
        />
      </View>
    </View>
  );
}
