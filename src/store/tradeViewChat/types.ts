import {
  CHAT_OPTIONS_HORIZONTAL,
  CHAT_OPTIONS_VERTICAL,
} from '@constants/tradeView';

export interface InitTradeViewChat {
  fetching: boolean;
  options: ChatOptions;
  ban: boolean;
  messages: {
    id: number;
    author: string;
    time: number;
    message: string;
    is_complained: boolean;
  }[];
  complaint_causes: {
    id: number;
    name: string;
  }[];
}

export type ChatOptions = {
  open?: boolean;
  pos?: typeof CHAT_OPTIONS_VERTICAL | typeof CHAT_OPTIONS_HORIZONTAL;
};

export type FormChat = {
  message?: string;
};

export type ComplaintData = {cause_id: number; message_id: number};
