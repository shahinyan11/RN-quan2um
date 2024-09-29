import React, {memo} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';

import Text from '@components/textes/Text';

import styles from './styles';

const FilterCurrency = ({
  filters,
  onPress,
  selectedFilter,
}: {
  selectedFilter: string;
  filters: string[];
  onPress: (value: string) => void;
}) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterCurrencyContainerStyle}>
        {filters.map((item, index) => {
          const isSelected = selectedFilter === item;
          const onPressFilter = () => {
            onPress(item);
          };
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.itemFilterContainerStyle,
                isSelected && styles.itemFilterSelectedContainerStyle,
              ]}
              onPress={onPressFilter}>
              <Text type="btnMini">{item}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default memo(FilterCurrency);
