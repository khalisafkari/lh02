import {useCallback, useEffect, useRef, useState} from 'react';

const useAsync = (request: Promise<any>) => {
  const isMounted = useRef<boolean>(true);
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onCallBack = useCallback(() => {
    request.then((results) => {
      if (isMounted.current) {
        setState(results);
      }
    });
  }, [request]);

  useEffect(onCallBack, []);

  return state;
};

export default useAsync;
