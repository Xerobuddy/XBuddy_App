import { StyleSheet } from "react-native";

export const xerostomiaStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  textContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  okButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    width: "50%"
  },
  okButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  // Xerostomia Intro Screen Style ^^^^^^^

  qcontainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  question: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 14,
    borderRadius: 10,
    marginVertical: 8,
    width: "50%"
  },
  optionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  questionImage: {
    marginVertical: 20,
    alignSelf: "center",
    borderRadius: 12,
  },
  // Xerostomia Question Screen Style ^^^^^^^

  subtitleI: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },

  sliderWrapper: {
    width: "90%", // take almost full screen width
    alignSelf: "center",
    marginVertical: 20,
  },

  slider: {
    width: "100%",
    height: 50, // bigger touch area
  },

  sliderContainer: {
    width: "100%",
    marginVertical: 20,
    marginBottom: 40,
  },
  sliderValueText: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 32,
    fontWeight: 600,
  },
  sliderLabel1: {
    fontSize: 16,
    fontWeight: 500,
    textAlign: "left"
  },
  sliderLabel2: {
    fontSize: 16,
    fontWeight: 500,
    textAlign: "right"
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  // Xerostomia Info Screen Style ^^^^^^^
});
