import Taro from '@tarojs/taro';
import { encodeURI } from '../utils';

export const fetchChapter = link => dispatch => {
  return Taro.request({ url: `/chapter/${encodeURI(link)}` })
    .then(res => {
      const { chapter } = res.data;
      dispatch({
        type: 'chapter/fetch',
        payload: {
          ...chapter,
          content: chapter.cpContent,
        },
      });
    })
    .catch(err => {
      // dispatch({
      //   type: 'chapter/fetch',
      //   payload: { error: err.message || '服务器出错' },
      // });
    });
};

export default {
  namespace: 'chapter',
  state: {
    chapters: {},
  },
  reducers: {
    'chapter/fetch'(state, { payload }) {
      return {
        ...state,
        chapters: {
          ...state.chapters,
          [payload.id]: payload,
        },
      };
    },
  },
};
