import { StyleSheet } from "react-native";

export const productsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 88,
    marginBottom: 10,
    marginHorizontal: 20,
    color: "#000",
  },
  categoryScroll: {
    marginVertical: 10,
    paddingLeft: 20,
    paddingRight: 40,
    maxHeight: 70,
  },
  categoryButton: {
  flexDirection: "column",   // keep column layout
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 20,
  paddingVertical: 10,       // ⬅️ make vertical padding same for active/inactive
  borderRadius: 16,
  marginRight: 10,
  // maxHeight: 70,             // ⬅️ fix height so it doesn't jump
  backgroundColor: "rgba(255, 255, 255, 0.8)",
},
  activeCategoryButton: {
    backgroundColor: "#9970e9ff",
  },
  categoryText: {
    color: "#161d1f",
    fontWeight: "400",
    fontSize: 14,
  },
  activeCategoryText: {
    color: "#fff",
    fontWeight: "600",
  },
  categoryIcon: {
    marginRight: 4,
  },
  listContainer: {
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    flex: 0.48,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    textAlign: "center",
  },
  imageContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    // padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    height: 120,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
  noImage: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  noImageText: {
    color: "#999",
    fontSize: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  score: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  manufacturer: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
});
