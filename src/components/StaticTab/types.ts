import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export default interface Props {
  tabs: Tabs[];
  onChange?: any;
  containerStyle?: StyleProp<ViewStyle>;
  activeTabStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
}

interface Tabs {
  id: number;
  name: string;
}
