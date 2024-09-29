import {StyleProp, ViewStyle} from 'react-native';

export interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  image?: ImageData;
  imagesList: ImageData[];
  title: string;
  onSelect: (image: ImageData) => void;
  onDelete: (id: string) => void;
  buttonText?: string;
  multiple?: boolean;
}

interface ImageData {
  id?: string;
  uri?: string;
  name?: string;
  type?: string;
  size?: string | number;
  resolution?: string;
}
