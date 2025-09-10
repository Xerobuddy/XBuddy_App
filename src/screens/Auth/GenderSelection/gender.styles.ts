import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    color: '#333',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 30,
    gap: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    width: "48%",
    gap: 8,
  },
  selectedOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#e6f9e6',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  continueBtn: {
    backgroundColor: '#8359E3',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: "100%",
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: '#ccc',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
