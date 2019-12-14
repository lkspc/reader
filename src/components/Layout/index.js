import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.less';

export function WhiteSpace({ size = 'md' }) {
  return <View className={`whitespace--${size}`} />;
}
