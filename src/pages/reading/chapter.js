import Taro, { useEffect, useState, useMemo } from '@tarojs/taro';
import { View, Text, Block } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { fetchChapter } from '../../models/chapter';

function Chapter({ mode = 'vertical', key, link, title, chapters, dispatch }) {
  const [loading, setLoading] = useState(true);
  const chapter = chapters[key];
  const chapterTitle = chapter ? chapter.title : title;
  const sections = useMemo(() => {
    return chapter
      ? chapter.cpContent
          .replace(/\r\n/g, '\n')
          .replace(/\\n/g, '')
          .split('\n')
      : [];
  }, [chapter]);

  useEffect(() => {
    if (!chapter) {
      dispatch(fetchChapter(link)).then(() => {
        setLoading(false);
      });
    }
  }, [chapter, dispatch, link]);

  return (
    <View className='bookread-chapter'>
      <Block>
        <View className='bookread-chapter-title'>
          <Text>{chapterTitle}</Text>
        </View>
        {loading ? (
          <View className='bookread-chapter-loading'>
            <Text>加载中, 请稍候...</Text>
          </View>
        ) : (
          sections.map((s, i) => (
            <View key={i} className='bookread-chapter-section'>
              <Text>{s}</Text>
            </View>
          ))
        )}
      </Block>
    </View>
  );
}

export default connect(state => state.chapter)(Chapter);
