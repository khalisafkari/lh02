import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width * 0.476;
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
  },
  btn: {
    width: width,
    backgroundColor: '#333',
    height: 35,
    borderRadius: 5,
    margin: 1,
  },
  linear: {
    flexDirection: 'row',
    width: width,
    borderRadius: 5,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    letterSpacing: 1.5,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
