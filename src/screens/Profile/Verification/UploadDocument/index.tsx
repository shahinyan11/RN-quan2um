import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import Button from '@components/buttons/Button';
import ButtonLink from '@components/buttons/ButtonLink';
import ContainerWithLoader from '@components/containers/ContainerWithLoader';

import {stylesGlobal} from '@constants/globalStyles';
import styles from './styles';

import {
  onVerificationDeleteDocument,
  onVerificationSend,
  onVerificationUploadDocument,
} from '@store/account';
import {
  selectLoading,
  selectVerificationApplicationId,
  selectVerificationDocuments,
} from '@store/account/selectors';
import TakePhoto from './TakePhoto';
import getImageType from '@utils/getImageType';
import moment from 'moment';
import PreviewImage from '@screens/Profile/Verification/UploadDocument/PreviewImage';
import {navigationRef} from '@navigation/index';

type CameraOptions = {
  visible: boolean;
  selfie?: boolean;
};

export default function UploadDocuments() {
  const primaryMain = EStyleSheet.value('$primaryMain');

  const {t} = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const application_id = useSelector(selectVerificationApplicationId);
  const documents = useSelector(selectVerificationDocuments);
  const [isValid, setValid] = useState(false);
  const [cameraOptions, setCameraOptions] = useState<CameraOptions>({
    visible: false,
    selfie: false,
  });

  useEffect(() => {
    const selfiePhoto = documents.find(value => value.is_selfie);
    const isValid = documents.length > 1 && Boolean(selfiePhoto);

    setValid(isValid);
  }, [documents]);

  const onSuccess = () => {
    navigationRef.current?.reset({
      index: 0,
      routes: [
        {
          name: 'Main',
          state: {
            index: 0,
            routes: [{name: 'Profile'}],
          },
        },
      ],
    });
  };

  const onPressNext = () => {
    dispatch(onVerificationSend({application_id}, onSuccess));
  };

  const onPressAdd = (selfie?: boolean) => () => {
    setCameraOptions({visible: true, selfie});
  };

  const onDelete = (item: any) => () => {
    dispatch(
      onVerificationDeleteDocument({application_id, upload_id: item.id}),
    );
  };

  const handleTakePhoto = (path: string) => {
    setCameraOptions({visible: false});

    const newImage = {
      uri: path,
      type: getImageType(path),
      name: `${moment().valueOf()}.${path.split('.').pop()}`,
    };

    dispatch(
      onVerificationUploadDocument({
        application_id,
        userfile: newImage,
        is_selfie: cameraOptions.selfie,
      }),
    );
  };

  const {selfieImage, docImages, isDocsComplete} = useMemo<any>(() => {
    let _selfieImage: any;

    const _docImages = documents.filter(value => {
      if (value.is_selfie) {
        _selfieImage = value;
        return false;
      }

      return true;
    });

    return {
      selfieImage: _selfieImage,
      docImages: _docImages,
      isDocsComplete: _docImages?.length >= 2,
    };
  }, [documents]);

  return (
    <SafeContainer>
      {!cameraOptions.visible && (
        <>
          <Text style={styles.titleStyle} type="btnSmall">
            {t('verify_user.modal_photo_desc')}
          </Text>
          <ContainerWithLoader
            loading={loading}
            containerStyle={stylesGlobal.flexOne}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={stylesGlobal.contentContainerStyle}>
              <Text style={styles.label}>{t('verify_user.passport')}</Text>
              {docImages.map((item: any) => (
                <PreviewImage {...item} onDelete={onDelete(item)} />
              ))}

              {!isDocsComplete && (
                <ButtonLink
                  withIcon
                  icon={{name: 'plus', color: primaryMain}}
                  title={t('common.attach_file')}
                  containerStyle={styles.buttonContainerStyle}
                  onPress={onPressAdd()}
                />
              )}

              <Text style={styles.label}>{t('verify_user.selfie')}</Text>
              {!selfieImage && (
                <ButtonLink
                  withIcon
                  icon={{name: 'plus', color: primaryMain}}
                  title={t('common.attach_file')}
                  containerStyle={styles.buttonContainerStyle}
                  onPress={onPressAdd(true)}
                />
              )}
              {selfieImage && (
                <PreviewImage
                  {...selfieImage}
                  onDelete={onDelete(selfieImage)}
                />
              )}
            </ScrollView>

            <Button
              disabled={!isValid}
              title={t('common.next_step')}
              onPress={onPressNext}
            />
          </ContainerWithLoader>
        </>
      )}

      {cameraOptions.visible && (
        <TakePhoto
          onTakePhoto={handleTakePhoto}
          selfie={cameraOptions.selfie}
        />
      )}
    </SafeContainer>
  );
}
