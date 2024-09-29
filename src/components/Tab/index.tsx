import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import Button from '@components/buttons/Button';
import Props from './types';
import st from './styles';

export default function Tab({onChange, tabs, containerStyle}: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    onChange?.(activeTab);
  }, [onChange, activeTab]);

  return (
    <View style={[st.buttonsRow, containerStyle]}>
      {tabs.map(({id, name}) => (
        <Button
          key={id}
          title={name}
          titleStyle={st.title}
          containerStyle={st.buttonContainer}
          onPress={() => setActiveTab(id)}
          buttonContainerStyle={activeTab === id ? st.buttonGray : st.button}
        />
      ))}
    </View>
  );
}
