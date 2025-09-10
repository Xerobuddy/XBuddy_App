import { StyleSheet } from "react-native";

export const saliveFactsStyle = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    paddingHorizontal: 20,
    flex: 1
  },
  heading: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "#fff",
    marginBottom: 12,
    marginTop: 60,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: "#333",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});