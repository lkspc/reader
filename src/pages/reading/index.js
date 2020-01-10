import Taro, {
  useRouter,
  useMemo,
  useReachBottom,
  useCallback,
} from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Chapter from './chapter';
import { useDidMount, useMergedState } from '../../utils/hooks';
import { decodeURI, isWeb, noop } from '../../utils';
import './index.less';

const PRELOAD_COUNT = 3;

function ReachBottom({ onReachBottom = noop }) {
  useReachBottom(onReachBottom);
  return null;
}

function Reading({ fontSize, fontFamily, backgroundColor, foregroundColor }) {
  const { params } = useRouter();
  const { id, title = '', page = 1 } = params;
  const book = decodeURI(title);

  const [{ chapters, count }, setState] = useMergedState({
    loading: true,
    chapters: [],
    count: PRELOAD_COUNT,
  });
  const visibleChapters = useMemo(() => {
    return chapters.slice(page - 1, count);
  }, [chapters, count, page]);

  const handleReachBottom = useCallback(() => {
    setState(state => ({ count: state.count + 1 }));
  }, [setState]);

  useDidMount(() => {
    if (isWeb) {
      Taro.setNavigationBarTitle({ title: book });
    }

    Taro.request({ url: `/api/atoc/${id}?view=chapters` })
      .then(res => {
        setState({
          loading: false,
          chapters: res.data.chapters,
        });
      })
      .catch(err => {
        setState({ loading: false });
        Taro.showToast({
          title: err.message || '服务器出错',
          icon: 'none',
        });
      });
  });

  return (
    <View
      className='bookread'
      style={{ backgroundColor, color: foregroundColor, fontFamily, fontSize }}
    >
      <View className='bookread-page'>
        <View className='bookread-title'>
          <Text>{book}</Text>
        </View>
      </View>
      {visibleChapters.map(c => (
        <Chapter mode='vertical' key={c._id} link={c.link} title={c.title} />
      ))}
      <ReachBottom onReachBottom={handleReachBottom} />
    </View>
  );
}

Reading.config = {
  navigationBarTitleText: '',
  navigationStyle: 'custom',
};

export default connect(state => state.global)(Reading);
