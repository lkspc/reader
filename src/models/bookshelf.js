import Taro from '@tarojs/taro';

export const fetchData = () => dispatch => {
  Taro.getStorage({ key: 'bookshelf' }).then(res => {
    dispatch({
      type: 'bookshelf/fetch',
      payload: res.data || [],
    });
  });
};

export default {
  namespace: 'bookshelf',
  state: {
    loading: false,
    books: [],
  },
  reducers: {
    'bookshelf/fetch'(state, { payload }) {
      return {
        ...state,
        books: state.books.concat(payload),
      };
    },
  },
};
