import {useCallback, useEffect, useRef, useState} from 'react';
import getHome from 'lhscan-extensions';

const useTop = (props: getHome[]) => {
  const isMouted = useRef<boolean>(true);
  const [state, setState] = useState<getHome[] | any>([]);

  useEffect(() => {
    return () => {
      isMouted.current = false;
    };
  }, []);

  const onCallBack = useCallback(() => {
    const todos: getHome[] = [];
    for (let i = 0; i < props.length; i++) {
      // @ts-ignore
      if (props[i].view > 2500000) {
        todos.push(props[i]);
      }
    }
    if (isMouted.current) {
      setState(todos);
    }
  }, [props]);

  useEffect(onCallBack, []);

  return state;
};

export default useTop;
