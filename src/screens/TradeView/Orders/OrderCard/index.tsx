import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import st from './styles';
import {ChevronDown} from '@assets/svgs';
import {Order} from '@store/tradeview';
import moment from 'moment';
import {toFixed} from '@utils/toFixed';

interface Props {
  data: Order;
  onCancel?: (id: number) => void;
}

function InvestmentCard({data, onCancel}: Props) {
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);

  const onCancelPress = () => onCancel?.(data.id);

  return (
    <View style={st.container}>
      <View style={st.row}>
        <TouchableOpacity
          onPress={() => setOpen(!open)}
          style={open ? st.closeIcon : null}>
          <ChevronDown />
        </TouchableOpacity>

        <Text style={st.value}>
          {moment(data.time * 1000).format('YYYY/MM/DD hh:mm:ss')}
        </Text>
        <Text style={st.value}>{data.pair}</Text>
        <Text
          style={[st.value, data.side === 'buy' ? st.greenText : st.redText]}>
          {data.side_name}
        </Text>
      </View>
      {open && (
        <>
          <View style={st.row}>
            <Text style={st.key}>{t('common.type')}</Text>
            <Text style={st.value} numberOfLines={1} ellipsizeMode={'middle'}>
              {data.type.name}
            </Text>
          </View>
          <View style={st.row}>
            <Text style={st.key}>{t('common.price')}</Text>
            <Text style={st.value}>{data.price}</Text>
          </View>
          <View style={st.row}>
            <Text style={st.key}>{t('common.sum')}</Text>
            <Text style={st.value}>
              {toFixed(data.quantity)} / {toFixed(data.start_quantity)}
            </Text>
          </View>
          <View style={st.row}>
            <Text style={st.key}>{t('common.filled')}</Text>
            <Text style={st.value}>{data.filled}%</Text>
          </View>
          <View style={st.row}>
            <Text style={st.key}>{t('common.total')}</Text>
            <Text style={st.value}>{toFixed(data.volume)}</Text>
          </View>
          <View style={st.row}>
            <Text style={st.key}>{t('common.status')}</Text>
            <Text style={st.status}>{data.status.name}</Text>
          </View>
          {Boolean(onCancel) && (
            <TouchableOpacity onPress={onCancelPress} style={st.row}>
              <Text style={st.cancel}>{t('common.cancel')}</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

export default InvestmentCard;
