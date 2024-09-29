import React from 'react';
import {Text, View} from 'react-native';
import {Circle, Defs, LinearGradient, Stop, Svg} from 'react-native-svg';
import {Shadow} from 'react-native-shadow-2';

import st from './styles';
import {useTranslation} from 'react-i18next';

type Props = {
  size: number;
  bgColor: string;
  pgColor: string;
  strokeWidth: number;
  progressPercent: number;
  value: number;
};

const CircularProgress = (props: Props) => {
  const {t} = useTranslation();

  const {size, strokeWidth} = props;
  const radius = (size - strokeWidth) / 2;
  const centeredSize = size - strokeWidth * 2;
  const svgProgress = 100 - props.progressPercent;
  const circum = radius * 2 * Math.PI;

  return (
    <View style={st.container}>
      <View style={{margin: 10}}>
        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient
              id="paint0_linear_268_104"
              x1="48.2818"
              y1="17.8089"
              x2="161.467"
              y2="191.149"
              gradientUnits="userSpaceOnUse">
              <Stop stopColor="#434361" />
              <Stop offset="1" stopColor="#232334" />
            </LinearGradient>
          </Defs>

          {/* Background Circle */}
          <Circle
            stroke="url(#paint0_linear_268_104)"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            {...{strokeWidth}}
          />

          {/* Progress Circle */}
          <Circle
            stroke={props.pgColor}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeDasharray={`${circum} ${circum}`}
            strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
            transform={`rotate(-90, ${size / 2}, ${size / 2})`}
            {...{strokeWidth}}
          />
        </Svg>
      </View>
      <View
        style={[
          st.centerCircle,
          {
            width: centeredSize,
            height: centeredSize,
            borderRadius: radius,
          },
        ]}>
        <Shadow
          distance={21}
          paintInside={false}
          startColor={'rgba(0, 0, 0, 0)'}
          endColor={'rgba(0, 0, 0, 0.24)'}
          offset={[4, 20]}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: centeredSize,
            height: centeredSize,
            borderRadius: radius,
          }}>
          <Text style={st.text}>{props.value} BTCa</Text>
          <Text style={st.textSmall}>{t('common.remains_to_contribute')}</Text>
        </Shadow>
      </View>
    </View>
  );
};

CircularProgress.defaultProps = {
  bgColor: '#f2f2f2',
  pgColor: '#00A7CE',
  progressPercent: 0,
};

export default CircularProgress;
