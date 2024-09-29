type Item = {
  amount_face: string;
  code: string;
  kind_name: string;
  node_name: string;
  node_code: string;
  fee_face: string;
  address: string;
  time: number;
  kind: number;
  explorer_url: string;
};

export type Props = {
  item: Item;
};
