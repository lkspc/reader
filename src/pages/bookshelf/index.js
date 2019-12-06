import Taro, { useEffect } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { fetchData } from '../../models/bookshelf';
import { useDidMount } from '../../utils/hooks';

import './index.less';

function Bookshelf({ loading, books, dispatch }) {
  useDidMount(() => {
    dispatch(fetchData())
  });

  return (
    <View>
      <Button>loading: {loading}</Button>
    </View>
  );
}

Bookshelf.config = {
  navigationBarTitleText: '书架',
};

export default connect(({ bookshelf }) => bookshelf)(Bookshelf);
