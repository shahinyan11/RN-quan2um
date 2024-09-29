import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';

import {getTradeViewPair, selectPairCode} from '@store/tradeview';
import {TopTabBar} from '@navigation/components/TopTabBar';
import TradeView from '@screens/TradeView';
import Chart from '@screens/Chart';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scaledSize} from '@utils/scaledSize';

const Tab = createMaterialTopTabNavigator();

const TradeViewTab = () => {
  const dispatch = useDispatch();
  const pairCode = useSelector(selectPairCode);
  const insets = useSafeAreaInsets();
  const darkBackground = EStyleSheet.value('$darkBackground');

  useEffect(() => {
    dispatch(getTradeViewPair(pairCode));
  }, []);

  return (
    <Tab.Navigator
      tabBar={TopTabBar}
      swipeEnabled={false}
      style={{paddingTop: insets.top + scaledSize(30)}}
      sceneContainerStyle={{
        backgroundColor: darkBackground,
        paddingTop: scaledSize(20),
      }}
      lazy={true}>
      <Tab.Screen name="Chart" component={Chart} />
      <Tab.Screen name="TradeView" component={TradeView} />
    </Tab.Navigator>
  );
};

export default TradeViewTab;
