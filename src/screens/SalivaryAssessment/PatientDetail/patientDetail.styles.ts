// patientDetail.styles.ts
import { StyleSheet } from "react-native";

export const patientDetailStyle = StyleSheet.create({
  bgContainer: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: 40,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  label: {
    alignSelf: "flex-start",
    marginTop: 12,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#161d1f",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: '100%',
    alignSelf: "center",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 16,
    fontSize: 16,
    marginBottom: 8,
    width: '100%',
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: 8,
    width: '100%',
  },
  genderButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#8359E3",
    backgroundColor: "#db9df0ff",
  },
  genderButtonSelected: {
    backgroundColor: "#8359E3",
    borderColor: "#8359E3",
  },
  genderText: {
    fontSize: 16,
    color: "#333",
  },
  genderTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  nextButton: {
    backgroundColor: "#8359E3",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
  },
  nextButtonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});