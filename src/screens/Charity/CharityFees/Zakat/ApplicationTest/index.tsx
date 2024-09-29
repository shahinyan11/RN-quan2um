import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import st from './styles';
import {useDispatch, useSelector} from 'react-redux';
import CountDown from 'react-native-countdown-component';
import CheckBox from '@react-native-community/checkbox';
import {selectCharityStore} from '@store/charity/selectors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {showModal} from '@store/modal';
import moment from 'moment/moment';
import {answerToQuestion} from '@store/charity';
import {TIME_EXPIRED} from '@components/modals/Information/constantProps';

export default function ApplicationTest() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {testQuestion, testState} = useSelector(selectCharityStore);
  const [checkedAnswer, setCheckedAnswer] = useState<number>();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setCheckedAnswer(undefined);
  }, [testQuestion]);

  const handleCheck = (answer: number) => {
    setCheckedAnswer(answer);
  };

  const handleOnwards = () => {
    dispatch(answerToQuestion({answer: checkedAnswer}));
  };

  const handleTimeExpired = () => {
    dispatch(
      showModal({
        modalType: 'INFORMATION',
        modalProps: TIME_EXPIRED,
      }),
    );
  };

  const countDownTime = useMemo(() => {
    return (
      moment
        .utc(testState?.current_question_start_time)
        .local()
        .add(testState.allowed_answer_time, 'seconds')
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

          {countDownTime > 0 && (
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
              onFinish={handleTimeExpired}
            />
          )}
        </View>
        <Text style={st.question}>{testQuestion.question}</Text>
        {testQuestion?.answers?.map(answer => (
          <Pressable
            style={st.answerItem}
            onPress={() => handleCheck(answer.id)}>
            <CheckBox
              onValueChange={() => handleCheck(answer.id)}
              value={checkedAnswer === answer.id}
              boxType={'square'}
              style={st.checkbox}
              animationDuration={0.25}
              onAnimationType={'bounce'}
              offAnimationType={'bounce'}
            />
            <Text>{answer.value}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={handleOnwards} style={st.button}>
        <Text style={st.buttonText}>{t('common.onwards')}</Text>
      </Pressable>
    </View>
  );
}
