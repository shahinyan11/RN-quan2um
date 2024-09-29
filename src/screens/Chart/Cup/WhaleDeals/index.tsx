import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import st from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {selectWhaleDeals} from '@store/tradeview';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@assets/svgs';
import {showModal} from '@store/modal';

const WhaleDeals = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const whaleDeals = useSelector(selectWhaleDeals);

  const handlePress = () => {
    dispatch(showModal({modalType: 'WHALE_DEAL_FILTERS'}));
  };

  return (
    <View style={st.container}>
      <TouchableOpacity style={st.select} onPress={handlePress}>
        <Text style={st.selectText}>{t('common.events')}</Text>
        <ChevronDown color={'#02AFFB'} size={24} />
      </TouchableOpacity>
      {whaleDeals.map(
        ({id, period_key, time, code, color, value, title_key, icon}) => {
          const pairDivided = code.split('/');
          return (
            <View style={st.deal} key={id}>
              <View style={{flex: 1}}>
                <View style={st.row}>
                  <Text style={st.text}>
                    {pairDivided[0]}
                    <Text style={st.textDark}>/{pairDivided[1]}</Text>
                  </Text>
                  <Text style={[st.text, {color}]}>{value}</Text>
                </View>
                <View style={st.row}>
                  <Text style={[st.textSmall, st.textDark]}>
                    {moment(time * 1000).format('H:mm:ss')}
                  </Text>
                  <Text style={st.textSmall}>
                    {t(title_key)}
                    {period_key && t(period_key)}
                  </Text>
                </View>
              </View>
              <Image source={{uri: icon}} style={st.icon} />
            </View>
          );
        },
      )}
    </View>
  );
};

export default WhaleDeals;
