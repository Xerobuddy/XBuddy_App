import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 4,
  },
  textContainer: {},
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profession: {
    fontSize: 14,
    color: "gray",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 15,
  },
  logoutButton: {
    backgroundColor: "#ffe5e5",
  },
  logoutText: {
    color: "red",
    fontWeight: "600",
  },
});
