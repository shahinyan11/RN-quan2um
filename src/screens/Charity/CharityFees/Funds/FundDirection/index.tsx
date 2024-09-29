import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import st from './styles';
import {setSelectedFundType} from '@store/charity';
import {selectCharityStore} from '@store/charity/selectors';

export default function ApplicationRegistration() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {fundTypes} = useSelector(selectCharityStore);

  const handlePress = (type: any) => () => {
    dispatch(setSelectedFundType(type));
    navigation.goBack();
  };

  return (
    <View style={st.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {fundTypes?.map(item => (
          <TouchableOpacity onPress={handlePress(item)}>
            <Text style={st.text}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
