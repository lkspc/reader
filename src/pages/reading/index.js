import Taro, { useRouter, useEffect } from '@tarojs/taro';
import {
  View,
  Image,
  Block,
  Text,
  Swiper,
  SwiperItem,
} from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui';
import Chapter from './chapter';
import { useDidMount, useMergedState } from '../../utils/hooks';
import { decodeURI, isWeb } from '../../utils';
import './index.less';

function fetchChapter(link) {
  return Taro.request({
    url: `/chapter/${link}`,
  }).then(res => res.data.chapter);
}

function Reading() {
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
    current: 0,
    index: 0,
  });

  const preloadChapters = 

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

  useEffect(() => {
    if (chapters.length === 0) return;

    const promises = Array.from({ length: preload * 2 + 1 }).map((_, i) => {
      const chapter = chapters[current - preload + i];
      if (!chapter) return Promise.resolve(null);
      return chapter.chapter
        ? Promise.resolve(chapter)
        : Taro.request({ url: `/chapter/${chapter.link}` }).then(res => {
            chapter.chapter = res;
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
  }, [chapters, current, preload, setState]);

  const handleSwipe = e => {
    setState({ index: e.detail.current });
  };

  return (
    <View className='bookread'>
      <Swiper
        skipHiddenItemLayout
        className='bookread-page'
        current={index}
        onChange={handleSwipe}
      >
        <SwiperItem>
          <View className='at-article'>
            <View className='at-article__h1'>{book}</View>
          </View>
        </SwiperItem>
        {}
        <SwiperItem>
          <View className='demo-text-2'>2</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-3'>3</View>
        </SwiperItem>
      </Swiper>
      {chapters.map(c => (
        <Chapter mode='vertical' {...c.chapter} />
      ))}

      {/* <AtActivityIndicator color='#b2b2b2' size={48} mode='center' /> */}
    </View>
  );
}

Reading.config = {
  navigationBarTitleText: '',
  navigationStyle: 'custom',
};

export default Reading;
