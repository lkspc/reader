import Taro from '@tarojs/taro';
import { View, Image, Text, Block } from '@tarojs/components';
import { AtSearchBar } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { fetchData } from '../../models/bookshelf';
import { useDidMount } from '../../utils/hooks';
import './index.less';

import ICON_EMPTY from '../../assets/icons/icon_book_empty.png';

function Empty() {
  return (
    <View className='bookshelf-empty'>
      <Image className='bookshelf-image' src={ICON_EMPTY} />
      <Text className='bookshelf-text'>你的书架空空如也</Text>
    </View>
  );
}

function Book({ name, thumb, percent = -1 }) {
  return (
    <View className='bookshelf-book'>
      <Image className='bookshelf-cover' src={thumb} />
      <Text className='bookshelf-title'>{name}</Text>
      {percent >= 0 && <Text className='bookshelf-text'>已读 {percent}%</Text>}
    </View>
  );
}

function Bookshelf({ loading, books, dispatch }) {
  useDidMount(() => {
    dispatch(fetchData());
  });

  return (
    <Block>
      <View
        className='bookshelf-search'
        onClick={() => Taro.navigateTo({ url: '/pages/search/index' })}
      >
        <AtSearchBar fixed placeholder='搜索书名、作者' disabled />
      </View>
      {books.length > 0 ? (
        <View className='bookshelf-books'>
          {books.map(b => (
            <Book
              key={b._id}
              name={b.name}
              thumb={b.thumb}
              percent={b.percent}
            />
          ))}
        </View>
      ) : (
        <Empty />
      )}
    </Block>
  );
}

Bookshelf.config = {
  navigationBarTitleText: '书架',
};

export default connect(({ bookshelf }) => bookshelf)(Bookshelf);
