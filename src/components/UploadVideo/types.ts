import {StyleProp, ViewStyle} from 'react-native';

export interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  video: videoData;
  title: string;
  onDelete: () => void;
  onSelect: (video: videoData) => void;
  buttonText?: string;
}

interface videoData {
  uri?: string;
  name?: string;
  type?: string;
  size?: string | number;
  resolution?: string;
}
