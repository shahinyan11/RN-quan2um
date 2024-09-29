import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import Text from '@components/textes/Text';

import st from './styles';
import {Checkbox} from '@assets/svgs/actions';
import {useDispatch} from 'react-redux';
import {setFilters} from '@store/filters';
import {hideModal} from '@store/modal';

const items = [
  {name: 'pending', checked: false},
  {name: 'canceled', checked: false},
];

export default function StatusSelect() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<number | null>(null);

  const handleCheck = (index: number) => {
    dispatch(
      setFilters({
        status: index !== checked ? items[index].name : null,
      }),
    );
    setChecked(index !== checked ? index : null);
  };

  const closeModal = () => dispatch(hideModal());

  return (
    <View style={st.container}>
      <Pressable style={{flex: 1}} onPress={closeModal} />
      <View style={st.sheet}>
        <View style={st.indicator} />
        <Text type={'t3'} style={st.title}>
          Выберите статус
        </Text>
        {items.map((item, index) => (
          <View style={st.row}>
            <Text type={'t4'} style={{textTransform: 'capitalize'}}>
              {item.name}
            </Text>
            <Pressable onPress={() => handleCheck(index)}>
              <Checkbox checked={index === checked} />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}
