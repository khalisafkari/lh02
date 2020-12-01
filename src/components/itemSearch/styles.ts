import {Dimensions, StyleSheet} from 'react-native';

export const width = Dimensions.get('window').width * 0.3;

export default StyleSheet.create({
  container: {
    margin: 5,
  },
  image: {
    height: width * 1.5,
    width,
    borderRadius: 5,
  },
  linear: {
    position: 'absolute',
    height: width * 1.5,
    width,
    borderRadius: 5,
  },
  subContainer: {
    height: width * 1.5,
    width,
    position: 'absolute',
    justifyContent: 'flex-end',
    padding: 5,
  },
  title: {
    color: '#fff',
    fontSize: 12,
  },
  view: {
    letterSpacing: 1,
    color: '#fff',
    fontSize: 10,
  },
});
