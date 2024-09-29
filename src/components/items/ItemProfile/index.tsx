import React from 'react';
import {Pressable, View} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import ContainerItem from '@components/containers/ContainerItem';
import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';
import Text from '@components/textes/Text';
import IconGradient from '@components/icons/IconGradient';

import {scaledSize} from '@utils/scaledSize';

import styles from './styles';

import {onSuccessMessage} from '@store/app';

interface IItemProfile {
  email: string;
  id: number;
  vipCounter: string;
}

const ItemProfile = ({email, id, vipCounter}: IItemProfile) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const onCopy = () => {
    Clipboard.setString(id.toString());

    dispatch(onSuccessMessage(t('common.copy_clipboard')));
  };
  return (
    <ContainerItem containerStyle={styles.containerStyle}>
      <Row justifyContent="space-between">
        <Row>
          <IconGradient
            name="crown"
            size={scaledSize(12)}
            containerStyle={styles.crownContainerStyle}
          />
          <View>
            <Text type="btnRegular" style={styles.counterStyle}>
              {vipCounter}
            </Text>
            <Text>{email}</Text>
          </View>
        </Row>
      </Row>
      <Pressable onPress={onCopy}>
        <Row containerStyle={styles.bottomContainerStyle}>
          <Text type="textSmall" style={styles.labelStyle}>
            ID: {id}
          </Text>
          <Icon name="copy" size={16} />
        </Row>
      </Pressable>
    </ContainerItem>
  );
};

export default ItemProfile;
