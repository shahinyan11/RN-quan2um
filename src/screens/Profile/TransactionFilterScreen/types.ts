import type {NativeStackScreenProps} from '@react-navigation/native-stack';

const list = ['profit', 'award', 'currency', 'status', 'info'] as const;

type RootStackParamList = {
  TransactionFilter: {filters: typeof list[number]};
};

export type Props = NativeStackScreenProps<
  RootStackParamList,
  'TransactionFilter'
>;
