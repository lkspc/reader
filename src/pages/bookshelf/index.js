import Taro from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { fetchData } from '../../models/bookshelf';
import { useDidMount } from '../../utils/hooks';
import './index.less';

import ICON_EMPTY from '../../assets/icons/icon_book_empty.png';

function Bookshelf({ loading, books, dispatch }) {
  useDidMount(() => {
    dispatch(fetchData());
  });

  return (
    <View>
      <View>
        <Image className='bookshelf-empty' src={ICON_EMPTY} />
        <Button
          onClick={() =>
            
            Taro.navigateTo({
              url:
                '/pages/reading/index?id=568fef99adb27bfb4b3a58dc&title=最强狂兵',
            })
          }
        >
          阅读
        </Button>
      </View>
    </View>
  );
}

Bookshelf.config = {
  navigationBarTitleText: '书架',
};

export default connect(({ bookshelf }) => bookshelf)(Bookshelf);
