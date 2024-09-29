import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import CircularProgress from 'react-native-circular-progress-indicator';
import CountDown from 'react-native-countdown-component';

import st from './styles';
import {EXCHANGE_STEPS} from '@constants/index';
import {Check} from '@assets/svgs';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {getExchangeStatus} from '@store/exchange';

type ProgressProps = {
  currentStep: number;
  expire: number;
};

export default function Progress({currentStep = 2, expire}: ProgressProps) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const timeLimit = 900000; // 900000 milliseconds = 15 minutes
  const [timeLeft, setTimeLeft] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const _timeLeft = expire ? moment(expire * 1000).diff(moment()) : timeLimit;

    const _percent = calculatePercent(_timeLeft);

    setTimeLeft(_timeLeft);
    setPercent(_percent);
  }, []);

  const onChange = (until: number) => {
    const _percent = calculatePercent(until * 1000);
    setPercent(_percent);
  };

  const onFinish = () => {
    dispatch(getExchangeStatus());
  };

  const calculatePercent = (time: number) => {
    const percentLeft = (time * 100) / timeLimit;
    return 100 - percentLeft;
  };

  const countdownTime = Math.round(timeLeft / 1000);

  return (
    <View style={st.container}>
      <View style={st.stepIndicator}>
        <View style={st.left}>
          {EXCHANGE_STEPS.map(({step}) => (
            <React.Fragment key={step}>
              {step > 1 && (
                <View
                  style={[
                    st.stepLine,
                    currentStep >= step && st.stepLineActive,
                  ]}
                />
              )}
              <View
                style={[
                  st.stepCircle,
                  currentStep >= step && st.stepCircleActive,
                ]}>
                {step === 1 && <Check size={10} />}
                {step > 1 && (
                  <Text
                    style={[
                      st.stepText,
                      currentStep >= step && st.stepTextActive,
                    ]}>
                    {step}
                  </Text>
                )}
              </View>
            </React.Fragment>
          ))}
        </View>

        <View style={st.right}>
          {EXCHANGE_STEPS.map(({step, label}) => (
            <Text
              key={label}
              style={[st.stepLabel, currentStep >= step && st.stepLabelActive]}>
              {label}
            </Text>
          ))}
        </View>
      </View>

      <View style={st.circleContainer}>
        <CircularProgress
          value={percent}
          showProgressValue={false}
          radius={77}
          duration={1000}
          inActiveStrokeColor={'#3B3B54'}
          activeStrokeColor={percent ? '#83C2EF' : '#3B3B54'}
          inActiveStrokeWidth={15}
          activeStrokeWidth={15}
          strokeLinecap={'square'}
        />
        <View style={st.posAbs}>
          <Text style={st.timeTitle}>{t('exchange.until_the_end')}</Text>
          {countdownTime > 0 && (
            <CountDown
              until={countdownTime}
              digitTxtStyle={st.timeValue}
              separatorStyle={st.timeValue}
              digitStyle={{
                backgroundColor: 'transparent',
                width: 'auto',
                height: 'auto',
              }}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{h: undefined, m: undefined, s: undefined}}
              showSeparator={true}
              running={Boolean(expire)}
              onChange={onChange}
              onFinish={onFinish}
            />
          )}
        </View>
      </View>
    </View>
  );
}
