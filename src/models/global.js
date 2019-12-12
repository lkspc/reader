import Taro from '@tarojs/taro';

const GLOBAL_KEY = 'global';

export const init = () => dispatch => {
  Taro.getStorage({ key: GLOBAL_KEY }).then(res => {
    dispatch({ type: 'global/init', payload: res.data });
  });
};

export default {
  namespace: 'global',
  state: {
    fontSize: 36,
    fontFamily: '-apple-system-font, "Helvetica Neue", sans-serif',
    backgroundColor: '#dcd3c5',
    foregroundColor: '#333',
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
