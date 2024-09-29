import React from 'react';
import {Text, View} from 'react-native';

import highlightReplies from '@helpers/highlightReplies';
import st from './styles';
import {IconSignLeft} from '@assets/svgs';
import moment from 'moment';

const MessageBubble = ({
  message,
  isOwn,
  isPrivate,
  author,
  receiver,
  time,
}: any) => {
  return (
    <View style={[st.container, isOwn && st.right]}>
      <View style={st.row}>
        <Text style={[st.author, isOwn && st.green, isPrivate && st.red]}>
          {author}
        </Text>
        {isPrivate && (
          <>
            <IconSignLeft
              style={st.icon}
              size={16}
              color={'rgba(239, 68, 74, 1)'}
            />
            <Text style={[st.author, st.red]}>{receiver}</Text>
          </>
        )}
      </View>
      <Text style={st.text}>{highlightReplies(message)}</Text>
      <Text style={st.time}>{moment(time * 1000).format('HH:mm')}</Text>
    </View>
  );
};

export default MessageBubble;
