import { StyleSheet } from "react-native";

export const advancedDiagnosticsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#f5f5f5",
  },
  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 80,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  containerText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  bodyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    paddingHorizontal: 30,
    marginBottom: 12,
    lineHeight: 22,
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  buttonsContainer: {
    marginTop: 24,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: 'center',
    gap: 10,
  },
  actionButton: {
    // width: "70%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#4a90e2",
    padding: 16,
    // marginHorizontal: 5,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    // marginTop: 8,
    fontWeight: "600",
    textAlign: "center",
  },
});
