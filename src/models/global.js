import Taro from '@tarojs/taro';

const GLOBAL_KEY = 'global';

Taro.initPxTransform({ designWidth: 750, deviceRatio: 1 });

export const init = () => dispatch => {
  Taro.getStorage({ key: GLOBAL_KEY }).then(res => {
    dispatch({ type: 'global/init', payload: res.data });
  });
};

export default {
  namespace: 'global',
  state: {
    fontSize: Taro.pxTransform(36),
    fontFamily: '-apple-system-font, "Helvetica Neue", sans-serif',
    backgroundColor: '#dcd3c4',
    foregroundColor: '#2c2a27',
  },
  reducers: {
    'global/init'(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
