module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'] // 아이콘 생성 시 오류발생으로 코드삽입
  };
};
