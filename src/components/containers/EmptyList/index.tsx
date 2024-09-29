import React, {memo} from 'react';
import {View} from 'react-native';

import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';
import {useTranslation} from 'react-i18next';

import {Props} from './types';
import st from './styles';

const EmptyList = ({title, icon, hideIcon, containerStyle}: Props) => {
  const {t} = useTranslation();

  return (
    <View style={[st.containerStyle, containerStyle]}>
      {!hideIcon && (
        <View style={st.iconContainer}>
          <Icon name={icon?.name || 'box'} size={40} />
        </View>
      )}
      <Text type="t4" style={st.textStyle}>
        {title || t('common.no_data')}
      </Text>
    </View>
  );
};

export default memo(EmptyList);
