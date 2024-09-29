import {StyleProp, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';

import {navigationRef} from '@navigation/index';
import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';
import st from './styles';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  addRight: ReactNode;
  titleAlign?: 'left' | 'center' | 'right';
  title: string;
};

const ScreenHeader = ({
  containerStyle,
  titleAlign = 'center',
  addRight,
  title,
}: Props) => {
  const {t} = useTranslation();

  const goBack = () => {
    navigationRef.current?.goBack();
  };

  return (
    <View style={[st.container, containerStyle]}>
      <View>
        <Icon name="arrow-left" color={'white'} size={20} onPress={goBack} />
      </View>
      <Text style={[st.title, {textAlign: titleAlign}]}>{title}</Text>
      <View>{addRight}</View>
    </View>
  );
};

export default ScreenHeader;
