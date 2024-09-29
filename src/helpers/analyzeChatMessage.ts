import {store} from '@store/index';

const analyzeChatMessage = ({message, author}: any) => {
  const {username} = store.getState().auth.user || {};

  let isPrivate;
  let receiver;
  const isOwn = username === author;

  const privateReg = /prv @([^\s]+)/;
  const privateMatch = message.match(privateReg);

  if (privateMatch) {
    receiver = privateMatch[1];

    if (receiver !== username && !isOwn) {
      return {};
    }

    isPrivate = true;
    message = message.replace(privateReg, '');
  }

  return {
    isOwn,
    message,
    isPrivate,
    receiver: receiver === username ? 'You' : receiver,
    author: author === username ? 'You' : author,
  };
};

export default analyzeChatMessage;
