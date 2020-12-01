import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width * 0.309;
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  hide: {
    backgroundColor: '#333',
  },
  show: {
    backgroundColor: '#ff0000',
  },
  btn: {
    padding: 5,
    marginHorizontal: 1,
    marginVertical: 2,
    width,
    borderRadius: 5,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
});
