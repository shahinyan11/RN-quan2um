import React, {memo, useEffect, useState} from 'react';
import {
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';
import {IModalCustomProps} from '@components/modals/ModalCustom';
import SafeContainer from '@components/containers/SafeContainer';
import InputSearch from '@components/inputs/InputSearch';
import Divider from '@components/Divider';
import EmptyList from '@components/containers/EmptyList';

import styles from './styles';

import {stylesGlobal} from '@constants/globalStyles';
import {customSearch} from '@utils/index';

interface IPickerProps<T> {
  value: T;
  list: T[];
  onPress: (data: T) => void;
  keyField: keyof T;
  labelField: keyof T;
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
}

interface IModalPickerProps<T> extends IModalCustomProps {
  list: T[];
  labelField: keyof T;
  onPress: (data: T) => void;
  keyField: keyof T;
  value: T;
}

const ModalPicker = <T,>({
  visible = false,
  list,
  labelField,
  onClose,
  onPress,
  keyField,
  value,
}: IModalPickerProps<T>) => {
  const {t} = useTranslation();
  const primaryColor = EStyleSheet.value('$primaryMain');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState(
    undefined as undefined | T[],
  );

  useEffect(() => {
    const result = list.filter(item =>
      customSearch(item[labelField], searchQuery),
    );

    setFilteredList(result);
  }, [searchQuery, labelField, list]);

  const renderItem = ({item}: {item: T}) => {
    const isSelected = value[keyField] === item[keyField];

    const onPressItem = () => {
      onPress(item);
      onClose();
    };

    return (
      <TouchableOpacity onPress={onPressItem} style={styles.itemContainerStyle}>
        <Row justifyContent="space-between">
          <Text>{item[labelField]}</Text>
          {isSelected && (
            <Icon
              name="check"
              size={15}
              containerStyle={styles.iconContainerStyle}
              color={primaryColor}
            />
          )}
        </Row>
      </TouchableOpacity>
    );
  };

  if (!visible) return null;

  return (
    <Modal visible={visible}>
      <SafeContainer containerStyle={styles.modalContainerStyle}>
        <Row containerStyle={styles.headerContainerStyle}>
          <Icon
            name="arrow-left"
            disabled={false}
            onPress={onClose}
            containerStyle={styles.iconBackContainerStyle}
          />
          <InputSearch
            placeholder={t('common.search')}
            containerStyle={styles.inputSearchContainerStyle}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </Row>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredList || list}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
          contentContainerStyle={stylesGlobal.contentContainerStyle}
          ListEmptyComponent={EmptyList}
        />
      </SafeContainer>
    </Modal>
  );
};

const Picker = <T,>({
  value,
  list,
  onPress,
  keyField,
  labelField,
  placeholder = '',
  containerStyle,
}: IPickerProps<T>) => {
  const [isListShow, setListShow] = React.useState(false);

  useEffect(() => {
    const tempValue = list.find(item => item.id === value.id);

    if (tempValue) {
      onPress(tempValue);
    }
  }, [list]);

  const onChangeListVisible = () => setListShow(!isListShow);

  return (
    <View>
      <TouchableOpacity onPress={onChangeListVisible}>
        <View style={[styles.containerStyle, containerStyle]}>
          <Row justifyContent="space-between">
            <Text type="textSmall" style={styles.labelStyle}>
              {value[labelField] || placeholder}
            </Text>
            <Icon name="arrow-down" />
          </Row>
        </View>
      </TouchableOpacity>

      <ModalPicker<T>
        visible={isListShow}
        onClose={onChangeListVisible}
        list={list}
        labelField={labelField}
        onPress={onPress}
        keyField={keyField}
        value={value}
      />
    </View>
  );
};

export default memo(Picker) as typeof Picker;
