import React, {useState} from 'react';
import {Image, Linking, Pressable, Text, View} from 'react-native';
import {Trans, useTranslation} from 'react-i18next';
import st from './styles';
import {useDispatch} from 'react-redux';
import {hideModal} from '@store/modal';
import {navigationRef} from '@navigation/index';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  imageStep1,
  imageStep2,
  imageStep3,
  imageStep4,
} from '@constants/images';

export type ApplicationInstructionProps = {
  currentStep: 1 | 2 | 3 | 4;
};

export default function ApplicationInstruction({
  currentStep = 1,
}: ApplicationInstructionProps) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [step, setStep] = useState(currentStep);
  const insets = useSafeAreaInsets();

  const closeModal = () => dispatch(hideModal());

  const data = {
    1: {
      title: t('charity.need_to_follow_3_steps'),
      image: imageStep1,
      text: t('charity.application_instruction_zakat_1_text'),
      firstButton: {
        text: t('common.download_app'),
        action: () => Linking.openURL(t('common.btca_app_url')),
      },
      secondButton: {
        text: t('common.onwards'),
        action: () => setStep(step + 1),
      },
    },
    2: {
      text: t('charity.application_instruction_zakat_2_text'),
      image: imageStep2,
      firstButton: {
        text: t('common.onwards'),
        action: () => setStep(step + 1),
      },
      secondButton: {
        text: t('common.back'),
        action: () => setStep(step - 1),
      },
    },
    3: {
      text: t('charity.application_instruction_zakat_3_text'),
      image: imageStep3,
      firstButton: {
        text: t('charity.thx_everything_is_clear'),
        action: () => closeModal(),
      },
      secondButton: {
        text: t('charity.repeat_training_again'),
        action: () => setStep(1),
      },
    },
    4: {
      title: t('charity.application_submitted_for_review'),
      image: imageStep4,
      text: t('charity.application_instruction_zakat_4_text'),
      firstButton: {
        text: t('charity.ok_thank_you'),
        action: () => {
          closeModal();
          navigationRef.current?.goBack();
        },
      },
      secondButton: {
        text: t('charity.go_to_applications'),
        action: () => {
          closeModal();
          navigationRef.current?.navigate('CharityProfile');
        },
      },
    },
  };

  const {title, image, text, firstButton, secondButton} = data[step];

  return (
    <View style={[st.container, {paddingTop: insets.top}]}>
      <View style={st.topContainer}>
        <Pressable onPress={closeModal}>
          <Text style={st.close}>{t('common.close')}</Text>
        </Pressable>
        {title && (
          <Text style={st.title}>
            <Trans
              i18nKey={'charity.need_to_follow_3_steps'}
              components={{span: <Text style={{color: '#ace42c'}} />}}>
              {title}
            </Trans>
          </Text>
        )}

        <View style={st.imageContainer}>
          <Image source={image} style={st.image} />
        </View>
      </View>

      <View style={[st.whiteContainer, {paddingBottom: insets.bottom}]}>
        <Text style={st.text}>{text}</Text>
        <Pressable onPress={firstButton.action} style={st.button}>
          <Text style={st.buttonText}>{firstButton.text}</Text>
        </Pressable>
        <Pressable onPress={secondButton.action} style={st.buttonTransparent}>
          <Text style={st.buttonText}>{secondButton.text}</Text>
        </Pressable>
      </View>
    </View>
  );
}
