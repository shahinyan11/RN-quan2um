import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import ItemPair from './ItemPair';
import Divider from '@components/Divider';
import InputSearch from '@components/inputs/InputSearch';

import styles from './styles';

import {ITVPair, selectTVPairs, setPairCode} from '@store/tradeview';
import {customSearch} from '@utils/index';
import Icon from '@components/icons/Icon';
import Row from '@components/containers/Row';
import EStyleSheet from 'react-native-extended-stylesheet';

const CustomDivider = () => <Divider containerStyle={styles.dividerStyle} />;

/**
 * Pairs list screen with search input
 * @param navigation
 */
function PairsList({navigation}: StackScreenProps<any>) {
  const iconColor = EStyleSheet.value('$white50');
  const tradeView = useSelector(selectTVPairs);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [query, setQuery] = useState('');
  const [filteredPairs, setFilteredPairs] = useState(
    undefined as ITVPair[] | undefined,
  );

  const renderTVItem = ({item}: {item: ITVPair}) => {
    const onPressTVItem = () => {
      try {
        dispatch(setPairCode(item.pair.toLocaleLowerCase()));

        navigation.goBack();
      } catch (e) {
        console.log('Error getting pair');
      }
    };
    return (
      <ItemPair
        {...item.logo.png}
        name={item.pair_format}
        onPress={onPressTVItem}
      />
    );
  };

  useEffect(() => {
    if (query) {
      const fPairs = tradeView.filter(pair =>
        customSearch(pair.pair_format, query),
      );

      setFilteredPairs(fPairs);
    } else {
      setFilteredPairs(undefined);
    }
  }, [tradeView, query]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeContainer>
      <Row
        justifyContent="space-between"
        containerStyle={styles.containerHeader}>
        <Icon
          name="arrow-left"
          onPress={goBack}
          disabled={false}
          size={20}
          color={iconColor}
          containerStyle={styles.iconContainer}
        />
        <InputSearch
          placeholder={t('common.search')}
          containerStyle={styles.inputSearchContainerStyle}
          value={query}
          onChangeText={setQuery}
        />
      </Row>
      <Text type="t6" style={styles.titleStyle}>
        {t('common.m_search_results')}
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredPairs || tradeView}
        renderItem={renderTVItem}
        ItemSeparatorComponent={CustomDivider}
        keyExtractor={item => item.id.toString()}
      />
    </SafeContainer>
  );
}

export default PairsList;
