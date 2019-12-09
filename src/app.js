import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import 'taro-ui/dist/style/index.scss';

import Index from './pages/index';

import configStore from './store';

import './app.less';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    pages: ['pages/mine/index', 'pages/bookshelf/index', 'pages/reading/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      color: '#7a7e83',
      selectedColor: '#76b8fd',
      borderStyle: 'black',
      backgroundColor: '#ffffff',
      list: [
        {
          pagePath: 'pages/bookshelf/index',
          text: '书架',
          iconPath: 'assets/icons/icon_bookshelf.png',
          selectedIconPath: 'assets/icons/icon_bookshelf_active.png',
        },
        {
          pagePath: 'pages/mine/index',
          text: '我的',
          iconPath: 'assets/icons/icon_mine.png',
          selectedIconPath: 'assets/icons/icon_mine_active.png',
        },
      ],
    },
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
