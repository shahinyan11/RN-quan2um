import React from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {hideModal} from '@store/modal/actions';
import {Close} from '@assets/svgs';
import st from './styles';

export type InformationProps = {
  image?: ImageSourcePropType;
  title?: string;
  description?: string;
  firstBtnText?: string;
  firstBtnAction?: () => void;
  secondBtnText?: string;
  secondBtnAction?: () => void;
  alignmentOfTexts?: 'center' | 'left' | 'right' | 'justify' | 'auto';
};

export default function Information({
  image,
  title,
  description,
  firstBtnText,
  firstBtnAction,
  secondBtnText,
  secondBtnAction,
  alignmentOfTexts = 'center',
}: InformationProps) {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideModal());
  };

  const handleFirstPress = () => {
    handleClose();
    firstBtnAction?.();
  };

  const handleSecondPress = () => {
    secondBtnAction?.();
  };

  return (
    <View style={st.container}>
      <TouchableOpacity style={st.closeIcon} onPress={handleClose}>
        <Close size={14} color={'#373737'} />
      </TouchableOpacity>

      {image && <Image source={image} style={st.image} />}

      <View style={st.content}>
        {title && (
          <Text style={[st.title, {textAlign: alignmentOfTexts}]}>{title}</Text>
        )}
        {description && (
          <Text style={[st.description, {textAlign: alignmentOfTexts}]}>
            {description}
          </Text>
        )}

        {firstBtnText && (
          <TouchableOpacity style={st.firstBtn} onPress={handleFirstPress}>
            <Text style={st.firstBtnText}>{firstBtnText}</Text>
          </TouchableOpacity>
        )}

        {secondBtnText && (
          <TouchableOpacity onPress={handleSecondPress} style={st.secondBtn}>
            <Text style={st.secondBtnText}>{secondBtnText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
