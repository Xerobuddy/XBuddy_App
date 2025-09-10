import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  slideContainer: {
    width,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  slideImage: {
    width: 220,
    height: 220,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#eee",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#2c3e50",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "#ccc",
  },
  activeDot: {
    backgroundColor: "#2c3e50",
  },
});

export default styles;
