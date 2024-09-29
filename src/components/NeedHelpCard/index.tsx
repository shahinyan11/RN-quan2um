import React, {useMemo, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import st from './styles';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';

type Props = {
  showCheckboxes?: boolean;
};

export default function NeedHelpCard({showCheckboxes}: Props) {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [checked, setChecked] = useState();

  const handleCheck = (item: any) => () => {
    setChecked(item);
  };

  const handleApply = () => {
    navigation.navigate(checked?.screen);
  };

  const arr = useMemo(() => {
    return [
      {
        id: 1,
        screen: 'FeesPersonalAssistance',
        name: t('common.persona_assistance'),
      },
      {id: 2, screen: 'FeesZakat', name: t('common.zakat')},
      {id: 3, screen: 'FeesSadaka', name: t('common.help_fund')},
    ];
  }, []);

  return (
    <View style={st.container}>
      <Text style={st.title}>{t('charity.do_you_need_help')}</Text>
      <Text style={st.description}>
        {t('charity.choose_type_of_assistance')}
      </Text>
      {showCheckboxes && (
        <View style={{marginBottom: 4}}>
          {arr.map(value => (
            <View style={st.row}>
              <Text style={st.helpType}>{value.name}</Text>
              <CheckBox
                onValueChange={handleCheck(value)}
                value={checked?.id === value.id}
                boxType={'square'}
                style={st.checkbox}
                tintColors={{true: 'white', false: 'white'}}
                tintColor={'white'}
                onCheckColor={'white'}
                onTintColor={'white'}
              />
            </View>
          ))}
        </View>
      )}

      <Pressable style={st.button} onPress={handleApply}>
        <Text style={st.buttonText}>{t('charity.to_apply')}</Text>
      </Pressable>
    </View>
  );
}
