export const SET_VALUE = '@pages/set_value';

import {IResponseData} from '../account/types';

export interface IPages {
  loading: boolean;
  faq: IFaq;
}

export interface Page {
  id: number;
  slug: string;
  header: string;
  content: string;
  photo: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

export interface Slide {
  id: number;
  photo: string;
  name: string;
  button_title: string;
  with_button: boolean;
  uri?: string;
}

export interface LastArticle {
  id: number;
  slug: string;
  category: Category;
  header: string;
  preview: string;
  views: number;
  time_created: number;
  time_reading_minutes: number;
  photo_thumb: string;
  photo_feed: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Advantage {
  id: number;
  name: string;
  content: string;
  icon: string;
}

export interface SliderCurrency {
  pair_id: number;
  pair: string;
  title: string;
  last_price: string;
  last_price_face: string;
  change_24: any;
  volume_24: number;
  volume_24_face: string;
  main_currency: MainCurrency;
  base_currency: BaseCurrency;
  graph_data: GraphDaum[];
}

export interface MainCurrency {
  id: number;
  name: string;
  code: string;
  slug: string;
  logo: string;
  color_hex: string;
  color_hex2: string;
  is_fiat: boolean;
  decimals: number;
}

export interface BaseCurrency {
  id: number;
  name: string;
  code: string;
  slug: string;
  logo: string;
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

export interface CommunityQuestion {
  id: number;
  name: string;
  question: string;
  category: string;
  like_count: number;
  comment_count: number;
  author: string;
  time: number;
}

export interface IFaq extends IResponseData<Faq> {}

export interface Answer {
  id: number;
  question: string;
  answer: string;
  category: Category;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
}

export interface Faq {
  faqs: Faq[];
  categories: Category[];
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
}

export interface Faq {
  id: number;
  question: string;
  category_id: number;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}
