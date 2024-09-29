import React, {useState} from 'react';
import ModalCustom from '@components/modals/ModalCustom';
import Text from '@components/textes/Text';
import {TouchableOpacity} from 'react-native';
import Icon from '@components/icons/Icon';
import {useTranslation} from 'react-i18next';
import RoundCheckBox from '@components/checkboxes/RoundCheckBox';
import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils/scaledSize';

/**
 * InfoMatsernodModal to choose network for withdraw
 * @param {array} data
 * @param {func} onPress
 * @param {object} value
 */
const NetworkWithdrawModal = ({data, onPress, value}) => {
  const {t} = useTranslation();
  const [visible, setVisibleModal] = useState(false);
  const selectedColor = EStyleSheet.value('$primaryMain');

  const renderNetworks = () => {
    return data.networks.map(item => {
      const isSelected = value?.value === item.value;

      const onPressItem = () => {
        onPress(item);
        setVisibleModal(false);
      };
      return (
        <TouchableOpacity
          key={item.name}
          onPress={onPressItem}
          style={styles.itemContainerStyle}>
          <RoundCheckBox
            disabled={true}
            isSelected={isSelected}
            selectedColor={selectedColor}
          />
          <Text type="textRegular">{item.name}</Text>
        </TouchableOpacity>
      );
    });
  };

  if (!data.networks.length) {
    return null;
  } else {
    return (
      <>
        <Text>{t('common.network')}</Text>
        <TouchableOpacity
          style={styles.pickerContainerStyle}
          onPress={() => setVisibleModal(true)}>
          <Text type="btnSmall" style={styles.pickerTitleStyle}>
            {value?.name}
          </Text>
          <Icon name="arrow-down" />
        </TouchableOpacity>
        <ModalCustom onClose={() => setVisibleModal(false)} visible={visible}>
          {renderNetworks()}
        </ModalCustom>
      </>
    );
  }
};

const styles = EStyleSheet.create({
  itemContainerStyle: {
    height: scaledSize(56),
    backgroundColor: '$white5',
    marginVertical: scaledSize(4),
    borderRadius: scaledSize(8),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scaledSize(16),
  },
  pickerContainerStyle: {
    height: scaledSize(32),
    borderWidth: 1,
    borderColor: '$white10',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaledSize(8),
    borderRadius: scaledSize(8),
    marginBottom: scaledSize(8),
  },
  pickerTitleStyle: {
    color: '$white75',
  },
});

export default NetworkWithdrawModal;
