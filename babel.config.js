module.exports = (api) => {
  api.cache(true);

  return {
    plugins: ['emotion'],
    presets: ['@babel/preset-env', '@babel/preset-flow', '@babel/preset-react'],
    sourceType: 'unambiguous',
  };
};
