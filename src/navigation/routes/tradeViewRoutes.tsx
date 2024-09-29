import React from 'react';

import {Stack} from '@navigation/MainNavigation';
import TradeViewTab from '@navigation/TradeViewTab';
import Chat from '@screens/Market/Chat';

const tradeViewRoutes = () => [
  <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}} />,
  <Stack.Screen
    name="TradeViewTab"
    component={TradeViewTab}
    options={{headerShown: false}}
  />,
];

export default tradeViewRoutes;
