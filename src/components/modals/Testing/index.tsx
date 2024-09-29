import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {hideModal, showModal} from '@store/modal';
import st from './styles';
import {answerToQuestion, getTestQuestion} from '@store/charity';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
import {selectCharityStore} from '@store/charity/selectors';
import {TEST_TIME_EXPIRED} from '@components/modals/Information/constantProps';

export default function Testing() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {testQuestion, testState} = useSelector(selectCharityStore);
  const [checked, setChecked] = useState('');
  const insets = useSafeAreaInsets();

  const closeModal = () => dispatch(hideModal());

  useEffect(() => {
    getCurrentQuestion();
  }, []);

  useEffect(() => {
    setChecked('');
  }, [testQuestion]);

  const handleCheck = (checkedAnswer: string) => {
    setChecked(checkedAnswer);
  };

  const getCurrentQuestion = () => {
    dispatch(getTestQuestion());
  };

  const handleOnwards = () => {
    dispatch(
      answerToQuestion({
        // answer: checked,
        answer: '1',
        successCallback: getCurrentQuestion,
        failCallback: onFail,
      }),
    );
  };

  const onFail = () => {
    dispatch(
      showModal({
        modalType: 'INFORMATION',
        modalProps: TEST_TIME_EXPIRED,
      }),
    );
  };

  const answers = useMemo(
    () => Object.values(testQuestion).slice(1),
    [testQuestion],
  );

  const countDownTime = useMemo(() => {
    return (
      moment(testState?.current_question_start_time)
        // .add(testState.allowed_answer_time, 'seconds')
        .add(4, 'hours')
        .add(50, 'seconds')
        .diff(moment()) / 1000
    );
  }, [testState]);

  return (
    <View
      style={[
        st.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <Text style={st.title}>{t('common.testing')}</Text>

      <View style={[st.whiteContainer, {paddingBottom: insets.bottom}]}>
        <View style={st.row}>
          <Text style={st.lightText}>
            {`ВОПРОС ${testState.current_question} ИЗ 5`}
          </Text>
          {Boolean(countDownTime) && (
            <CountDown
              until={countDownTime}
              digitTxtStyle={st.countDown}
              separatorStyle={st.countDown}
              digitStyle={{
                height: 22,
                width: 'auto',
              }}
              timeToShow={['M', 'S']}
              timeLabelStyle={{display: 'none'}}
              showSeparator={true}
            />
          )}
        </View>
        <Text style={st.question}>{testQuestion.question}</Text>
        {answers.map(value => (
          <Pressable style={st.answerItem} onPress={() => handleCheck(value)}>
            <CheckBox
              value={checked === value}
              boxType={'square'}
              style={st.checkbox}
              animationDuration={0.25}
              onAnimationType={'bounce'}
              offAnimationType={'bounce'}
            />
            <Text>{value}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={handleOnwards} style={st.button}>
        <Text style={st.buttonText}>{t('common.onwards')}</Text>
      </Pressable>
    </View>
  );
}
