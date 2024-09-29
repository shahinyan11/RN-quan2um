import io from 'socket.io-client';
import Config from 'react-native-config';
import prettyLog from '@utils/prettyLog';

type SUBSCRIBE_TYPES =
  | 'prices'
  | 'orders:personal'
  | 'prices_currency'
  | 'order_book_currency'
  | 'graph_currency'
  | 'chat';

// Events to subscribe
// ('subscribe', 'prices');
// ('subscribe', 'orders:personal');
// ('subscribe', `prices:${this.pairCode}`);
// ('subscribe', `order_book:${this.pairCode}`);
// ('subscribe', `graph:${this.pairCode}`);
class Sockets {
  client: SocketIOClient.Socket | null = null;

  constructor() {
    this.client = null;
  }

  init() {
    if (this.client?.connected) {
      return;
    }

    this.client = io(Config.BASE_URL_WS, {
      transports: ['websocket'],
      path: '/',
    });

    if (this.client) {
      this.client.connect();
    }

    this.client?.on('connect', function () {
      console.log('[WS CONNECT SUCCESS]');
    });

    this.client?.on('connect_error', (e: any) => {
      console.log('[WS CONNECT ERROR]:', e);
    });

    this.client?.on('disconnect', (e: any) => {
      console.log('[WS DISCONNECTED]', e);
    });
  }

  disconnect() {
    if (this.client?.connected) {
      console.log('socket disconnect');
      this.client.close();
    }
  }

  login(token: string) {
    this.client?.emit('login', token);
  }

  subscribes(value: string) {
    prettyLog('subscribe', value);

    this.client?.emit('subscribe', value);
  }

  unsubscribes(value: string) {
    prettyLog('unsubscribe', value);
    this.client?.emit('unsubscribe', value);
  }

  listen<T>(
    event: SUBSCRIBE_TYPES,
    callback: (value: {event: string; data: T; socket: null}) => void,
  ) {
    prettyLog('listen', event);
    this.client?.on(event, callback);
  }

  listenOff(event: SUBSCRIBE_TYPES) {
    prettyLog('listenOff', event);
    this.client?.off(event);
  }
}

export default new Sockets();
