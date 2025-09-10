import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginLeft: 15,
  },
  languageList: {
    marginTop: 30,
  },
  languageButton: {
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  selectedButton: {
    backgroundColor: "#4F46E5",
  },
  languageText: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;
