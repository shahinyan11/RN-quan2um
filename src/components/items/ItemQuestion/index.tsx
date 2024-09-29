import React, {useState} from 'react';
import {View, Image} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';

import ContainerItem from '@components/containers/ContainerItem';
import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import ButtonLink from '@components/buttons/ButtonLink';

import {IQuestion} from '@store/account/types';

import styles from './styles';
import {formatDate} from '@utils/fns';

const ItemQuestion = ({
  category,
  status,
  status_name,
  time,
  question,
  answers,
}: IQuestion) => {
  const [isAnswersVisible, setAnswersVisible] = useState(false);
  const {t} = useTranslation();
  const onChangeAnswersVisible = () => setAnswersVisible(!isAnswersVisible);

  const titleStatusStyle = [
    styles.statusTitleStyle,
    status === 'completed'
      ? styles.titleSuccessStyle
      : status === 'operator-answered'
      ? styles.titleAlertStyle
      : styles.titleErrorStyle,
  ];

  const backgroundStatusStyle = [
    styles.statusContainerStyle,
    status === 'completed'
      ? styles.statusSuccessBackground
      : status === 'operator-answered'
      ? styles.statusAlertBackground
      : styles.statusErrorBackground,
  ];

  const linkColor = EStyleSheet.value('$primaryMain');

  return (
    <ContainerItem>
      <Row>
        <View style={backgroundStatusStyle}>
          <Text type="btnMini" style={titleStatusStyle}>
            {status_name}
          </Text>
        </View>
        <Text type="t5" style={styles.titleStyle}>
          {category.name}
        </Text>
        <Text type="textSmall">{formatDate(time, 'dd.MM.yyyy')}</Text>
      </Row>
      {question.attach && (
        <Image source={{uri: question.attach}} style={styles.imageStyle} />
      )}
      <Hyperlink linkDefault={true} linkStyle={{color: linkColor}}>
        <Text type="textMiddle" style={styles.commentStyle}>
          {question.comment}
        </Text>
      </Hyperlink>
      {Boolean(answers.length) && (
        <>
          {isAnswersVisible && (
            <View style={styles.answeredContainerStyle}>
              <Text type="t6" style={styles.supportTitleStyle}>
                {t('support.m_support_answered')}
              </Text>

              {answers.map((item, index) => (
                <View key={index} style={styles.answeredStyle}>
                  <Hyperlink linkDefault={true} linkStyle={{color: linkColor}}>
                    <Text>{item.comment}</Text>
                  </Hyperlink>
                </View>
              ))}
            </View>
          )}

          <ButtonLink
            title={
              isAnswersVisible
                ? t('support.button_hide_answer')
                : t('support.button_show_answer')
            }
            onPress={onChangeAnswersVisible}
          />
        </>
      )}
    </ContainerItem>
  );
};

export default ItemQuestion;
