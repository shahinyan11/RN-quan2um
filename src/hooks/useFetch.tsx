import React, {useEffect, useRef} from 'react';

import api from '@api';
import {AxiosRequestConfig} from 'axios';

interface IUseFetchResponse<T> {
  response: undefined | T;
  error: any;
  isLoading: boolean;
  refresh: () => void;
  refreshEnabled: boolean;
}

const useFetch = <T extends {}>(
  options: AxiosRequestConfig,
  startHook: boolean = true,
): IUseFetchResponse<T> => {
  const optionsString = JSON.stringify(options);
  let isRendered = useRef(false);

  const isBrokenRequest = optionsString.includes('undefined');

  const [response, setResponse] = React.useState(undefined);
  const [error, setError] = React.useState(null as any);
  const [isLoading, setIsLoading] = React.useState(true);

  const [refreshEnabled, setRefreshEnabled] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    isRendered.current = true;

    if (!isBrokenRequest && startHook) {
      api(options)
        .then(({data}) => {
          if (isRendered.current) {
            setResponse(data);
            setRefreshEnabled(true);
            setIsLoading(false);
          }
        })
        .catch(e => {
          setError(e);
        })
        .finally(() => setIsLoading(false));
    }

    return () => {
      isRendered.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsString]);

  const refresh = () => {
    if (refreshEnabled && !isBrokenRequest && startHook) {
      setIsLoading(true);
      setError(null);
      api(options)
        .then(({data}) => setResponse(data))
        .catch(e => {
          setError(e);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return {response, error, isLoading, refresh, refreshEnabled};
};

export default useFetch;
