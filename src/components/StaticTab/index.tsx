import React, {useEffect, useMemo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Props from './types';
import st from './styles';

export default function StaticTab({
  onChange,
  tabs,
  containerStyle,
  activeTabStyle,
  tabStyle,
  textStyle,
  activeTextStyle,
}: Props) {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    setActiveTab(tabs[0].id);
  }, []);

  useEffect(() => {
    onChange?.(activeTab);
  }, [onChange, activeTab]);

  const styles = useMemo(() => {
    return {
      activeTabItem: [st.activeTabItem, tabStyle, activeTabStyle],
      tabItem: [st.tabItem, tabStyle],
      text: [st.text, textStyle],
      activeText: [st.activeText, textStyle, activeTextStyle],
    };
  }, [activeTabStyle, tabStyle, textStyle, activeTextStyle]);

  return (
    <View style={[st.container, containerStyle]}>
      {tabs.map(({id, name}) => (
        <TouchableOpacity
          key={id}
          onPress={() => setActiveTab(id)}
          style={id === activeTab ? styles.activeTabItem : styles.tabItem}>
          <Text style={id === activeTab ? styles.activeText : styles.text}>
            {name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
