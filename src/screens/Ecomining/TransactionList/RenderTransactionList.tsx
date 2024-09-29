import EmptyList from '@components/containers/EmptyList';
import Row from '@components/containers/Row';
import Divider from '@components/Divider';
import Text from '@components/textes/Text';
import {formatDate} from '@utils/fns';

import React, {useEffect, useState} from 'react';
import {FlatList, TouchableWithoutFeedback, View} from 'react-native';
import styles from './style';

export interface RenderTransactionListProps {
  mappingData: any;
  isFlatList?: boolean;
}

function RenderTransactionList({
  mappingData,
  isFlatList,
}: RenderTransactionListProps) {
  const [formatedData, setFormatedData] = useState([]);

  useEffect(() => {
    setFormatedData(mappingData);
    return () => {
      setFormatedData([]);
    };
  }, [mappingData]);

  const RenderList = ({item, index, data}: any) => {
    const {node_name, node_code, time, code, amount_face, kind_name} = item;
    return (
      <TouchableWithoutFeedback>
        <View>
          <Row justifyContent="space-between" containerStyle={styles.container}>
            <View>
              <Row>
                <Text type="tTiny" style={styles.itemSecondary}>
                  {node_name}
                </Text>
                <Text type="tTiny" style={styles.itemSecondary}>
                  {node_code}
                </Text>
              </Row>
              <Text type="tTiny" style={styles.itemSecondary}>
                {formatDate(time)}
              </Text>
            </View>

            <Row>
              <Text
                type="textMiddle"
                style={[
                  styles.balanceText,
                  item?.is_replenishment && styles.greenHightLightedText,
                ]}>
                {item.is_replenishment ? '+' : '-'}
                {amount_face}
              </Text>
              <Text type="tTiny" style={styles.mininalText}>
                {code}
              </Text>
            </Row>

            <Text type="textMiddle" style={styles.typeTransaction}>
              {kind_name}
            </Text>
          </Row>
          {index < data.length - 1 && <Divider />}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <>
      {!isFlatList ? (
        <>
          {formatedData.map((item: any, index: any) => (
            <RenderList
              data={formatedData}
              item={item}
              index={index}
              key={index}
            />
          ))}
        </>
      ) : (
        <FlatList
          data={formatedData}
          renderItem={({item, index}) => (
            <RenderList
              data={formatedData}
              item={item}
              index={index}
              key={index}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={EmptyList}
        />
      )}
    </>
  );
}

export default RenderTransactionList;
