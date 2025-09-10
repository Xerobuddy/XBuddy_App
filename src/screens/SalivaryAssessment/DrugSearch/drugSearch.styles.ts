import { StyleSheet } from "react-native";

export const drugSearchStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    marginTop: 72,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
  },

  // Search Input
  searchInput: {
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },

  // List
  list: {
    paddingBottom: 100, // leave space for Next button
  },

  // Product Item
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  productScore: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },

  // Add Button (circular blue with shadow)
  addButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  // Next Button (sticky bottom)
  nextButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#8359E3", // iOS green style
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
