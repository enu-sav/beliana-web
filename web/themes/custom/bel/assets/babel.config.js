module.exports = function babelConfig(api) {
  api.cache.using(() => process.env.NODE_ENV === 'development');

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          corejs: '2.6.12',
          useBuiltIns: 'usage',
        },
      ],
    ],
  };
};
