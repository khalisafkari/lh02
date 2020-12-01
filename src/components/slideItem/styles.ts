import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
export const SIZE_WIDTH = width * 0.72;
export default StyleSheet.create({
  container: {
    margin: 5,
  },
  image: {
    width: SIZE_WIDTH,
    height: SIZE_WIDTH * 0.6,
    borderRadius: 5,
  },
  linear: {
    position: 'absolute',
    width: SIZE_WIDTH,
    height: SIZE_WIDTH * 0.6,
    borderRadius: 5,
  },
  subContainer: {
    position: 'absolute',
    width: SIZE_WIDTH,
    height: SIZE_WIDTH * 0.6,
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
