import {Links, Meta} from '../account/types';

export const SET_VALUE = '@tradeview/set_value';
export const SET_ORDER_BOOK = '@tradeview/set_order_book';
export const UPDATE_ASSETS = '@tradeview/update_assets';

export interface ITradeView {
  loading: boolean;
  loadingSend: boolean;
  orders: IOrders;
  orders_history: IOrders;
  pairs: Pair[];
  currencies: Currency[];
  pair: ITradeViewPair;
  trade_view: ITVPair[];
  chartDataSet: IChartData[];
  dealsHistory: any;
  deepChart: any;
  filterParams: any;
  pairCode: any;
  filterOrder: any;
  dealPair: any;
  whaleDeals: WhaleDeals[];
  whaleDealTypes: any[];
  whaleDealFilters: string[];
}

export interface ITVPair {
  id: number;
  pair: string;
  pair_format: string;
  price: number;
  price_face: string;
  price_fiat: string;
  change: number;
  logo: {
    png: ITVPairIcons;
  };
}

export interface ITVPairIcons {
  base_currency: string;
  main_currency: string;

  main_color_hex: string;
  main_color_hex2: string;

  base_color_hex: string;
  base_color_hex2: string;
}

export interface IOrders {
  data: Order[];
  links: Links;
  meta: Meta;
}

export interface Order {
  id: number;
  type: Type;
  pair: string;
  pair_id: number;
  pair_format: string;
  start_quantity: string;
  start_quantity_face: string;
  quantity: string;
  quantity_face: string;
  price: string;
  fee_value: string;
  volume: string;
  filled: string;
  time: number;
  status: Status;
  side: string;
  side_name: string;
  can_cancel: boolean;
  logo: {
    png: ITVPairIcons;
  };
}

export interface Type {
  value: string;
  name: string;
}

export interface Status {
  value: number;
  name: string;
}

export interface Pairs {
  currencies: Currency[];
  pairs: Pair[];
  filter_currencies: string[];
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  market_currencies: Currency[];
}
export interface Pair {
  pair_id: number;
  pair: string;
  title: string;
  last_price: string;
  last_price_face: string;
  change_24: any;
  volume_24: number;
  volume_24_face: string;
  main_currency: Currency;
  base_currency: Currency;
  graph_data: GraphDaum[];
}

export interface Currency {
  id: number;
  name: string;
  code: string;
  slug: string;
  logo: string;
  logo_png: string;
  color_hex: string;
  color_hex2: string;
  is_fiat: boolean;
  decimals: number;
}

export interface GraphDaum {
  grouping_date: string;
  time: number;
  id: number;
  price: string;
  quantity: string;
  face_price: string;
}

export interface ISocketMarket {
  event: 'prices';
  data: ISocketPair;
  socket: null;
}

export interface ISocketPair {
  pair_id: number;
  pair: string;
  price: number;
  pf: string;
  change: number;
  change_abs: number;
  change_abs_face: string;
  price_fiat: number;
  pff: string;
  volume: number;
  time: number;
  min_price: number;
  max_price: number;
  main_volume: number;
  base_volume: number;
  min_price_face: string;
  max_price_face: string;
  main_volume_face: string;
  base_volume_face: string;
  socket: null;
}

export interface ITradeViewPair {
  pair_id: number;
  last_price: number;
  last_price_face: string;
  last_price_fiat: number;
  last_price_fiat_face: string;
  min_price: number;
  max_price: number;
  main_volume: number;
  base_volume: number;
  min_price_face: string;
  max_price_face: string;
  main_volume_face: string;
  base_volume_face: string;
  change: number;
  change_abs: number;
  change_abs_face: string;
  main_currency: Currency;
  base_currency: Currency;
  deals: Deal[];
  order_book: OrderBook;
  assets: Assets;
  price_decimals: number;
  quantity_decimals: number;
  total_decimals: number;
}

export interface Currency {
  id: number;
  name: string;
  code: string;
  slug: string;
  logo: string;
  logo_png: string;
  color_hex: string;
  color_hex2: string;
  is_fiat: boolean;
  decimals: number;
  can_deposit: boolean;
  can_withdrawal: boolean;
}

export interface Deal {
  id: number;
  price: number;
  price_face: string;
  quantity: number;
  volume: number;
  volume_face: string;
  fee_value: string;
  is_buy: boolean;
  pair: string;
  code: string;
  side_name: string;
  time: number;
}

export interface OrderBook {
  asks: Ask[];
  bids: Bid[];
}

export interface Ask {
  p: number;
  q: number;
  qm: number;
  pr: number;
  v: number;
  id: string;
  vf: string;
}

export interface Bid {
  p: number;
  q: number;
  qm: number;
  pr: number;
  v: number;
  id: string;
  vf: string;
}

export interface Assets {
  main: string;
  main_face: string;
  base: string;
  base_face: string;
  fee: number;
}

export interface IChart {
  last_price: number;
  last_price_face: string;
  change: string;
  data: IChartData[];
}

export interface IChartData {
  time: number;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}

export interface ISocketPair {
  pair_id: number;
  pair: string;
  price: number;
  pf: string;
  change: number;
  change_abs: number;
  change_abs_face: string;
  price_fiat: number;
  pff: string;
  volume: number;
  time: number;
  min_price: number;
  max_price: number;
  main_volume: number;
  base_volume: number;
  min_price_face: string;
  max_price_face: string;
  main_volume_face: string;
  base_volume_face: string;
  socket: null;
}

export type WhaleDeals = {
  code: string;
  icon: string;
  id: number;
  kind: string;
  time: number;
  value: number;
  title: string;
  title_key: string;
  color: string;
  period_key: string | null;
};
