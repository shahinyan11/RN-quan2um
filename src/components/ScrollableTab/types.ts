import {StyleProp, ViewStyle} from 'react-native';

export default interface Props {
  tabs: Tabs[];
  onChange?: any;
  containerStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  activeTab?: number;
}

interface Tabs {
  id?: number;
  name: string;
}
