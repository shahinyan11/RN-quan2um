import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Row from '@components/containers/Row';
import Text from '@components/textes/Text';

import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: '$darkForms',
    marginHorizontal: scaledSize(8),
    marginBottom: scaledSize(12),
    borderRadius: scaledSize(20),
    height: scaledSize(40),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    textTransform: 'uppercase',
  },
  pressContainerStyle: {
    flex: 1,
  },
});

interface ISelectorProps {
  data: any;
  value: any;
  onPress: (item: any) => void;
}

const Selector = ({data, value, onPress}: ISelectorProps) => {
  const activeColor = EStyleSheet.value('$primaryFocus');

  const renderItem = (item: any) => {
    const isSelected = item.value === value?.value;

    const onSelect = () => {
      onPress(isSelected ? undefined : item);
    };

    return (
      <TouchableOpacity
        key={item.id.toString()}
        style={styles.pressContainerStyle}
        onPress={onSelect}>
        <View
          style={[
            styles.containerStyle,
            isSelected && {backgroundColor: activeColor},
          ]}>
          <Text type="btnMini" style={styles.labelStyle}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return <Row justifyContent="space-between">{data.map(renderItem)}</Row>;
};

export default Selector;
