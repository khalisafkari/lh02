import {useCallback, useEffect, useRef, useState} from 'react';
import getHome from 'lhscan-extensions';

const useList = (props: getHome[]) => {
  const isMounted = useRef<boolean>(true);
  const [state, setState] = useState<getHome[] | any>(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onCallBack = useCallback(() => {
    const todos: getHome[] = [];
    for (let i = 0; i < props.length; i++) {
      // @ts-ignore
      if (props[i].view > 2500000) {
      } else {
        todos.push(props[i]);
      }
    }
    if (isMounted.current) {
      setState(todos);
    }
  }, [props]);

  useEffect(onCallBack, []);

  return state;
};

export default useList;
