import React, {memo} from 'react';

import {Modal, View, TouchableWithoutFeedback} from 'react-native';

import styles from './styles';

export interface IModalCustomBottomProps {
  children?: any;
  visible: boolean;
  onClose: () => void;
}

const ModalCustom = ({children, visible, onClose}: IModalCustomBottomProps) => {
  if (!visible) {
    return null;
  }
  return (
    <Modal visible={visible} transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.windowStyle}>
          <View
            onStartShouldSetResponder={() => true}
            style={styles.modalWindowStyle}>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default memo(ModalCustom);
