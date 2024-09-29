import {StyleProp, ViewStyle} from 'react-native';

export default interface Props {
  tabs: Tabs[];
  onChange?: any;
  containerStyle?: StyleProp<ViewStyle>;
}

interface Tabs {
  id: number;
  name: string;
}
