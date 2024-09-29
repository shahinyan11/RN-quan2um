import {StyleProp, ViewStyle} from 'react-native';
import {IconsList} from '@components/icons/Icon/types';

export type Props = {
  title?: string;
  icon?: {
    name: IconsList;
    color: string;
    size: number;
  };
  hideIcon?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};
