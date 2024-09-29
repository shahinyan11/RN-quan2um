import React, {memo} from 'react';

import {View} from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

export interface IModalCustomProps {
  children?: any;
  visible: boolean;
  onClose: () => void;
}

const ModalCustom = ({children, visible, onClose}: IModalCustomProps) => {
  return (
    <Modal
      useNativeDriver={true}
      isVisible={visible}
      backdropOpacity={0.8}
      onBackdropPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <View style={styles.windowStyle}>{children}</View>
    </Modal>
  );
};

export default memo(ModalCustom);
