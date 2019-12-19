import Taro from '@tarojs/taro';
import { View, Text, Block } from '@tarojs/components';

export function VChapter({ title = '', content = '', loading }) {
  const sections = content
    .replace(/\r\n/g, '\n')
    .replace('\n', '')
    .split('\n');

  return (
    <View className='bookread-chapter'>
      {loading ? (
        <View className='bookread-chapter-loading'>
          <Text>加载中, 请稍候...</Text>
        </View>
      ) : (
        <Block>
          <View className='bookread-chapter-title'>
            <Text>{title}</Text>
          </View>
          {sections.map((s, i) => (
            <View key={i} className='bookread-chapter-section'>
              <Text>{s}</Text>
            </View>
          ))}
        </Block>
      )}
    </View>
  );
}

export function HChapter() {}

// eslint-disable-next-line react/no-multi-comp
export default function Chapter({ mode = 'vertical', ...props }) {
  return mode === 'vertical' ? (
    <VChapter {...props} />
  ) : (
    <HChapter {...props} />
  );
}
