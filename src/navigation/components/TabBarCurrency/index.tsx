import React from 'react';
import {View} from 'react-native';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';

import Row from '@components/containers/Row';
import Text from '@components/textes/Text';

import {TopTabBar} from '../TopTabBar';

import styles from './styles';

interface ITabBarCurrency extends MaterialTopTabBarProps {
  leftLabel: string;
  centerLabel: string;
  rightLabel: string;
}

const TabBarCurrency = (props: ITabBarCurrency) => {
  const {leftLabel, centerLabel, rightLabel} = props;
  return (
    <View>
      <TopTabBar {...props} />
      <Row
        justifyContent="space-between"
        containerStyle={styles.headerContainerStyle}>
        <View style={styles.columnContainerStyle}>
          <Text type="textMini" style={styles.labelStyle}>
            {leftLabel}
          </Text>
        </View>
        <View style={styles.columnContainerStyle}>
          <Text type="textMini" style={styles.centerLabelStyle}>
            {centerLabel}
          </Text>
        </View>
        <View style={styles.columnContainerStyle}>
          <Text type="textMini" style={styles.rightLabelStyle}>
            {rightLabel}
          </Text>
        </View>
      </Row>
    </View>
  );
};

export default TabBarCurrency;
