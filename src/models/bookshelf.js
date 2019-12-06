export function fetchData() {
  return { type: 'bookshelf/fetch', payload: { loading: true } };
}

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
        ...payload,
      };
    },
  },
};
