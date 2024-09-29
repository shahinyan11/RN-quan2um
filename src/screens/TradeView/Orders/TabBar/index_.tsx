import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import st from './styles';
import {IconCup1, IconCup2} from '@assets/svgs/tabs';
import {useTranslation} from 'react-i18next';
import StaticTab from '@components/StaticTab';

function Header({
  isAlongside,
  onLeftTabChange,
  onRightTabChange,
  hidePrices,
}: any) {
  const {t} = useTranslation();

  return (
    <View style={st.header}>
      <View style={st.top}>
        <View style={{flex: 1}}>
          <StaticTab
            onChange={onLeftTabChange}
            tabStyle={st.mainTab}
            activeTabStyle={st.mainTabActive}
            textStyle={st.mainTabText}
            tabs={[
              {id: 1, name: t('common.m_orders-book')},
              {id: 2, name: 'Whale deals'},
            ]}
          />
        </View>
        <View style={st.orderTabCont}>
          <TouchableOpacity
            onPress={() => onRightTabChange(false)}
            style={isAlongside ? st.orderTab : st.orderTabActive}>
            <IconCup1 color={!isAlongside && '#191826'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onRightTabChange(true)}
            style={!isAlongside ? st.orderTab : st.orderTabActive}>
            <IconCup2 color={isAlongside && '#191826'} />
          </TouchableOpacity>
        </View>
      </View>
      {!hidePrices && (
        <View style={st.bottom}>
          <Text style={st.bottomText}>{t('common.count')}</Text>
          <View style={{flexDirection: 'row'}}>
            {isAlongside && (
              <Text style={[st.bottomText, st.price]}>{t('common.price')}</Text>
            )}
            <Text style={[st.bottomText, st.price]}>{t('common.price')}</Text>
          </View>
          <Text style={st.bottomText}>{t('common.count')}</Text>
        </View>
      )}
    </View>
  );
}

export default Header;
