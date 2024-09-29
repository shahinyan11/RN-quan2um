import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Button from '@components/buttons/Button';
import {useTranslation} from 'react-i18next';
import st from './styles';

export default function TransactionsTab({onChange}) {
  const {t} = useTranslation();
  const [tab, setTab] = useState(1);

  useEffect(() => {
    onChange(tab);
  }, [onChange, tab]);

  return (
    <View style={st.buttonsRow}>
      <Button
        title={t('common.refill')}
        titleStyle={st.title}
        containerStyle={st.buttonContainer}
        onPress={() => setTab(1)}
        buttonContainerStyle={tab === 1 ? st.buttonGray : st.button}
      />
      <Button
        title={t('common.reward')}
        titleStyle={st.title}
        containerStyle={st.buttonContainer}
        onPress={() => setTab(2)}
        buttonContainerStyle={tab === 2 ? st.buttonGray : st.button}
      />
      <Button
        title={t('common.withdraw')}
        titleStyle={st.title}
        onPress={() => setTab(3)}
        buttonContainerStyle={tab === 3 ? st.buttonGray : st.button}
        containerStyle={st.buttonContainer}
      />
    </View>
  );
}
