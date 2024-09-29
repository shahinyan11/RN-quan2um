import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImagePicker, {Image as ImageProps} from 'react-native-image-crop-picker';

import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import Input from '@components/inputs/Input';
import ButtonGradient from '@components/buttons/ButtonGradient';
import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';
import ButtonLink from '@components/buttons/ButtonLink';
import Row from '@components/containers/Row';
import PickerCategory from './components/PickerCategory';

import {onSendQuestion} from '@store/pages';
import useFetch from '@hooks/useFetch';
import {ACCOUNT_SUPPORT_CATEGORIES_LIST} from '@api';

import styles from './styles';
import {StackScreenProps} from '@react-navigation/stack';

type ICategory = {
  id: number;
  name: string;
};

type IExtensions = {
  image: string;
};

type IFeedback = {
  categories: ICategory[];
  extensions: IExtensions;
};

/**
 * Feedback screen
 * @param {object} navigation - the inner object of navigation
 */
function Feedback({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [category, setCategory] = useState({} as ICategory);
  const [question, setQuestion] = useState('');
  const [picture, setPicture] = useState(
    undefined as undefined | {type: string; name: string; uri: string},
  );
  const red = EStyleSheet.value('$red');
  const primaryMain = EStyleSheet.value('$primaryMain');

  const [isValid, setValid] = useState(false);

  const {
    response = {
      categories: [],
      extensions: {image: ''},
    },
  } = useFetch<IFeedback>({
    url: ACCOUNT_SUPPORT_CATEGORIES_LIST,
  });

  const onAddPhoto = () => {
    ImagePicker.openPicker({
      cropping: true,
      forceJpg: true,
    }).then(({mime, path, filename}: ImageProps) => {
      setPicture({
        type: mime,
        name: filename || new Date().toDateString(),
        uri: path,
      });
    });
  };

  const onSuccess = () => navigation.goBack();

  const onSubmit = () => {
    dispatch(
      onSendQuestion({
        config: {
          category_id: category.id,
          comment: question,
          userfile: picture,
        },
        onSuccess,
      }),
    );
  };

  const onClearImage = () => setPicture(undefined);

  useEffect(() => {
    setValid(question.length > 25 && Boolean(category.id));
  }, [question, category.id]);

  return (
    <SafeScrollContainer>
      <View style={styles.mainContainerStyle}>
        <PickerCategory
          value={category}
          list={response.categories}
          onPress={setCategory}
        />
        <Input
          multiline={true}
          label={t('input.label_comment')}
          placeholder={t('input.label_describe_problem')}
          inputContainerStyle={styles.feedbackContainerStyle}
          containerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputMessageStyle}
          maxLength={500}
          value={question}
          onChangeText={setQuestion}
          isErrorVisible={question.length < 26}
          errorMessage={t('validation.message-26-characters')}
        />

        {picture?.name ? (
          <Row
            justifyContent="space-between"
            containerStyle={styles.imageWrapper}>
            <Image
              source={{uri: picture?.uri}}
              style={styles.imageStyle}
              resizeMode="stretch"
            />
            <Text style={styles.pictureNameStyle}>{picture?.name}</Text>
            <Icon
              disabled={false}
              name="close"
              color={red}
              onPress={onClearImage}
            />
          </Row>
        ) : (
          <ButtonLink
            withIcon
            icon={{name: 'plus', color: primaryMain}}
            title={t('common.attach_file')}
            onPress={onAddPhoto}
          />
        )}
      </View>
      <ButtonGradient
        disabled={!isValid}
        title={t('common.send')}
        onPress={onSubmit}
      />
    </SafeScrollContainer>
  );
}

export default Feedback;
