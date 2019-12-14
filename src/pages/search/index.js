import Taro, { useCallback } from '@tarojs/taro';
import { View, Text, Block, Image } from '@tarojs/components';
import { AtSearchBar } from 'taro-ui';
import { useMergedState } from '../../utils/hooks';
import { debounce } from '../../utils';
import './index.less';

function Search() {
  const [
    { loading, keyword, keywords, books, isInput },
    setState,
  ] = useMergedState({
    loading: false,
    keyword: '',
    keywords: [],
    books: [],
    isInput: true,
  });

  const fuzzyQuery = useCallback(
    debounce(q => {
      if (!q) return;

      setState({ loading: true });
      Taro.request({ url: `/api/book/auto-complete?query=${q}` })
        .then(res => setState({ keywords: res.data.keywords || [] }))
        .catch(err => setState({ keywords: [] }));
    }, 300),
    []
  );

  const handleChange = val => {
    setState({ keyword: val, isInput: true });
    fuzzyQuery(val);
  };

  const handleSearch = val => {
    setState({ loading: true, keyword: val, isInput: false });
    Taro.request({ url: `/api/book/fuzzy-search?query=${val}` })
      .then(res => {
        setState({ loading: false, books: res.data.books || [] });
      })
      .catch(err => {
        setState({ loading: false, books: [] });
      });
  };

  return (
    <Block>
      <View className='booksearch-search'>
        <AtSearchBar
          fixed
          placeholder='书名、作者'
          actionName='取消'
          showActionButton
          value={keyword}
          onChange={handleChange}
          onClear={() => setState({ keyword: '', keywords: [] })}
          // onActionClick={() => handleChange(keyword)}
          onActionClick={() => Taro.navigateBack()}
        />
      </View>
      <View className='booksearch-content'>
        {isInput &&
          keywords.map(k => (
            <View
              className='booksearch-text'
              key={k}
              onClick={() => handleSearch(k)}
            >
              <Text>{k}</Text>
            </View>
          ))}
        {!isInput &&
          (loading ? (
            <Text>loading</Text>
          ) : books.length === 0 ? (
            <Text>无数据</Text>
          ) : (
            books.map(b => (
              <View key={b._id} className='booksearch-book'>
                <Image
                  className='booksearch-book-thumb'
                  src={`//statics.zhuishushenqi.com${b.cover}`}
                />
                <View>
                  <Text className='booksearch-book-title'>{b.title}</Text>
                </View>
              </View>
            ))
          ))}
      </View>
    </Block>
  );
}

Search.config = {
  navigationBarTitleText: '搜索',
};

export default Search;
