import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import StaticTab from '@components/StaticTab';
import OpenOrders from './OpenOrders';
import st from './styles';
import OrdersHistory from './OrdersHistory';

function Orders() {
  const {t} = useTranslation();
  const [tab, setTab] = useState(1);

  return (
    <View>
      <StaticTab
        onChange={setTab}
        containerStyle={st.container}
        tabStyle={st.mainTab}
        activeTabStyle={st.mainTabActive}
        textStyle={st.mainTabText}
        tabs={[
          {id: 1, name: t('common.open_orders')},
          {id: 2, name: t('common.history_orders')},
        ]}
      />

      {tab === 1 && <OpenOrders />}
      {tab === 2 && <OrdersHistory />}
    </View>
  );
}

export default Orders;
