import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';
import Preview from '@components/Preview';

import {Props} from './types';
import st from './styles';
import {launchImageLibrary} from 'react-native-image-picker';

export default function UploadVideo({
  containerStyle,
  video,
  title,
  onDelete,
  onSelect,
  buttonText = i18next.t('common.upload_video'),
}: Props) {
  const {t} = useTranslation();

  const selectVideo = () => {
    launchImageLibrary({mediaType: 'video'}, ({assets}) => {
      const video = assets?.[0];
      if (video) {
        onSelect({
          uri: video.uri,
          name: video.fileName,
          type: video.type,
          size: Math.round(video.fileSize / 1000),
          resolution: `${video.width} x ${video.height}`,
        });
      }
    });
  };

  const handleDelete = () => {
    onSelect(undefined);
  };

  return (
    <View style={containerStyle}>
      <Text style={st.title}>{title}</Text>
      {!video?.uri && (
        <>
          <Pressable style={st.button} onPress={selectVideo}>
            <Text style={st.buttonText}>{buttonText}</Text>
          </Pressable>
          <Text style={st.lightText}>{t('file_resolution.format_video')}</Text>
          <Text style={st.lightText}>
            {t('file_resolution.video_size', {count: 20})}
          </Text>
        </>
      )}
      {video?.uri && (
        <Preview
          data={video}
          type={'video'}
          onDelete={onDelete}
          onChange={handleDelete}
        />
      )}
    </View>
  );
}
