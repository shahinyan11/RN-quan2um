import React, {useCallback, useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {FormikProvider, useFormik} from 'formik';
import {useFocusEffect} from '@react-navigation/native';

import {
  chatInitRequest,
  sendMessageRequest,
} from '@store/tradeViewChat/apiCalls';
import {selectTradeViewChat} from '@store/tradeViewChat/selectors';
import {chat_addMessage} from '@store/tradeViewChat';
import analyzeChatMessage from '@helpers/analyzeChatMessage';
import useAppState from '@hooks/useAppState';
import {IconSignLeft} from '@assets/svgs';
import Sockets from '@utils/sockets';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import st from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Chat = ({navigation}) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const appStateVisible = useAppState();
  const {messages} = useSelector(selectTradeViewChat);

  useFocusEffect(
    useCallback(() => {
      if (appStateVisible.match(/active/)) {
        Sockets.subscribes('chat');
        Sockets.listen('chat', ({data}) => {
          dispatch(chat_addMessage(data));
        });
      }

      return () => {
        Sockets.unsubscribes('chat');
        Sockets.listenOff('chat');
      };
    }, [appStateVisible]),
  );

  useEffect(() => {
    dispatch(chatInitRequest());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      message: '',
    },
    onSubmit: (values: any, {resetForm}) => {
      dispatch(sendMessageRequest(values, resetForm));
    },
  });

  const renderItem = ({item}: any) => {
    const {isOwn, message, isPrivate, receiver, author} =
      analyzeChatMessage(item);
    return (
      <MessageBubble
        author={author}
        isOwn={isOwn}
        message={message}
        receiver={receiver}
        isPrivate={isPrivate}
        {...item}
      />
    );
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, paddingTop: insets.top}}>
      <View style={st.header}>
        <IconSignLeft onPress={onPressBack} />
        <View style={st.greenCircle} />
        <Text style={st.onlineText}>Online</Text>
        <Text style={st.onlineCount}>321</Text>
      </View>
      <View style={st.contentContainer}>
        <FormikProvider value={formik}>
          <FlatList
            data={messages}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
          <MessageInput
            name="message"
            placeholder={'Наберите сообщение...'}
            onSend={formik.handleSubmit}
          />
        </FormikProvider>
      </View>
    </View>
  );
};

export default Chat;
