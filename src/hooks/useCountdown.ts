import {useEffect, useState} from 'react';

type UseCountdownResult = {
  count: number;
};

const useCountdown = (
  seconds: number,
  initialTimeValue: number,
): UseCountdownResult => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds);

  useEffect(() => {
    if (!timeLeft) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [initialTimeValue]);

  return {count: timeLeft};
};

export default useCountdown;
