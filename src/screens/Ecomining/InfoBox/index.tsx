import React from 'react';
import Text from '@components/textes/Text';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {selectMasterNodeData} from '@store/ecomining';
import st from './styles';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
};

function InfoBox({containerStyle}: Props) {
  const {t} = useTranslation();
  const masterNodeData = useSelector(selectMasterNodeData);

  return (
    <View style={containerStyle}>
      <View style={st.row}>
        <Text type="t4" style={st.darkText}>
          {t('invest_mn.nodes_in_network')}:
        </Text>
        <Text type="t4">{masterNodeData?.coin?.total_master_nodes}</Text>
      </View>
      <View style={st.row}>
        <Text type="t4" style={st.darkText}>
          {t('invest_mn.roi').toUpperCase()}:
        </Text>

        <Text type="t4" style={st.greenText}>
          {t('common.plus_sign')}
          {` ${masterNodeData?.roi} `}
        </Text>
      </View>
      <View style={st.row}>
        <Text type="t4">{t('invest_mn.bonus_balance')}:</Text>
        <Text type="t4" style={st.greenText}>
          {masterNodeData?.bonus_wallet?.amount || 0}{' '}
          {masterNodeData?.currency?.code}
        </Text>
      </View>
      <View style={st.row}>
        <Text type="t4">{t('invest_mn.main_balance')}:</Text>
        <Text type="t4">
          {masterNodeData?.balance_face || 0}{' '}
          {masterNodeData?.currency?.slug?.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

export default InfoBox;
