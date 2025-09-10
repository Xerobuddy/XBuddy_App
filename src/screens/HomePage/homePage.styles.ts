import { StyleSheet } from "react-native";

export const homePageStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutIconContainer: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 60, // leaves space for navbar
    paddingHorizontal: 20,
  },
  topIllustration: {
    alignItems: "center",
    marginTop: 80,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
    textAlign: 'center',
  },
  bannerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#a78ae9ff",
    borderRadius: 24,
    padding: 16,
    marginVertical: 20,
  },
  bannerText: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bannerImage: {
    width: 60,
    height: 60,
  },
  reportsContainer: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 10,
  },
  searchRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#C4B0E9",
    borderRadius: 8,
    padding: 16,
    color: "#fff",
  },

  // ✅ Modern Card Design
  card: {
    backgroundColor: "#ccccf3ff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardHeader: {
    flexDirection: "column",
    // justifyContent: "space-between",
    marginBottom: 6,
  },
  assessmentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  createdAt: {
    fontSize: 12,
    color: "#666",
  },
  reportId: {
    fontSize: 12,
    color: "#999",
    marginBottom: 10,
  },
  viewButton: {
    backgroundColor: "#6C63FF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
