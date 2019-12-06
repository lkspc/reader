/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useCallback, useState } from '@tarojs/taro';

export function useDidMount(fn) {
  useEffect(fn, []);
}

export function useDidUpdate(fn, deps = []) {
  const isMount = useRef(false);

  useEffect(() => {
    if (isMount.current) return fn();
    isMount.current = true;
  }, deps);
}

export function useMergedState(initial) {
  const isUnmount = useRef(false);
  const [state, setState] = useState(initial);

  const mergeState = useCallback(patch => {
    if (!isUnmount.current) {
      setState(origin => {
        const update = typeof patch === 'function' ? patch(origin) : patch;
        return typeof update === 'object' && !Array.isArray(update)
          ? { ...origin, ...update }
          : update;
      });
    }
  }, []);

  useEffect(() => {
    isUnmount.current = false;

    return () => {
      isUnmount.current = true;
    };
  }, []);

  return [state, mergeState];
}
