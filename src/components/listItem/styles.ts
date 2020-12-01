import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
export const SIZE_WIDTH = width * 0.3;
export default StyleSheet.create({
  container: {
    margin: 5,
  },
  image: {
    height: SIZE_WIDTH * 1.5,
    width: SIZE_WIDTH,
    borderRadius: 5,
  },
  linear: {
    position: 'absolute',
    height: SIZE_WIDTH * 1.5,
    width: SIZE_WIDTH,
    borderRadius: 5,
  },
  subContainer: {
    position: 'absolute',
    height: SIZE_WIDTH * 1.5,
    width: SIZE_WIDTH,
    justifyContent: 'flex-end',
    padding: 5,
  },
  title: {
    color: '#fff',
    fontSize: 12,
  },
  chapter: {
    letterSpacing: 1,
    color: '#fff',
    fontSize: 10,
  },
  time: {
    letterSpacing: 1,
    color: '#fff',
    fontSize: 10,
  },
  view: {
    letterSpacing: 1,
    color: '#fff',
    fontSize: 10,
  },
});
