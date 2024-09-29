import React from 'react';
import Text from '@components/textes/Text';
import ButtonLink from '@components/buttons/ButtonLink';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import {onErrorMessage} from '@store/app';
import {useDispatch} from 'react-redux';

/**
 * Attach file group
 * @param {function} addPhoto
 * @param {object} file
 */
const AttachFileGroup = ({addPhoto, file}: any) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const primaryMain = EStyleSheet.value('$primaryMain');

  const onPressAdd = async (key: string) => {
    try {
      const photo = await ImagePicker.openPicker({
        multiple: false,
        mediaType: 'photo',
        forceJpg: true,
        cropping: true,
      });

      if (photo.size / 1000 > 8192) {
        dispatch(onErrorMessage(t('input.m_photo-size')));
        return;
      } else {
        const tempFilenameArray = photo.path.split('/');
        const tempFilename = tempFilenameArray[tempFilenameArray.length - 1];

        const newPhoto = {
          type: photo.mime,
          name: photo.filename || tempFilename,
          uri: photo.path,
        };
        addPhoto(key, newPhoto);
      }
    } catch (err) {
      console.log('Error when pick images: ', err.message);
    }
  };

  const {certificate, article} = file;

  const cerTitle = certificate
    ? certificate.filename || t('common.m_added')
    : t('common.attach_file');
  const articleTitle = article
    ? article.filename || t('common.m_added')
    : t('common.attach_file');

  return (
    <>
      <Text type="t6" style={styles.label}>
        {t('input.label_certificate')}
      </Text>
      <ButtonLink
        withIcon
        icon={{name: certificate ? 'file' : 'plus', color: primaryMain}}
        title={cerTitle}
        containerStyle={styles.buttonContainerStyle}
        onPress={() => onPressAdd('certificate')}
      />
      <Text type="t6" style={styles.label}>
        {t('input.label_article')}
      </Text>
      <ButtonLink
        withIcon
        icon={{name: article ? 'file' : 'plus', color: primaryMain}}
        title={articleTitle}
        containerStyle={styles.buttonContainerStyle}
        onPress={() => onPressAdd('article')}
      />
    </>
  );
};

const styles = EStyleSheet.create({
  buttonContainerStyle: {
    marginVertical: 5,
    borderColor: '$primaryMain',
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'dashed',
    padding: 10,
  },
  label: {
    marginTop: 15,
  },
  alertText: {
    color: '$red',
    marginVertical: 30,
  },
});

export default AttachFileGroup;
