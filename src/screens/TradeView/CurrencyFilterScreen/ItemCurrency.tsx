import React from 'react';
import Row from '@components/containers/Row';
import styles from '@screens/TradeView/PairsList/styles';
import Text from '@components/textes/Text';
import {TouchableOpacity} from 'react-native';

const ItemCurrency = ({onPress, item}: any) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <Row
        justifyContent="space-between"
        containerStyle={styles.itemContainerStyle}>
        <Row containerStyle={styles.mainContainerStyle}>
          <Text type="btnSmall">{item.name}</Text>
        </Row>
      </Row>
    </TouchableOpacity>
  );
};

export default ItemCurrency;
