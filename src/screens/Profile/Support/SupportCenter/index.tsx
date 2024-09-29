import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import SafeContainer from '@components/containers/SafeContainer';
import InputSearch from '@components/inputs/InputSearch';
import Text from '@components/textes/Text';
import ContainerItem from '@components/containers/ContainerItem';
import HtmlReader from '@components/other/HtmlReader';
import Row from '@components/containers/Row';
import RefreshLoader from '@components/other/RefreshLoader';

import {
  getFaq,
  getFaqDetail,
  selectFaq,
  selectFaqCategories,
  selectLoading,
} from '@store/pages';
import {Answer, Category, Faq} from '@store/pages/types';

import styles from './styles';
import EmptyList from '@components/containers/EmptyList';

const TabHeader = ({
  selectedCategory,
  onPress,
}: {
  selectedCategory: number | undefined;
  onPress: (id: number | undefined) => void;
}) => {
  const categories = useSelector(selectFaqCategories);

  const renderItemCategory = (item: Category, index: number) => {
    const isActive = item.id === selectedCategory;

    const onSelect = () => onPress(isActive ? undefined : item.id);
    return (
      <TouchableOpacity key={index} onPress={onSelect}>
        <View style={[styles.tabStyle, isActive && styles.tabActiveStyle]}>
          <Row containerStyle={styles.tabContainerStyle}>
            {Boolean(item.icon) && (
              <View style={styles.iconContainerStyle}>
                <Image
                  source={{uri: item.icon}}
                  style={styles.iconStyle}
                  resizeMode="center"
                />
              </View>
            )}
            <Text type="btnSmall">{item.name}</Text>
          </Row>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.headerContainerStyle}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {categories?.map(renderItemCategory)}
      </ScrollView>
    </View>
  );
};

export default function SupportCenter({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const faq = useSelector(selectFaq);

  const [selectedCategory, setSelectedCategory] = useState(
    undefined as undefined | number,
  );
  const [answer, setAnswer] = useState({} as Answer);
  const [searchQuery, setSearchQuery] = useState('');

  const onRefreshFaq = () => {
    dispatch(getFaq());
  };

  const onLoadMore = () => {
    dispatch(getFaq({loadMore: true}));
  };

  useEffect(() => {
    dispatch(getFaq({keywords: searchQuery, category_id: selectedCategory}));
  }, [searchQuery, selectedCategory, dispatch]);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      dispatch(getFaq());
    });

    return focusListener;
  }, [navigation, dispatch]);

  const renderItemFaq = ({item}: {item: Faq}) => {
    const getDetail = () => {
      dispatch(getFaqDetail(item.id, setAnswer));
    };

    return (
      <TouchableOpacity onPress={getDetail}>
        <ContainerItem>
          <Text type="t5">{item.question}</Text>

          {item.id === answer.id && (
            <HtmlReader
              data={answer.answer}
              containerStyle={styles.contentContainerStyle}
            />
          )}
        </ContainerItem>
      </TouchableOpacity>
    );
  };

  return (
    <SafeContainer>
      <InputSearch
        placeholder={t('common.search')}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text type="t3" style={styles.titleStyle}>
        {t('common.categories')}
      </Text>

      <TabHeader
        selectedCategory={selectedCategory}
        onPress={setSelectedCategory}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={faq}
        renderItem={renderItemFaq}
        keyExtractor={item => item.id.toString()}
        refreshing={loading}
        refreshControl={
          <RefreshLoader refreshing={loading} onRefresh={onRefreshFaq} />
        }
        onEndReachedThreshold={0.2}
        onEndReached={onLoadMore}
        ListEmptyComponent={EmptyList}
      />
    </SafeContainer>
  );
}
