import React, {memo} from 'react';
import {scaledSize} from '@utils/scaledSize';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleProp,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import EStyleSheet, {ViewStyle} from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  backgroundContainerStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainerStyle: {
    backgroundColor: '$darkForms',
    padding: scaledSize(16),
    minHeight: scaledSize(300),
    borderTopRightRadius: scaledSize(20),
    borderTopLeftRadius: scaledSize(20),
  },
});

const ModalBottom = ({
  visible = false,
  children,
  onClose,
  height,
  modalContainerStyle,
}: {
  visible: boolean;
  children: any;
  onClose: () => void;
  height?: number;
  modalContainerStyle?: StyleProp<ViewStyle>;
}) => {
  if (!visible) {
    return null;
  }

  return (
    <Modal visible={true} transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backgroundContainerStyle}>
            <View
              style={[
                styles.modalContainerStyle,
                modalContainerStyle,
                {height: height},
              ]}
              onStartShouldSetResponder={() => true}>
              {children}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default memo(ModalBottom);
