import {StyleProp, ViewStyle} from 'react-native';

export interface Props {
  size?: number | string;
  color?: number | string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
