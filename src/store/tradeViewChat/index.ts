import {createSlice} from '@reduxjs/toolkit';

import {CHAT_OPTIONS_VERTICAL, MESSAGE_LENGTH} from '@constants/tradeView';
import {InitTradeViewChat} from './types';

const init: InitTradeViewChat = {
  fetching: false,
  options: {
    open: true,
    pos: CHAT_OPTIONS_VERTICAL,
  },
  ban: false,
  messages: [],
  complaint_causes: [],
};

const tradeViewChat = createSlice({
  name: 'tradeViewChat',
  initialState: init,
  reducers: {
    chat_setFetching(state) {
      state.fetching = true;
    },
    chat_removeFetching(state) {
      state.fetching = false;
    },
    chat_init(state, action) {
      state.ban = action.payload.ban;
      state.complaint_causes = action.payload.complaint_causes;
      state.messages = action.payload.messages.reverse();
      // const options = getChatOptions();
      // if (options) {
      //   state.options = options;
      // }
    },

    chat_addMessage(state, action) {
      const messages = [action.payload, ...state.messages].slice(
        0,
        MESSAGE_LENGTH,
      );
      state.messages = messages;
    },

    reset: () => init,
  },
});

export const {reset, chat_init, chat_addMessage} = tradeViewChat.actions;

const tradeViewChatReducer = tradeViewChat.reducer;
export default tradeViewChatReducer;
