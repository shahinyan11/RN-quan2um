import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Row from '@components/containers/Row';
import ContainerItem from '@components/containers/ContainerItem';
import Text from '@components/textes/Text';
import ImageGradient from '@components/icons/ImageGradient';

import {Order} from '@store/tradeview/types';

import {scaledSize} from '@utils/scaledSize';
import {formatDate} from '@utils/fns';

import styles from './styles';

interface IItemOrderProps {
  data: Order;
  onCancel?: (id: number) => void;
  withCancel?: boolean;
}

const Block = ({
  children,
  label,
  value,
}: {
  label: string;
  children?: any;
  value?: string;
}) => (
  <View style={styles.blockContainerStyle}>
    <Text style={styles.labelStyle}>{label}</Text>
    {value && <Text type="textSmall">{value}</Text>}
    {Boolean(children) && children}
  </View>
);

const ProgressBar = ({filled}: {filled: string}) => (
  <View style={styles.progressBarStyle}>
    <View
      style={[styles.activeProgressStyle, {width: `${Math.round(+filled)}%`}]}
    />
    <Text type="tTiny" style={styles.labelProgressBarStyle}>{`${Math.round(
      +filled,
    )}%`}</Text>
  </View>
);

const ItemOrder = ({data, onCancel, withCancel = true}: IItemOrderProps) => {
  const {
    time,
    price,
    pair_format,
    type,
    side_name,
    can_cancel,
    quantity_face,
    start_quantity_face,
    filled,
    logo,
  } = data;
  const {
    base_currency,
    main_currency,
    main_color_hex,
    base_color_hex,
    base_color_hex2,
    main_color_hex2,
  } = logo.png;
  const {t} = useTranslation();

  const onPress = () => {
    if (onCancel) {
      onCancel(data.id);
    }
  };

  return (
    <ContainerItem>
      <Row
        justifyContent="space-between"
        containerStyle={styles.topContainerStyle}>
        <Row>
          <ImageGradient
            url={main_currency}
            colors={[main_color_hex, main_color_hex2]}
            iconSize={scaledSize(15)}
            iconContainerStyle={styles.iconLeftContainerStyle}
          />

          <ImageGradient
            iconSize={scaledSize(15)}
            url={base_currency}
            colors={[base_color_hex, base_color_hex2]}
            iconContainerStyle={styles.iconRightContainerStyle}
            containerStyle={styles.rightContainerStyle}
          />
          <Text type="t5">{pair_format}</Text>
        </Row>
        <Row>
          <Text type="textSmall" style={styles.dateStyle}>
            {formatDate(time, 'dd.MM.yyyy; HH:mm')}
          </Text>
          {can_cancel && withCancel && (
            <TouchableOpacity
              style={styles.btnContainerStyle}
              onPress={onPress}>
              <Text type="btnSmall">{t('common.m_cancel')}</Text>
            </TouchableOpacity>
          )}
        </Row>
      </Row>
      <Row>
        <Block label={t('common.price')} value={price} />
        <Block label={t('common.type')} value={side_name} />
        <Block label={t('common.type')} value={type.name} />
      </Row>
      <Row>
        <Block label={t('common.sum')}>
          <Text type="textSmall">
            {quantity_face}
            <Text type="textSmall" style={styles.subtitleStyle}>
              {` / ${start_quantity_face}`}
            </Text>
          </Text>
        </Block>
        <Block label={t('common.status')}>
          <ProgressBar filled={filled} />
        </Block>
      </Row>
    </ContainerItem>
  );
};

export default memo(ItemOrder);
