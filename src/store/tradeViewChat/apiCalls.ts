import api, {CHAT, CHAT_MESSAGE} from '@api';
import {chat_init} from '@store/tradeViewChat/index';

export const chatInitRequest = () => async (dispatch: any) => {
  try {
    const {data} = await api.get(CHAT);
    dispatch(chat_init(data));
  } catch (error) {
    console.log('chatInitRequest', error);
  }
};

export const sendMessageRequest = (params: any, callback?: any) => async () => {
  try {
    await api.post(CHAT_MESSAGE, params);

    callback?.();
  } catch (error) {
    console.log('sendMessageRequest', error);
  }
};
