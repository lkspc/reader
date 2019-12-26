import Taro, { useRouter, useMemo } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Chapter from './chapter';
import { useDidMount, useMergedState } from '../../utils/hooks';
import { decodeURI, isWeb } from '../../utils';
import './index.less';

const PRELOAD_COUNT = 1;

function Reading({ fontSize, fontFamily, backgroundColor, foregroundColor }) {
  const { params } = useRouter();
  const { id, title = '' } = params;
  const book = decodeURI(title);

  const [{ loading, chapters, current }, setState] = useMergedState({
    loading: true,
    chapters: [],
    current: 0,
  });
  const visibleChapters = useMemo(() => {
    const start = Math.max(current - PRELOAD_COUNT, 0);
    return chapters.slice(start, start + PRELOAD_COUNT * 2 + 1);
  }, [chapters, current]);

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
    </View>
  );
}

Reading.config = {
  navigationBarTitleText: '',
  navigationStyle: 'custom',
};

export default connect(state => state.global)(Reading);
