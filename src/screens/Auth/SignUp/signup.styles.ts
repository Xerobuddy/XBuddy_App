import { StyleSheet } from 'react-native';

export const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
    width: '100%',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    color: '#161d1f',
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#cececeff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#cececeff',
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  passwordInput: {
    flex: 1,
    color: '#161d1f',
    // paddingVertical: 16,
  },
  button: {
    backgroundColor: '#8359E3',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ececec',
    fontWeight: '600',
    fontSize: 16,
  },
  orText: {
    color: '#161d1f',
    marginTop: 24,
    marginBottom: 14,
    textAlign: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 15,
    gap: 8,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  googleButtonText: {
    color: '#161d1f',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#161d1f',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  linkText2: {
    fontWeight: 'bold'
  },
});
