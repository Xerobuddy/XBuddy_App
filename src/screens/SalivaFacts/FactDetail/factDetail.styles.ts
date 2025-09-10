import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "white",
    marginBottom: 15,
    textAlign: "center",
  },
  source: {
    fontSize: 16,
    color: "#00f", // link color
    textDecorationLine: "underline",
  },
});
