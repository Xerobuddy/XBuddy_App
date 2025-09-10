import { StyleSheet } from "react-native";

export const reportSummaryStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonContainer: {
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  guage: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 6,
    color: "#000",
    fontWeight: "500",
  },
  infoDivider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical:10
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 40,
},
filledButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200EE",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 5,
},
filledButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
}

});
