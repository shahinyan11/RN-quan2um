import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

/**
 * Check app state
 * @returns {"active" | "background" | "inactive" | "unknown" | "extension"}
 */
const useAppState = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  return appStateVisible;
};

export default useAppState;
