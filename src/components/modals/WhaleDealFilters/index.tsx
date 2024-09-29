import React from 'react';
import {FlatList, Pressable, View} from 'react-native';
import Text from '@components/textes/Text';
import {useDispatch, useSelector} from 'react-redux';

import {Checkbox} from '@assets/svgs/actions';
import {hideModal} from '@store/modal';
import st from './styles';
import {
  getWhaleDealsReq,
  selectWhaleDealFilters,
  selectWhaleDealTypes,
  setWhaleDealFilters,
} from '@store/tradeview';

export default function WhaleDealFilters() {
  const dispatch = useDispatch();
  const whaleDealTypes = useSelector(selectWhaleDealTypes);
  const whaleDealFilters = useSelector(selectWhaleDealFilters);

  const handleSelect = (value: any) => () => {
    const index = whaleDealFilters.indexOf(value);

    index < 0
      ? whaleDealFilters.push(value)
      : whaleDealFilters.splice(index, 1);

    dispatch(setWhaleDealFilters(whaleDealFilters));
    dispatch(getWhaleDealsReq(whaleDealFilters));
  };

  const renderItem = ({item}: any) => {
    const {value, name} = item;
    return (
      <View style={st.row}>
        <Text type={'t4'} style={{textTransform: 'capitalize'}}>
          {name}
        </Text>
        <Pressable onPress={handleSelect(value)}>
          <Checkbox checked={whaleDealFilters.includes(value)} />
        </Pressable>
      </View>
    );
  };

  const closeModal = () => dispatch(hideModal());

  return (
    <View style={st.container}>
      <Pressable style={{flex: 1}} onPress={closeModal} />
      <View style={st.sheet}>
        <View style={st.indicator} />
        <FlatList
          data={whaleDealTypes}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
