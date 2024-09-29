import React, {useState} from 'react';
import ModalCustom from '@components/modals/ModalCustom';
import Text from '@components/textes/Text';
import {TouchableOpacity} from 'react-native';
import styles from '@components/pickers/PickerModal/styles';
import Icon from '@components/icons/Icon';
import {useTranslation} from 'react-i18next';
import RoundCheckBox from '@components/checkboxes/RoundCheckBox';
import EStyleSheet from 'react-native-extended-stylesheet';

/**
 * InfoMatsernodModal to choose network
 * @param {array} data
 * @param {func} onPress
 * @param {object} value
 */
const NetworkModal = ({data, onPress, value}) => {
  const {t} = useTranslation();
  const [visible, setVisibleModal] = useState(false);
  const selectedColor = EStyleSheet.value('$primaryMain');

  const renderNetworks = () => {
    return data?.addresses.map(item => {
      const isSelected = value?.network === item.network;

      const onPressItem = () => {
        onPress(item);
        setVisibleModal(false);
      };
      return (
        <TouchableOpacity
          key={item.network}
          onPress={onPressItem}
          style={styles.itemContainerStyle}>
          <RoundCheckBox
            disabled={true}
            isSelected={isSelected}
            selectedColor={selectedColor}
          />
          <Text type="textRegular">{item.network_name}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <>
      <Text>{t('common.network')}</Text>
      <TouchableOpacity
        style={styles.pickerContainerStyle}
        onPress={() => setVisibleModal(true)}>
        <Text type="btnSmall" style={styles.pickerTitleStyle}>
          {value?.network_name}
        </Text>
        <Icon name="arrow-down" />
      </TouchableOpacity>
      <ModalCustom onClose={() => setVisibleModal(false)} visible={visible}>
        {renderNetworks()}
      </ModalCustom>
    </>
  );
};

export default NetworkModal;
