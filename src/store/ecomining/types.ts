import {Links, Meta} from '../account/types';

export const SET_VALUE = '@ecomining/set_value';
export const SET_ASSETS = '@tradeview/update_assets';
export interface IMasterNodes {
  loading: boolean;
  loadingSend: boolean;
  node: INodes;
  master_nodes_history: IMasterNodesHistory;
  master_nodes_history_filtered: IMasterNodesHistoryFiltered;
}

export interface INodes {
  currency: INodeCurrency;
  total_nodes: number;
  current_node: ICurrentNode;
  balance_face: string;
  node_investments: INodeInvestments[];
  roi: number;
  last_transactions: ILastTransactions[];
  bonus_wallet: IBonusWallet;
  coin: ICoin;
}
export interface IMasterNodesHistory {
  data: IData[];
  links: Links;
  meta: Meta;
}

export interface IMasterNodesHistoryFiltered {
  master_nodes: IMasterNode[];
  kinds: IKinds;
}

export interface INodeCurrency {
  id: number;
  name: string;
  code: string;
  slug: string;
  color_hex: string;
  color_hex2: string;
  logo: string;
  logo_png: string;
  logo_alt: string;
  is_fiat: boolean;
  decimals: number;
  can_deposit: boolean;
  can_withdrawal: boolean;
}

export interface ICurrentNode {
  id: number;
  name: string;
  address: string;
  code: string;
  available: boolean;
  header: string;
  content: string;
}

export interface ICoin {
  pow_algorithm: string;
  premine: string;
  pow_blocks: string;
  pos_blocks: string;
  block_time: string;
  maturity: string;
  ports: string;
  block_reward: string;
  collateral: string;
  trading_pair: string;
  total_master_nodes: number;
}

export interface INodeInvestments {
  id: number;
  name: string;
  code: string;
  address: string;
  deposit_face: string;
  reward_face: string;
  fee_face: string;
  profit_face: string;
  started_at: number;
  withdrawal_at: number;
  can_withdrawal: boolean;
}

export interface ILastTransactions {
  id: number;
  node_name: string;
  node_code: string;
  address: string;
  explorer_url: string;
  amount_face: string;
  is_replenishment: boolean;
  fee_face: string;
  code: string;
  kind: number;
  kind_name: string;
  time: number;
}
export interface IBonusWallet {
  use_for_trade_fee: boolean;
  use_for_masternodes_investment: boolean;
  amount: string;
  amount_usd: string;
  expires_at: number;
  currency: ICurrency;
}

export interface ICurrency {
  id: number;
  code: string;
}

export interface IData {
  id: number;
  node_name: string;
  node_code: string;
  address: string;
  explorer_url: string;
  amount_face: string;
  is_replenishment: boolean;
  fee_face: string;
  code: string;
  kind: number;
  kind_name: string;
  time: number;
}

export interface IMasterNode {
  value: number;
  name: string;
}

export interface IKinds {
  value: number;
  name: string;
}
