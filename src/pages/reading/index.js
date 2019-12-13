import Taro, { useRouter } from '@tarojs/taro';
import {
  View,
  Image,
  Block,
  Text,
  Swiper,
  SwiperItem,
} from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui';
import { connect } from '@tarojs/redux';
import Chapter from './chapter';
import { useDidMount, useMergedState, useDidUpdate } from '../../utils/hooks';
import { decodeURI, isWeb } from '../../utils';
import './index.less';

function Reading({ fontSize, fontFamily, backgroundColor, foregroundColor }) {
  const { params } = useRouter();
  const { id, title = '' } = params;
  const book = decodeURI(title);

  const [
    { loading, chapters, current, preload, index },
    setState,
  ] = useMergedState({
    loading: false,
    chapters: [],
    preload: 1,
    current: -1,
    index: 0,
  });
  const preloadChapters = chapters.filter(c => !!c.chapter);

  const handleSwipe = e => {
    setState({ index: e.detail.current });
  };

  useDidMount(() => {
    if (isWeb) {
      Taro.setNavigationBarTitle({ title: book });
    }

    setState({ loading: true });
    Taro.request({ url: `/api/atoc/${id}?view=chapters` })
      .then(res => {
        setState({
          loading: false,
          chapters: res.data.chapters,
          current: 0,
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

  useDidUpdate(() => {
    if (preloadChapters.length === chapters.length) return;

    const promises = Array.from({ length: preload * 2 + 1 }).map((_, i) => {
      const chapter = chapters[current - preload + i];
      if (!chapter) return Promise.resolve(null);
      return chapter.chapter
        ? Promise.resolve(chapter)
        : Taro.request({ url: `/chapter/${chapter.link}` }).then(res => {
            chapter.chapter = res.data.chapter;
            return res;
          });
    });

    setState({ loading: true });
    Promise.all(promises)
      .then(() => {
        setState({ loading: false });
      })
      .catch(err => {
        setState({ loading: false });
        Taro.showToast({
          title: err.message || '服务器出错',
          icon: 'none',
        });
      });
  }, [current]);

  return (
    <View className='bookread' style={{ backgroundColor }}>
      <View className='bookread-page'>
        <View
          className='bookread-title'
          style={{ color: foregroundColor, fontFamily, fontSize }}
        >
          <Text>{book}</Text>
        </View>
      </View>

      {/* <Swiper
        skipHiddenItemLayout
        className='bookread-page'
        current={index}
        onChange={handleSwipe}
      >
        <SwiperItem>
    
        </SwiperItem>
        {}
        <SwiperItem>
          <View className='demo-text-2'>2</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-3'>3</View>
        </SwiperItem>
      </Swiper> */}
      {preloadChapters.map(c => (
        <Chapter
          mode='vertical'
          key={c._id}
          loading={loading}
          title={c.chapter.title}
          content={c.chapter.cpContent}
          fontSize={fontSize}
          fontFamily={fontFamily}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
        />
      ))}

      {/* <AtActivityIndicator color='#b2b2b2' size={48} mode='center' /> */}
    </View>
  );
}

Reading.config = {
  navigationBarTitleText: '',
  navigationStyle: 'custom',
};

export default connect(state => state.global)(Reading);
