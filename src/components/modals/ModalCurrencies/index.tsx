import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import Divider from '@components/Divider';
import Icon from '@components/icons/Icon';
import InputSearch from '@components/inputs/InputSearch';
import ImageGradient from '@components/icons/ImageGradient';
import EmptyList from '@components/containers/EmptyList';

import styles from './styles';
import {stylesGlobal} from '@constants/globalStyles';

import {Currency} from '@store/account/types';
import {customSearch, scaledSize} from '@utils/index';
import {clearWithdrawalForm} from '@store/account';

interface ModalCurrenciesProps {
  visible: boolean;
  onClose: () => void;
  data: Currency[];
  value: Currency;
  onPress: (value: Currency) => void;
}

const ModalCurrencies = ({
  visible,
  value,
  onClose,
  data,
  onPress,
}: ModalCurrenciesProps) => {
  const {t} = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState(
    undefined as Currency[] | undefined,
  );
  const primaryMain = EStyleSheet.value('$primaryMain');
  const background = EStyleSheet.value('$darkBackground');
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery) {
      const result = data.filter(
        currency =>
          customSearch(currency.name, searchQuery) ||
          customSearch(currency.code, searchQuery),
      );

      setSearchData(result);
    } else {
      setSearchData(undefined);
    }
  }, [searchQuery, data]);

  const renderCurrency = ({item}: {item: Currency}) => {
    const isSelected = item.id === value.id;
    const onPressItem = () => {
      dispatch(clearWithdrawalForm());
      onPress(item);
      onClose();
      setSearchQuery('');
    };
    return (
      <TouchableOpacity onPress={onPressItem}>
        <Row
          justifyContent="space-between"
          containerStyle={styles.itemContainerStyle}>
          <Row>
            <ImageGradient
              iconSize={scaledSize(15)}
              url={item.logo_png}
              colors={[item.color_hex, item.color_hex2]}
              iconContainerStyle={styles.iconContainerStyle}
            />

            <Text type="btnRegular" style={styles.titleStyle}>
              {item.slug}
            </Text>
            <Text style={styles.subtitleStyle}>{item.name}</Text>
          </Row>
          {isSelected && (
            <Icon
              name="check"
              size={15}
              color={primaryMain}
              containerStyle={styles.checkContainerStyle}
            />
          )}
        </Row>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={1}
      backdropColor={background}
      animationIn="slideInRight"
      animationOut="slideOutRight">
      <SafeContainer>
        <Row>
          <Icon
            disabled={false}
            name="arrow-left"
            containerStyle={styles.iconBackContainerStyle}
            onPress={onClose}
          />
          <InputSearch
            placeholder={t('common.search')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            containerStyle={styles.inpSearchContainerStyle}
          />
        </Row>
        <View style={styles.bodyContainerStyle}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchData || data}
            renderItem={renderCurrency}
            ItemSeparatorComponent={Divider}
            contentContainerStyle={stylesGlobal.contentContainerStyle}
            ListEmptyComponent={EmptyList}
          />
        </View>
      </SafeContainer>
    </Modal>
  );
};

export default ModalCurrencies;
