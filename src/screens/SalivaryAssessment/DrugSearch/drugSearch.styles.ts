import { StyleSheet } from "react-native";

export const drugSearchStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
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

  // Search + Add container
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  addDrugButton: {
    marginLeft: 10,
    backgroundColor: "#0088b1",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  // Hint text when search returns empty
  hintText: {
    fontSize: 14,
    color: "#ff9800",
    marginBottom: 8,
    marginLeft: 4,
  },

  // List
  list: {
    paddingBottom: 120, // space for Next button
  },

  // Product/Drug Item
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
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

  // Add Button in item
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
    backgroundColor: "#8359E3",
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

  // Modal overlay and container
  modalOverlay: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#000000aa",
},
modalContainer: {
  backgroundColor: "#fff",
  padding: 24,
  borderRadius: 16,
  width: "85%",
},
modalTitle: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 16,
  color: "#222",
  textAlign: "center",
},
modalLabel: {
  fontSize: 14,
  fontWeight: "600",
  color: "#444",
  marginBottom: 6,
},
modalInput: {
  borderWidth: 1,
  borderColor: "#ccc",
  padding: 10,
  borderRadius: 10,
  marginBottom: 12,
  fontSize: 16,
},
hintText2: {
  fontSize: 16,
  color: "#161d1f",
  marginBottom: 16,
},
modalButtons: {
  flexDirection: "row",
  justifyContent: "flex-end",
},
cancelButton: {
  fontSize: 16,
  color: "#555",
  marginRight: 16,
},
saveButton: {
  fontSize: 16,
  color: "#0088b1",
  fontWeight: "bold",
},
});
