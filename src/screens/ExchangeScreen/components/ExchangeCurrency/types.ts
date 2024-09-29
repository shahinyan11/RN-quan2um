export type Props = {
  title: string;
  data: any;
  onChange?: ({nativeEvent}) => void;
  value?: string | undefined;
  editable?: boolean;
};
