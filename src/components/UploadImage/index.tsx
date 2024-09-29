import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';
import {launchImageLibrary} from 'react-native-image-picker';
import uuid from 'react-native-uuid';

import Preview from '@components/Preview';
import {Props} from './types';
import st from './styles';

export default function UploadImage({
  containerStyle,
  image,
  imagesList,
  multiple = false,
  title,
  onSelect,
  buttonText = i18next.t('common.upload_photo'),
  onDelete,
}: Props) {
  const {t} = useTranslation();

  const selectLogo = () => {
    launchImageLibrary({mediaType: 'photo'}, ({assets}) => {
      const image = assets?.[0];
      if (image) {
        onSelect({
          id: uuid.v4(),
          uri: image.uri,
          name: image.fileName,
          type: image.type,
          size: Math.round(image.fileSize / 1000),
          resolution: `${image.width} x ${image.height}`,
        });
      }
    });
  };

  const handleDelete = (id?: string) => {
    if (!id) {
      onSelect(undefined);
      return;
    }

    onDelete?.(id);
  };

  return (
    <View style={containerStyle}>
      <Text style={st.title}>{title}</Text>
      {image?.uri && (
        <Preview
          data={image}
          onDelete={() => handleDelete()}
          onChange={selectLogo}
        />
      )}

      {imagesList?.map(image => (
        <Preview
          data={image}
          onDelete={() => handleDelete(image.id)}
          onChange={selectLogo}
          containerStyle={{marginBottom: 10}}
        />
      ))}

      {(!image?.uri || multiple) && (
        <>
          <Pressable style={st.button} onPress={selectLogo}>
            <Text style={st.buttonText}>{buttonText}</Text>
          </Pressable>
          <Text style={st.lightText}>{t('file_resolution.format')}</Text>
          <Text style={st.lightText}>
            {t('file_resolution.size', {count: 10})}
          </Text>
          <Text style={st.lightText}>{t('file_resolution.permissions')}</Text>
        </>
      )}
    </View>
  );
}
