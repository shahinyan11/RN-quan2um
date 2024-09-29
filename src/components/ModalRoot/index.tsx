import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RNModal from 'react-native-modal';
import MODAL_COMPONENTS from './components';
import {hideModal} from '@store/modal';
import {View} from 'react-native';
import st from './styles';

export default function ModalRoot() {
  const dispatch = useDispatch();
  const {modalType, modalProps} = useSelector(store => store.modal);
  const CurrentModal = MODAL_COMPONENTS[modalType];

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <RNModal
      coverScreen={false}
      style={{margin: 0}}
      isVisible={!!modalType}
      backdropOpacity={1}
      useNativeDriver={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection={'down'}
      propagateSwipe={true}
      swipeThreshold={100}
      onSwipeComplete={handleClose}
      onBackdropPress={handleClose}
      backdropColor={'rgba(41, 40, 57, 0.78)'}>
      <View style={st.container}>
        {modalType && <CurrentModal {...modalProps} />}
      </View>
    </RNModal>
  );
}
