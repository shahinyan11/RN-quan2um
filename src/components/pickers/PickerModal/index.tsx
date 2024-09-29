import React, {useState, memo, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';
import ModalBottom from '@components/modals/ModalBottom';
import {IFilterType} from '@constants/index';
import styles from './styles';
import ItemInterval from '@screens/TradeView/AdditionCharting/components/ItemInterval';

interface IPickerModalProps<T> {
  data: IFilterType<T>[];
  value: IFilterType<T>;
  onPress: (value: IFilterType<T>) => void;
}

const PickerModal = <T,>({data, value, onPress}: IPickerModalProps<T>) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const onChangeModalVisible = () => setModalVisible(!isModalVisible);

  const onPressItem = useCallback((item: any) => {
    onPress(item);
    setModalVisible(false);
  }, []);

  const renderItem = (item: IFilterType<T>) => {
    return (
      <ItemInterval
        item={item}
        value={value}
        onPressItem={onPressItem}
        key={item.id.toString()}
      />
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles.pickerContainerStyle}
        onPress={onChangeModalVisible}>
        <Text type="btnSmall" style={styles.pickerTitleStyle}>
          {value.title}
        </Text>
        <Icon name="arrow-down" />
      </TouchableOpacity>

      <ModalBottom visible={isModalVisible} onClose={onChangeModalVisible}>
        {data?.map(renderItem)}
      </ModalBottom>
    </>
  );
};

export default memo(PickerModal);
