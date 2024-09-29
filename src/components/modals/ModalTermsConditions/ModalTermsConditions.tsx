import React from 'react';
import Modal from 'react-native-modal';
import {View} from 'react-native';
import Text from '@components/textes/Text';
import Link from '@components/textes/Link';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation} from '@react-navigation/native';

import Loader from '@components/other/Loader';
import Button from '@components/buttons/Button';
import Row from '@components/containers/Row';
import ButtonGradient from '@components/buttons/ButtonGradient';
import {selectTermsList} from '@store/pages';

/**
 * InfoMatsernodModal window Terms and conditions
 */
const ModalTermsConditions = ({isVisible, hideModal, onConfirm}: any) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isLoadingPage = useSelector(store => store.pages.loading);
  const termsList = useSelector(selectTermsList);

  const linkTo = (term: any) => {
    hideModal(false);
    navigation.navigate('TermsOfUseDetail', {
      slug: term.slug,
      title: term.header,
      backAction: () => hideModal(true),
    });
  };

  const handleOnConfirm = () => {
    hideModal(false);
    onConfirm();
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.8}
      animationIn="slideInDown"
      animationOut="slideOutUp">
      <View style={styles.container}>
        <Text type="t3" style={styles.marginBottom}>
          {t('terms.terms_conditions')}
        </Text>
        <Text type="t6" style={styles.marginBottom}>
          {t('terms.confirm_terms_conditions')}
        </Text>
        {isLoadingPage ? (
          <Loader />
        ) : (
          termsList &&
          termsList.map((item: any) => (
            <View key={item.header}>
              <Link
                linkStyle={styles.link}
                onPress={() => linkTo(item)}
                title={item.header}
              />
            </View>
          ))
        )}
        <Row justifyContent="space-between">
          <Button
            title={t('common.cancel')}
            onPress={() => hideModal(false)}
            disabled={false}
            buttonContainerStyle={styles.cancelButton}
            containerStyle={styles.containerStyle}
          />
          <ButtonGradient
            title={t('common.confirm')}
            onPress={handleOnConfirm}
            disabled={false}
            containerStyle={styles.containerStyle}
            buttonContainerStyle={styles.confirmButton}
          />
        </Row>
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$darkBackground',
    borderRadius: 20,
    padding: 20,
  },
  cancelButton: {
    backgroundColor: '$red',
    marginRight: 5,
  },
  confirmButton: {
    marginLeft: 5,
  },
  containerStyle: {
    flex: 1,
  },
  link: {
    marginVertical: 3,
  },
  marginBottom: {
    marginBottom: 10,
  },
});

export default ModalTermsConditions;
