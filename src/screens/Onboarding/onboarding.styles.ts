import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '80%',
    height: height * 0.35,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#555',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#adadadff',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#8359E3',
    borderRadius: 100.
  },
  button: {
    backgroundColor: '#8359E3',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
