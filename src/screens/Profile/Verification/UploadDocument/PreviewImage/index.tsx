import ContainerItem from '@components/containers/ContainerItem';
import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';
import styles from '@screens/Profile/Verification/UploadDocument/styles';
import {Image, View} from 'react-native';
import Text from '@components/textes/Text';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';

type PreviewImageProps = {
  id: number;
  name?: string;
  original_filename?: string;
  comment?: string;
  uri?: string;
  onDelete: () => void;
};

const PreviewImage = ({
  id,
  name,
  comment,
  onDelete,
  uri = '',
  original_filename,
}: PreviewImageProps) => {
  const red = EStyleSheet.value('$red');
  const {t} = useTranslation();

  return (
    <ContainerItem key={name || id}>
      <Row justifyContent="space-between">
        {!uri && <Icon name="file" containerStyle={styles.previewImage} />}
        {uri && <Image source={{uri}} style={styles.previewImage} />}
        <View style={styles.centerContainerStyle}>
          <Text>{name || original_filename}</Text>
        </View>
        <Icon name={'close'} color={red} onPress={onDelete} disabled={false} />
      </Row>
      {!!comment && (
        <View style={styles.commentContainerStyle}>
          <Text type="label" style={styles.labelStyle}>
            {t('common.comment')}:
          </Text>
          <Text type="description">{comment}</Text>
        </View>
      )}
    </ContainerItem>
  );
};

export default PreviewImage;
