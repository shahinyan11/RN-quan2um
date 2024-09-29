import {useEffect, useState} from 'react';
import useAppState from '@hooks/useAppState';
import {
  selectSetSecurePass,
  selectUnlockDate,
  setSecurePassword,
  setUnlockDate,
} from '@store/app';
import {useDispatch, useSelector} from 'react-redux';

/**
 * Check the time in inactive state to show pass screen
 * @returns {boolean}
 */
const useIsShowPassScreen = () => {
  const dispatch = useDispatch();
  const appStateVisible = useAppState();
  const [isShow, setIsShow] = useState(false);
  const unlockDate = useSelector(selectUnlockDate);
  const isSetSecurePass = useSelector(selectSetSecurePass);

  useEffect(() => {
    if (appStateVisible.match(/inactive|background/)) {
      dispatch(setUnlockDate(Date.now()));
    } else if (appStateVisible.match(/active/)) {
      const difference = Date.now() - unlockDate;
      if (difference <= 60000 && isSetSecurePass) {
        setIsShow(false);
      } else {
        setIsShow(true);
        dispatch(setSecurePassword(false));
      }
    }
  }, [appStateVisible]);

  return isShow;
};

export default useIsShowPassScreen;
