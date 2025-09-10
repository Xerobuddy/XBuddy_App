import { StyleSheet } from "react-native";

export const productDetailStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    marginTop: 80,
    padding: 16,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  manufacturer: {
    fontSize: 16,
    color: "gray",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  formatSection: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 12,
  },
  formatTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  formatList: {
    flexDirection: "column",
    gap: 6,
  },
  formatItem: {
    fontSize: 16,
    color: "#333",
  },
});
