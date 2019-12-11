import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

export function VChapter({ title = '', content = '' }) {
  const sections = content.replace(/\r\n/g, '\n').split('\n');
  return (
    <View className='bookread-chapter'>
      <View className='bookread-chapter-title'>
        <Text>{title}</Text>
      </View>
      {sections.map((s, i) => (
        <View key={i} className='bookread-chapter-section'>
          <Text>{s}</Text>
        </View>
      ))}
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
