import React from 'react';
import HTML from 'react-native-render-html';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import Text from '@components/textes/Text';

import useFetch from '@hooks/useFetch';
import {TermsOfUseDetailProps} from '@navigation/config/types';

import {PAGES_REGISTERED_LIST_DETAIL} from '@api';

import styles, {htmlTagsStyle} from './styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Pressable, View} from 'react-native';
import Icon from '@components/icons/Icon';

interface IPageDetail {
  id: number;
  slug: string;
  header: string;
  content: string;
  photo: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

export default function TermsOfUseDetail({
  navigation,
  route,
}: TermsOfUseDetailProps) {
  const {slug, title, backAction} = route.params;

  const ButtonLeft = (props: any) => {
    const {canGoBack} = props;
    const white50 = EStyleSheet.value('$white50');
    const handleBack = () => {
      if (backAction) {
        backAction();
      }
      navigation.goBack();
    };
    return (
      canGoBack && (
        <Pressable onPress={handleBack}>
          <View style={styles.containerStyle}>
            <Icon name="arrow-left" color={white50} size={20} />
          </View>
        </Pressable>
      )
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerLeft: ButtonLeft,
    });
  }, [navigation, title]);

  const {
    response = {} as IPageDetail,
    isLoading,
    error,
  } = useFetch<IPageDetail>({
    url: `${PAGES_REGISTERED_LIST_DETAIL}/${slug}`,
  });

  const {header, content} = response;

  return (
    <SafeScrollContainer loading={isLoading}>
      <Text type="t2" style={styles.titleStyle}>
        {header}
      </Text>
      <HTML source={{html: content}} tagsStyles={htmlTagsStyle} />
    </SafeScrollContainer>
  );
}
