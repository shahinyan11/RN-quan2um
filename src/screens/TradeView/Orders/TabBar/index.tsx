import React from 'react';
import {TabBar, TabBarIndicator} from 'react-native-tab-view';
import EStyleSheet from 'react-native-extended-stylesheet';
import st from './styles';

function CustomTabBar(props: any) {
  return (
    <TabBar
      {...props}
      gap={20}
      pressColor={null}
      style={st.container}
      tabStyle={st.tab}
      labelStyle={st.label}
      indicatorStyle={st.indicator}
      inactiveColor={EStyleSheet.value('$white50')}
      activeColor={EStyleSheet.value('$white')}
      renderIndicator={indicatorProps => {
        const {navigationState, getTabWidth} = indicatorProps;
        const {index} = navigationState;

        return (
          <TabBarIndicator {...indicatorProps} width={getTabWidth(index)} />
        );
      }}
    />
  );
}

export default CustomTabBar;
