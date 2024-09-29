import React, {memo, useEffect, useLayoutEffect, useCallback} from 'react';
import {FlatList, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import ItemQuestion from '@components/items/ItemQuestion';
import SafeContainer from '@components/containers/SafeContainer';
import Icon from '@components/icons/Icon';
import RefreshLoader from '@components/other/RefreshLoader';
import EmptyList from '@components/containers/EmptyList';

import {getSupportList} from '@store/account';
import {selectLoading, selectQuestions} from '@store/account/selectors';
import {IQuestion} from '@store/account/types';

import styles from './styles';
import {stylesGlobal} from '@constants/globalStyles';

function Questions({navigation}: StackScreenProps<any>) {
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestions);
  const loading = useSelector(selectLoading);

  const HeaderRight = useCallback(() => {
    const onPress = () => {
      navigation.navigate('Feedback');
    };
    return (
      <Icon
        disabled={false}
        name="plus"
        color={EStyleSheet.value('$primaryMain')}
        onPress={onPress}
        containerStyle={styles.plusContainerStyle}
      />
    );
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [navigation, HeaderRight]);

  useEffect(() => {
    dispatch(getSupportList());
  }, [dispatch]);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      dispatch(getSupportList());
    });

    return focusListener;
  }, [navigation, dispatch]);

  const onLoadMore = () => dispatch(getSupportList(true));

  const onRefresh = () => dispatch(getSupportList());

  const renderItem = ({item}: {item: IQuestion}) => <ItemQuestion {...item} />;

  return (
    <SafeContainer>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        refreshControl={
          <RefreshLoader refreshing={loading} onRefresh={onRefresh} />
        }
        data={questions}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReachedThreshold={0.2}
        onEndReached={onLoadMore}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={stylesGlobal.contentContainerStyle}
      />
    </SafeContainer>
  );
}

export default memo(Questions);
