import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const splashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  logoText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 8,
  }
});
