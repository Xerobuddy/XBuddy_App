import { StyleSheet } from "react-native";

export const bottomNavbarStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#c4b0f3ff", // dark background
    paddingTop: 12,
    paddingBottom: 32,
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  navLabel: {
    fontSize: 12,
    color: "#fff",
    marginTop: 2,
  },
  activeNavLabel: {
    color: "#4ade80", // green when active
    fontWeight: "600",
  },
});
