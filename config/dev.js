module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  weapp: {},
  h5: {
    devServer: {
      proxy: {
        '/api/': {
          target: 'http://api.zhuishushenqi.com',
          pathRewrite: {
            '^/api/': '/',
          },
          changeOrigin: true,
        },
      },
    },
  },
};
