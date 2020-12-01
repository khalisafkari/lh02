module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
          '.png',
          '.jpg',
        ],
        alias: {
          '@screen': './src/screen/',
          '@components': './src/components',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@staticaly': './src/staticaly',
        },
      },
    ],
  ],
};
