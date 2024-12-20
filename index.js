import 'react-native-reanimated';
import {AppRegistry} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
