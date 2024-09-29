import React from 'react';
import {Circle, Defs, G, LinearGradient, Stop, Svg} from 'react-native-svg';

type Props = {
  size: number;
  strokeWidth: number;
  progressPercent: number;
};

const CircularProgress = ({
  size = 309,
  strokeWidth = 38,
  progressPercent = 0,
}: Props) => {
  const mainCircleRadius = size / 2;
  const mainCircleStrokeWidth = (size * 8) / 100;

  const progressCircleRadius =
    mainCircleRadius - (mainCircleStrokeWidth + strokeWidth / 2);

  const svgProgress = 100 - progressPercent;
  const circum = progressCircleRadius * 2 * Math.PI;

  return (
    <Svg width={size} height={size} fill="none">
      <G filter="url(#filter2_i_445_182)">
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={progressCircleRadius}
          stroke="url(#paint0_linear_445_182)"
          strokeWidth={strokeWidth}
        />
      </G>
      <G filter="url(#filter3_i_445_182)">
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={progressCircleRadius}
          stroke="url(#paint1_linear_445_182)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={
            progressCircleRadius * Math.PI * 2 * (svgProgress / 100)
          }
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_445_182"
          x1="86"
          y1="46.5"
          x2="229"
          y2="265.5"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#434361" />
          <Stop offset="1" stopColor="#232334" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_445_182"
          x1="86"
          y1="46.5"
          x2="229"
          y2="265.5"
          gradientUnits="userSpaceOnUse"
          gradientTransform={`rotate(90, ${size / 2}, ${size / 2})`}>
          <Stop stopColor="#4B7B78" />
          <Stop offset="1" stopColor="#233426" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default CircularProgress;
