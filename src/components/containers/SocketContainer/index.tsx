// import React, {useCallback, useEffect} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import EStyleSheet from 'react-native-extended-stylesheet';
// import {AppState, AppStateStatus, View} from 'react-native';
//
// import Sockets from '@utils/sockets';
//
// import {
//   ISocketPair,
//   onSetOrderBook,
//   onUpdateChartData,
//   onUpdateOrder,
//   onUpdatePair,
//   onUpdatePairs,
//   selectPairCode,
// } from '@store/tradeview';
// import {selectUser} from '@store/auth';
// import prettyLog from "@utils/prettyLog";
//
// let countPrices = 0;
// let countPair = 0;
// let countOrderBook = 0;
// let countChartData = 0;
// let countOrder = 0;
//
// const SocketContainer = ({children}: any) => {
//   const dispatch = useDispatch();
//   const {ws_access_token} = useSelector(selectUser);
//   const pairCode = useSelector(selectPairCode);
//
//   const appState = React.useRef(AppState.currentState);
//
//   useEffect(() => {
//     Sockets.init();
//   }, []);
//
//   const onConnectSockets = useCallback(() => {
//     Sockets.init();
//     Sockets.subscribes(pairCode);
//
//     Sockets.listen<ISocketPair>('prices', ({data}) => {
//       prettyLog('socket prices', countPrices);
//       countPrices++;
//       dispatch(onUpdatePairs(data));
//     });
//
//     if (ws_access_token) {
//       Sockets.login(ws_access_token);
//       Sockets.listen<ISocketPair>('prices_currency', ({data}) => {
//         prettyLog('socket update pair', countPair);
//         countPair++;
//         dispatch(onUpdatePair(data));
//       });
//       Sockets.listen<any>('order_book_currency', ({data}) => {
//         prettyLog('socket OrderBook', countOrderBook);
//         countOrderBook++;
//         dispatch(onSetOrderBook(data));
//       });
//       Sockets.listen<any>('graph_currency', ({data}) => {
//         prettyLog('socket chart data', countChartData);
//         countChartData++;
//         dispatch(onUpdateChartData(data));
//       });
//       Sockets.listen('orders:personal', ({data}: any) => {
//         prettyLog('socket update order', countOrder);
//         countOrder++;
//         dispatch(onUpdateOrder(data));
//       });
//     }
//   }, [pairCode, dispatch, ws_access_token]);
//
//   useEffect(() => {
//     const subscription = AppState.addEventListener(
//       'change',
//       (nextAppState: AppStateStatus) => {
//         if (
//           appState.current.match(/inactive|background/) &&
//           nextAppState === 'active'
//         ) {
//           onConnectSockets();
//         }
//
//         appState.current = nextAppState;
//       },
//     );
//
//     return subscription;
//   }, [onConnectSockets]);
//
//   //Tradeview
//   useEffect(() => {
//     onConnectSockets();
//
//     //Sockets.subscribe(`deals:${PAIR_CODE}`);
//     //Sockets.subscribe(`deep_chart:${PAIR_CODE}`);
//   }, [onConnectSockets]);
//
//   return <View style={styles.containerStyle}>{children}</View>;
// };
//
// const styles = EStyleSheet.create({
//   containerStyle: {
//     flex: 1,
//     backgroundColor: '$darkBackground',
//   },
// });
//
// export default SocketContainer;
